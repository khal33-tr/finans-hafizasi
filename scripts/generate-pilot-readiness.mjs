import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stringifyCsv } from "../lib/csv.js";
import {
  addCalendarDays,
  buildTradingCalendar,
  resolveWindowEndDate
} from "../lib/price-reaction-calculator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const importsDir = path.join(root, "data/imports");
const asOfDate = process.argv.find((arg) => arg.startsWith("--as-of="))?.slice("--as-of=".length) ?? "2026-05-25";

const pilotRequirements = JSON.parse(
  fs.readFileSync(path.join(importsDir, "pilot-price-data-requirements.json"), "utf8")
);
const calculationInputs = JSON.parse(
  fs.readFileSync(path.join(root, "data/calculation-inputs.json"), "utf8")
);

function buildWeekdayCalendar(start, end) {
  const rows = [];
  let current = start;
  while (current <= end) {
    const day = new Date(`${current}T00:00:00Z`).getUTCDay();
    const isWeekend = day === 0 || day === 6;
    const isKnownClosed = current === "2026-05-01";
    rows.push({
      date: current,
      isTradingDay: !isWeekend && !isKnownClosed,
      sessionType: !isWeekend && !isKnownClosed ? "full" : "closed",
      note: "Pencere olgunluğu için geçici takvim varsayımı; resmi takvim değildir."
    });
    current = addCalendarDays(current, 1);
  }
  return rows;
}

const calendarStart = pilotRequirements.events.map((event) => event.requiredRangeStart).sort()[0];
const calendarEnd = addCalendarDays(
  pilotRequirements.events.map((event) => event.requiredRangeEnd).sort().at(-1),
  10
);
const calendar = buildTradingCalendar(buildWeekdayCalendar(calendarStart, calendarEnd));

const events = pilotRequirements.events.map((event) => {
  const windows = calculationInputs.windowDefinitions.map((definition) => {
    const estimatedEndDate = resolveWindowEndDate(event.baseDate, definition, calendar);
    return {
      key: definition.key,
      label: definition.label,
      estimatedEndDate,
      status: estimatedEndDate <= asOfDate ? "available_by_date" : "future_window"
    };
  });

  const futureWindows = windows.filter((window) => window.status === "future_window");
  return {
    slug: event.slug,
    ticker: event.ticker,
    baseDate: event.baseDate,
    requiredRangeStart: event.requiredRangeStart,
    requiredRangeEnd: event.requiredRangeEnd,
    windows,
    status: futureWindows.length ? "awaiting_future_window" : "date_matured",
    blockingWindows: futureWindows.map((window) => ({
      key: window.key,
      label: window.label,
      estimatedEndDate: window.estimatedEndDate
    }))
  };
});

const readyEvents = events.filter((event) => event.status === "date_matured");
const futureEvents = events.filter((event) => event.status !== "date_matured");

function buildRequirements(status, selectedEvents, principle) {
  return {
    ...pilotRequirements,
    status,
    principle,
    symbols: [...new Set(selectedEvents.flatMap((event) => event.requiredSeries))].sort(),
    events: selectedEvents
  };
}

const readyRequirementEvents = pilotRequirements.events.filter((event) =>
  readyEvents.some((ready) => ready.slug === event.slug)
);
const futureRequirementEvents = pilotRequirements.events.filter((event) =>
  futureEvents.some((future) => future.slug === event.slug)
);

const readinessReport = {
  version: "2026-05-25",
  status: "pilot_window_maturity_report",
  asOfDate,
  principle: "Bu rapor fiyat verisi üretmez; yalnızca pilot olayların hesap pencerelerinin takvim olarak olgunlaşıp olgunlaşmadığını gösterir.",
  calendarAssumption: "Hafta sonları kapalı, 2026-05-01 kapalı varsayılmıştır. Resmi BIST işlem takvimi yerine geçmez.",
  summary: {
    dateMaturedEvents: readyEvents.length,
    awaitingFutureWindowEvents: futureEvents.length
  },
  events
};

const seriesRows = readyRequirementEvents
  .flatMap((event) => event.requiredSeries.map((symbol) => ({ event, symbol })))
  .reduce((rows, item) => {
    const existing = rows.find((row) => row.symbol === item.symbol);
    if (!existing) {
      rows.push({
        symbol: item.symbol,
        requiredRangeStart: item.event.requiredRangeStart,
        requiredRangeEnd: item.event.requiredRangeEnd,
        eventSlugs: item.event.slug,
        note: item.symbol === "XU100"
          ? "Benchmark endeks serisi; hacim boş kalabilir."
          : "Hisse serisi; hacim ve adjustedClose zorunludur."
      });
      return rows;
    }

    existing.requiredRangeStart = [existing.requiredRangeStart, item.event.requiredRangeStart].sort()[0];
    existing.requiredRangeEnd = [existing.requiredRangeEnd, item.event.requiredRangeEnd].sort().at(-1);
    existing.eventSlugs = `${existing.eventSlugs}|${item.event.slug}`;
    return rows;
  }, [])
  .sort((a, b) => a.symbol.localeCompare(b.symbol));

fs.writeFileSync(
  path.join(importsDir, "pilot-window-maturity-report.json"),
  `${JSON.stringify(readinessReport, null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "today-completable-price-data-requirements.json"),
  `${JSON.stringify(buildRequirements(
    "today_completable_price_data_requirements",
    readyRequirementEvents,
    "Bu dosya yalnızca asOfDate itibarıyla tüm pencereleri tarihsel olarak oluşmuş pilot kayıtları kapsar."
  ), null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "future-window-price-data-requirements.json"),
  `${JSON.stringify(buildRequirements(
    "future_window_price_data_requirements",
    futureRequirementEvents,
    "Bu dosya asOfDate itibarıyla 30G gibi gelecekteki penceresi henüz oluşmamış pilot kayıtları kapsar."
  ), null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "today-completable-required-series.csv"),
  `${stringifyCsv(seriesRows, ["symbol", "requiredRangeStart", "requiredRangeEnd", "eventSlugs", "note"])}\n`,
  "utf8"
);

console.log(`pilot readiness ok: ${readyEvents.length} date-matured, ${futureEvents.length} awaiting future windows`);
