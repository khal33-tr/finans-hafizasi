import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stringifyCsv } from "../lib/csv.js";
import { addCalendarDays } from "../lib/price-reaction-calculator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const importsDir = path.join(root, "data/imports");

const plan = JSON.parse(fs.readFileSync(path.join(root, "data/pilot-price-import-plan.json"), "utf8"));
const requirements = JSON.parse(fs.readFileSync(path.join(root, "data/price-data-requirements.json"), "utf8"));
const selectedEvents = plan.selectedSlugs.map((slug) => {
  const event = requirements.events.find((item) => item.slug === slug);
  if (!event) throw new Error(`Pilot slug is not in price requirements: ${slug}`);
  return event;
});

const dateStart = selectedEvents
  .map((event) => event.requiredRangeStart)
  .sort()[0];
const dateEnd = selectedEvents
  .map((event) => event.requiredRangeEnd)
  .sort()
  .at(-1);
const symbols = [...new Set(selectedEvents.flatMap((event) => event.requiredSeries))].sort();

function dateRange(start, end) {
  const dates = [];
  let current = start;
  while (current <= end) {
    dates.push(current);
    current = addCalendarDays(current, 1);
  }
  return dates;
}

fs.mkdirSync(importsDir, { recursive: true });

const seriesRows = symbols.map((symbol) => {
  const relatedEvents = selectedEvents.filter((event) => event.requiredSeries.includes(symbol));
  return {
    symbol,
    requiredRangeStart: relatedEvents.map((event) => event.requiredRangeStart).sort()[0],
    requiredRangeEnd: relatedEvents.map((event) => event.requiredRangeEnd).sort().at(-1),
    eventSlugs: relatedEvents.map((event) => event.slug).join("|"),
    note: symbol === "XU100"
      ? "Benchmark endeks serisi; hacim boş kalabilir."
      : "Hisse serisi; hacim ve adjustedClose zorunludur."
  };
});

const dateRows = dateRange(dateStart, dateEnd).map((date) => ({
  date,
  isTradingDay: "",
  sessionType: "",
  note: "Resmi veya lisanslı takvim kaynağıyla doldurulacak."
}));

const priceHeaders = ["symbol", "date", "open", "high", "low", "close", "adjustedClose", "volume", "source"];
const calendarHeaders = ["date", "isTradingDay", "sessionType", "note"];

const manifest = {
  version: "2026-05-25",
  status: "awaiting_real_market_data",
  planFile: "data/pilot-price-import-plan.json",
  sourcePolicy: plan.sourcePolicy,
  selectedSlugs: plan.selectedSlugs,
  symbols,
  requiredDateRange: {
    start: dateStart,
    end: dateEnd
  },
  files: {
    requirements: "data/imports/pilot-price-data-requirements.json",
    requiredSeries: "data/imports/pilot-required-series.csv",
    requiredDates: "data/imports/pilot-required-dates.csv",
    priceImport: "data/imports/pilot-prices.csv",
    tradingCalendarImport: "data/imports/pilot-trading-calendar.csv"
  },
  nextCommandAfterDataEntry: "node scripts/validate-price-import.mjs --prices=data/imports/pilot-prices.csv --calendar=data/imports/pilot-trading-calendar.csv --requirements=data/imports/pilot-price-data-requirements.json --out=data/imports/pilot-validation-report.json",
  publicationGate: "Fiyat veri kaynağı lisans ve yeniden kullanım şartları doğrulanmadan public veri olarak yayımlanmaz."
};

const pilotRequirements = {
  ...requirements,
  status: "pilot_price_data_requirements",
  sourceInput: "data/pilot-price-import-plan.json",
  principle: "Bu dosya yalnızca ilk pilot kapsamındaki 3 candidate kaydın fiyat ve takvim verisini denetlemek için üretilmiştir.",
  symbols,
  events: selectedEvents
};

fs.writeFileSync(
  path.join(importsDir, "pilot-price-data-requirements.json"),
  `${JSON.stringify(pilotRequirements, null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "pilot-required-series.csv"),
  `${stringifyCsv(seriesRows, ["symbol", "requiredRangeStart", "requiredRangeEnd", "eventSlugs", "note"])}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "pilot-required-dates.csv"),
  `${stringifyCsv(dateRows, calendarHeaders)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "pilot-prices.csv"),
  `${priceHeaders.join(",")}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "pilot-trading-calendar.csv"),
  `${calendarHeaders.join(",")}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "pilot-import-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);

console.log(`pilot import templates ok: ${selectedEvents.length} events, ${symbols.length} symbols, ${dateRows.length} calendar dates`);
