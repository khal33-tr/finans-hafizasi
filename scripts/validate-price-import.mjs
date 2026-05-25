import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, requireColumns } from "../lib/csv.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PRICE_COLUMNS = ["symbol", "date", "open", "high", "low", "close", "adjustedClose", "volume", "source"];
const CALENDAR_COLUMNS = ["date", "isTradingDay", "sessionType", "note"];

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

function isDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
}

function parseNumber(value, field, context, { allowEmpty = false, min = Number.NEGATIVE_INFINITY } = {}) {
  if (allowEmpty && value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${context}: ${field} must be numeric.`);
  }
  if (number < min) {
    throw new Error(`${context}: ${field} must be >= ${min}.`);
  }
  return number;
}

function parseBoolean(value, context) {
  const normalized = value.toLowerCase();
  if (["true", "1", "yes", "evet"].includes(normalized)) return true;
  if (["false", "0", "no", "hayir", "hayır"].includes(normalized)) return false;
  throw new Error(`${context}: isTradingDay must be true/false.`);
}

function normalizePriceRows(rows) {
  const seen = new Set();
  return rows.map((row, index) => {
    const context = `price row ${index + 2}`;
    if (!row.symbol) throw new Error(`${context}: symbol is required.`);
    if (!isDateKey(row.date)) throw new Error(`${context}: date must be YYYY-MM-DD.`);

    const normalized = {
      symbol: row.symbol.toUpperCase(),
      date: row.date,
      open: parseNumber(row.open, "open", context, { min: 0 }),
      high: parseNumber(row.high, "high", context, { min: 0 }),
      low: parseNumber(row.low, "low", context, { min: 0 }),
      close: parseNumber(row.close, "close", context, { min: 0 }),
      adjustedClose: parseNumber(row.adjustedClose, "adjustedClose", context, { min: 0 }),
      volume: parseNumber(row.volume, "volume", context, { allowEmpty: row.symbol.toUpperCase() === "XU100", min: 0 }),
      source: row.source
    };

    if (!normalized.source) throw new Error(`${context}: source is required.`);
    if (normalized.high < normalized.low) throw new Error(`${context}: high cannot be lower than low.`);

    const key = `${normalized.symbol}:${normalized.date}`;
    if (seen.has(key)) throw new Error(`${context}: duplicate price bar for ${key}.`);
    seen.add(key);

    return normalized;
  });
}

function normalizeCalendarRows(rows) {
  const seen = new Set();
  return rows.map((row, index) => {
    const context = `calendar row ${index + 2}`;
    if (!isDateKey(row.date)) throw new Error(`${context}: date must be YYYY-MM-DD.`);
    if (seen.has(row.date)) throw new Error(`${context}: duplicate calendar date ${row.date}.`);
    seen.add(row.date);

    return {
      date: row.date,
      isTradingDay: parseBoolean(row.isTradingDay, context),
      sessionType: row.sessionType || "full",
      note: row.note || ""
    };
  });
}

function between(date, start, end) {
  return date >= start && date <= end;
}

function buildCoverage({ prices, calendar, requirements }) {
  const priceKeys = new Set(prices.map((bar) => `${bar.symbol}:${bar.date}`));
  const tradingDates = calendar.filter((row) => row.isTradingDay).map((row) => row.date).sort();
  const calendarDates = calendar.map((row) => row.date).sort();
  const calendarStart = calendarDates[0] ?? null;
  const calendarEnd = calendarDates[calendarDates.length - 1] ?? null;

  return requirements.events.map((event) => {
    const hasCalendarRange = Boolean(
      calendarStart &&
      calendarEnd &&
      calendarStart <= event.requiredRangeStart &&
      calendarEnd >= event.requiredRangeEnd
    );
    const requiredTradingDates = tradingDates.filter((date) =>
      between(date, event.requiredRangeStart, event.requiredRangeEnd)
    );

    const series = event.requiredSeries.map((symbol) => {
      const missingDates = requiredTradingDates.filter((date) => !priceKeys.has(`${symbol}:${date}`));
      return {
        symbol,
        requiredTradingDateCount: requiredTradingDates.length,
        missingDateCount: missingDates.length,
        sampleMissingDates: missingDates.slice(0, 10),
        status: !hasCalendarRange || requiredTradingDates.length === 0
          ? "calendar_insufficient"
          : missingDates.length === 0
            ? "ready"
            : "missing_price_rows"
      };
    });

    return {
      slug: event.slug,
      ticker: event.ticker,
      requiredRangeStart: event.requiredRangeStart,
      requiredRangeEnd: event.requiredRangeEnd,
      calendarAvailableStart: calendarStart,
      calendarAvailableEnd: calendarEnd,
      calendarStatus: hasCalendarRange ? "covered" : "range_incomplete",
      series,
      status: series.every((item) => item.status === "ready") ? "ready" : "incomplete"
    };
  });
}

const pricePath = path.resolve(root, getArg("prices", "data/price-import-template.csv"));
const calendarPath = path.resolve(root, getArg("calendar", "data/trading-calendar-import-template.csv"));
const requirementsPath = path.resolve(root, getArg("requirements", "data/price-data-requirements.json"));
const outputPath = path.resolve(root, getArg("out", "data/price-import-validation-report.json"));

const errors = [];
let priceRows = [];
let calendarRows = [];
let coverage = [];

try {
  const parsedPrices = parseCsv(fs.readFileSync(pricePath, "utf8"));
  requireColumns(parsedPrices.headers, PRICE_COLUMNS, "Price import");
  priceRows = normalizePriceRows(parsedPrices.rows);
} catch (error) {
  errors.push(error.message);
}

try {
  const parsedCalendar = parseCsv(fs.readFileSync(calendarPath, "utf8"));
  requireColumns(parsedCalendar.headers, CALENDAR_COLUMNS, "Trading calendar import");
  calendarRows = normalizeCalendarRows(parsedCalendar.rows);
} catch (error) {
  errors.push(error.message);
}

if (!errors.length && fs.existsSync(requirementsPath)) {
  const requirements = JSON.parse(fs.readFileSync(requirementsPath, "utf8"));
  coverage = buildCoverage({ prices: priceRows, calendar: calendarRows, requirements });
}

const hasCoverageGaps = coverage.some((event) => event.status !== "ready");
const report = {
  version: "2026-05-25",
  status: errors.length ? "invalid" : hasCoverageGaps ? "valid_schema_with_coverage_gaps" : "ready",
  inputs: {
    prices: path.relative(root, pricePath).replace(/\\/g, "/"),
    calendar: path.relative(root, calendarPath).replace(/\\/g, "/"),
    requirements: path.relative(root, requirementsPath).replace(/\\/g, "/")
  },
  summary: {
    priceRows: priceRows.length,
    calendarRows: calendarRows.length,
    symbols: [...new Set(priceRows.map((row) => row.symbol))].sort(),
    coverageReadyEvents: coverage.filter((event) => event.status === "ready").length,
    coverageIncompleteEvents: coverage.filter((event) => event.status !== "ready").length
  },
  errors,
  coverage
};

fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

if (errors.length) {
  console.error(`price import invalid: ${errors.join("; ")}`);
  process.exitCode = 1;
} else {
  console.log(`price import schema ok: ${priceRows.length} price rows, ${calendarRows.length} calendar rows`);
  if (hasCoverageGaps) {
    console.log("coverage report has gaps; this is expected for template files.");
  }
}
