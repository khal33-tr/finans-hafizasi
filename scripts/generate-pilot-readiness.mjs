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
const fullRequirements = JSON.parse(fs.readFileSync(path.join(root, "data/price-data-requirements.json"), "utf8"));
const calculationInputs = JSON.parse(
  fs.readFileSync(path.join(root, "data/calculation-inputs.json"), "utf8")
);

const shortWindowKeys = calculationInputs.windowGroups?.short_reaction ?? ["d1", "d3", "w1", "w2", "d30"];
const longWindowKeys = calculationInputs.windowGroups?.long_monitoring ?? ["d90", "d180", "y1"];
const shortDefinitions = calculationInputs.windowDefinitions.filter((definition) =>
  shortWindowKeys.includes(definition.key)
);
const longDefinitions = calculationInputs.windowDefinitions.filter((definition) =>
  longWindowKeys.includes(definition.key)
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

function buildWindowStatuses(event, definitions, calendar) {
  return definitions.map((definition) => {
    const estimatedEndDate = resolveWindowEndDate(event.baseDate, definition, calendar);
    return {
      key: definition.key,
      label: definition.label,
      estimatedEndDate,
      status: estimatedEndDate <= asOfDate ? "available_by_date" : "future_window"
    };
  });
}

function summarizeBlockingWindows(windows) {
  return windows
    .filter((window) => window.status === "future_window")
    .map((window) => ({
      key: window.key,
      label: window.label,
      estimatedEndDate: window.estimatedEndDate
    }));
}

const fullPilotEvents = fullRequirements.events.filter((event) =>
  pilotRequirements.events.some((pilotEvent) => pilotEvent.slug === event.slug)
);
const calendarStart = pilotRequirements.events.map((event) => event.requiredRangeStart).sort()[0];
const calendarEnd = addCalendarDays(
  fullPilotEvents.map((event) => event.requiredRangeEnd).sort().at(-1) ??
    pilotRequirements.events.map((event) => event.requiredRangeEnd).sort().at(-1),
  10
);
const calendar = buildTradingCalendar(buildWeekdayCalendar(calendarStart, calendarEnd));

const events = pilotRequirements.events.map((event) => {
  const shortReactionWindows = buildWindowStatuses(event, shortDefinitions, calendar);
  const longMonitoringWindows = buildWindowStatuses(event, longDefinitions, calendar);
  const blockingWindows = summarizeBlockingWindows(shortReactionWindows);
  const longMonitoringBlockingWindows = summarizeBlockingWindows(longMonitoringWindows);

  return {
    slug: event.slug,
    ticker: event.ticker,
    baseDate: event.baseDate,
    requiredRangeStart: event.requiredRangeStart,
    requiredRangeEnd: event.requiredRangeEnd,
    windowScope: "short_reaction",
    windows: shortReactionWindows,
    shortReactionWindows,
    longMonitoringWindows,
    status: blockingWindows.length ? "awaiting_future_window" : "date_matured",
    blockingWindows,
    longMonitoringStatus: longMonitoringBlockingWindows.length ? "awaiting_future_window" : "date_matured",
    longMonitoringBlockingWindows
  };
});

const readyEvents = events.filter((event) => event.status === "date_matured");
const futureEvents = events.filter((event) => event.status !== "date_matured");

function buildRequirements(baseRequirements, status, selectedEvents, principle, extra = {}) {
  return {
    ...baseRequirements,
    status,
    principle,
    symbols: [...new Set(selectedEvents.flatMap((event) => event.requiredSeries))].sort(),
    events: selectedEvents,
    ...extra
  };
}

const readyRequirementEvents = pilotRequirements.events.filter((event) =>
  readyEvents.some((ready) => ready.slug === event.slug)
);
const futureRequirementEvents = pilotRequirements.events.filter((event) =>
  futureEvents.some((future) => future.slug === event.slug)
);
const longMonitoringRequirementEvents = fullPilotEvents.map((event) => ({
  ...event,
  requiredRangeEnd: event.requiredLongMonitoringRangeEnd ?? event.requiredRangeEnd,
  requiredPostBaseCalendarDays:
    event.requiredLongMonitoringCalendarDays ?? fullRequirements.coverageRule.longMonitoringPostBaseCalendarDaysRequired,
  windowScope: "long_monitoring"
}));

const readinessReport = {
  version: "2026-05-25",
  status: "pilot_window_maturity_report",
  asOfDate,
  principle:
    "Bu rapor fiyat verisi üretmez; kısa tepki pencerelerinin yayın için olgunluğunu ve uzun izleme pencerelerinin ayrı bekleme durumunu gösterir.",
  calendarAssumption:
    "Hafta sonları kapalı, 2026-05-01 kapalı varsayılmıştır. Resmi BIST işlem takvimi yerine geçmez.",
  windowGroups: {
    shortReaction: shortWindowKeys,
    longMonitoring: longWindowKeys
  },
  summary: {
    dateMaturedEvents: readyEvents.length,
    awaitingFutureWindowEvents: futureEvents.length,
    longMonitoringAwaitingEvents: events.filter((event) => event.longMonitoringStatus !== "date_matured").length
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
    pilotRequirements,
    "today_completable_price_data_requirements",
    readyRequirementEvents,
    "Bu dosya yalnızca asOfDate itibarıyla kısa tepki pencereleri tarihsel olarak oluşmuş pilot kayıtları kapsar.",
    { windowScope: "short_reaction" }
  ), null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "future-window-price-data-requirements.json"),
  `${JSON.stringify(buildRequirements(
    pilotRequirements,
    "future_window_price_data_requirements",
    futureRequirementEvents,
    "Bu dosya asOfDate itibarıyla kısa tepki penceresi henüz oluşmamış pilot kayıtları kapsar.",
    { windowScope: "short_reaction" }
  ), null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "long-monitoring-price-data-requirements.json"),
  `${JSON.stringify(buildRequirements(
    fullRequirements,
    "long_monitoring_price_data_requirements",
    longMonitoringRequirementEvents,
    "Bu dosya 90G, 180G ve 1Y uzun izleme pencereleri için ayrıca toplanacak pilot veri aralığını kapsar.",
    { windowScope: "long_monitoring" }
  ), null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "today-completable-required-series.csv"),
  `${stringifyCsv(seriesRows, ["symbol", "requiredRangeStart", "requiredRangeEnd", "eventSlugs", "note"])}\n`,
  "utf8"
);

console.log(
  `pilot readiness ok: ${readyEvents.length} short date-matured, ${futureEvents.length} awaiting short windows, ${readinessReport.summary.longMonitoringAwaitingEvents} awaiting long monitoring`
);
