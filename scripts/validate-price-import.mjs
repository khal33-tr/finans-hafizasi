import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, requireColumns } from "../lib/csv.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PRICE_COLUMNS = ["symbol", "date", "open", "high", "low", "close", "adjustedClose", "volume", "source"];
const CALENDAR_COLUMNS = ["date", "isTradingDay", "sessionType", "note"];
const SESSION_TYPES = ["full", "half", "closed"];

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
    if (normalized.high < normalized.open) throw new Error(`${context}: high cannot be lower than open.`);
    if (normalized.high < normalized.close) throw new Error(`${context}: high cannot be lower than close.`);
    if (normalized.low > normalized.open) throw new Error(`${context}: low cannot be higher than open.`);
    if (normalized.low > normalized.close) throw new Error(`${context}: low cannot be higher than close.`);
    if (normalized.open === 0 || normalized.high === 0 || normalized.low === 0 || normalized.close === 0 || normalized.adjustedClose === 0) {
      throw new Error(`${context}: price fields must be greater than zero.`);
    }

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

    const isTradingDay = parseBoolean(row.isTradingDay, context);
    const sessionType = row.sessionType || (isTradingDay ? "full" : "closed");

    if (!SESSION_TYPES.includes(sessionType)) {
      throw new Error(`${context}: sessionType must be one of ${SESSION_TYPES.join(", ")}.`);
    }
    if (isTradingDay && sessionType === "closed") {
      throw new Error(`${context}: sessionType cannot be closed when isTradingDay is true.`);
    }
    if (!isTradingDay && sessionType !== "closed") {
      throw new Error(`${context}: sessionType must be closed when isTradingDay is false.`);
    }

    return {
      date: row.date,
      isTradingDay,
      sessionType,
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

function buildDiagnostics({ prices, calendar, requirements }) {
  const warnings = [];
  const calendarByDate = new Map(calendar.map((row) => [row.date, row]));
  const requiredSymbols = new Set(requirements.symbols ?? requirements.events.flatMap((event) => event.requiredSeries));
  const requiredRangeStart = requirements.events.map((event) => event.requiredRangeStart).sort()[0] ?? null;
  const requiredRangeEnd = requirements.events.map((event) => event.requiredRangeEnd).sort().at(-1) ?? null;
  const importedSymbols = new Set(prices.map((row) => row.symbol));

  for (const symbol of requiredSymbols) {
    if (!importedSymbols.has(symbol)) {
      warnings.push({
        code: "required_symbol_missing",
        message: `${symbol} için fiyat satırı bulunamadı.`
      });
    }
  }

  for (const row of prices) {
    const context = `${row.symbol}:${row.date}`;

    if (!requiredSymbols.has(row.symbol)) {
      warnings.push({
        code: "unexpected_symbol",
        message: `${context} gereksinim dosyasında beklenen semboller arasında değil.`
      });
    }

    if (requiredRangeStart && requiredRangeEnd && !between(row.date, requiredRangeStart, requiredRangeEnd)) {
      warnings.push({
        code: "outside_required_range",
        message: `${context} gerekli tarih aralığının dışında.`
      });
    }

    const calendarRow = calendarByDate.get(row.date);
    if (!calendarRow) {
      warnings.push({
        code: "calendar_date_missing_for_price",
        message: `${context} için takvim satırı yok.`
      });
    } else if (!calendarRow.isTradingDay) {
      warnings.push({
        code: "price_on_closed_day",
        message: `${context} kapalı işlem gününe fiyat satırı girilmiş.`
      });
    }
  }

  return warnings;
}

function buildNextActions({ errors, warnings, coverage }) {
  if (errors.length) {
    return [
      "CSV başlıklarını ve zorunlu alanları düzelt.",
      "Tarihleri YYYY-MM-DD formatına, sayısal alanları noktalı ondalık formata getir.",
      "Doğrulamayı aynı komutla tekrar çalıştır."
    ];
  }

  const incompleteEvents = coverage.filter((event) => event.status !== "ready");
  if (incompleteEvents.length) {
    return [
      `${incompleteEvents.length} olay için fiyat veya takvim kapsamı eksik. coverage bölümündeki sampleMissingDates alanlarını doldur.`,
      "Takvim dosyasının requiredRangeStart ve requiredRangeEnd aralığını eksiksiz kapsadığını kontrol et.",
      "Her hisse ve XU100 için aynı işlem günlerinde adjustedClose satırı bulunduğundan emin ol."
    ];
  }

  if (warnings.length) {
    return [
      "Şema ve kapsam hazır görünüyor; warnings listesindeki uyarıları editör kontrolünden geçir.",
      "Uyarılar kabul edilebilir değilse fiyat veya takvim CSV dosyasını düzeltip doğrulamayı tekrar çalıştır."
    ];
  }

  return [
    "İçe aktarma dosyaları hesap motoru için hazır.",
    "Kullanılan fiyat kaynağının lisans ve yeniden kullanım koşullarını yayın öncesi tekrar kontrol et."
  ];
}

const pricePath = path.resolve(root, getArg("prices", "data/price-import-template.csv"));
const calendarPath = path.resolve(root, getArg("calendar", "data/trading-calendar-import-template.csv"));
const requirementsPath = path.resolve(root, getArg("requirements", "data/price-data-requirements.json"));
const outputPath = path.resolve(root, getArg("out", "data/price-import-validation-report.json"));

const errors = [];
let warnings = [];
let priceRows = [];
let calendarRows = [];
let coverage = [];
let requirements = null;

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
  try {
    requirements = JSON.parse(fs.readFileSync(requirementsPath, "utf8"));
    coverage = buildCoverage({ prices: priceRows, calendar: calendarRows, requirements });
    warnings = buildDiagnostics({ prices: priceRows, calendar: calendarRows, requirements });
  } catch (error) {
    errors.push(error.message);
  }
}

const hasCoverageGaps = coverage.some((event) => event.status !== "ready");
const report = {
  version: "2026-05-25",
  status: errors.length
    ? "invalid"
    : hasCoverageGaps
      ? "valid_schema_with_coverage_gaps"
      : warnings.length
        ? "ready_with_warnings"
        : "ready",
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
    coverageIncompleteEvents: coverage.filter((event) => event.status !== "ready").length,
    warnings: warnings.length
  },
  errors,
  warnings,
  nextActions: buildNextActions({ errors, warnings, coverage }),
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
