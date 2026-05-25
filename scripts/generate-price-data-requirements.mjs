import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { addCalendarDays } from "../lib/price-reaction-calculator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "data/calculation-inputs.json");
const outputPath = path.join(root, "data/price-data-requirements.json");

const inputs = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const beforeBufferDays = 45;
const bufferAfterLastWindowDays = 14;
const shortReactionWindowKeys = inputs.windowGroups?.short_reaction ?? ["d1", "d3", "w1", "w2", "d30"];
const longMonitoringWindowKeys = inputs.windowGroups?.long_monitoring ?? ["d90", "d180", "y1"];

function maxCalendarDaysFor(windowKeys) {
  const selected = inputs.windowDefinitions.filter((definition) => windowKeys.includes(definition.key));
  const calendarDays = selected.map((definition) => definition.calendarDays ?? definition.offset ?? 0);
  return Math.max(0, ...calendarDays);
}

const shortReactionCalendarDays = maxCalendarDaysFor(shortReactionWindowKeys);
const longMonitoringCalendarDays = maxCalendarDaysFor(longMonitoringWindowKeys);
const requiredPostBaseCalendarDays = Math.max(shortReactionCalendarDays, longMonitoringCalendarDays);
const shortReactionAfterBufferDays = shortReactionCalendarDays + 7;
const afterBufferDays = requiredPostBaseCalendarDays + bufferAfterLastWindowDays;

const events = inputs.events.map((event) => ({
  slug: event.slug,
  ticker: event.ticker,
  baseDate: event.baseDate,
  requiredSeries: event.requiredSeries,
  requiredRangeStart: addCalendarDays(event.baseDate, -beforeBufferDays),
  requiredRangeEnd: addCalendarDays(event.baseDate, afterBufferDays),
  requiredShortReactionRangeEnd: addCalendarDays(event.baseDate, shortReactionAfterBufferDays),
  requiredLongMonitoringRangeEnd: addCalendarDays(event.baseDate, afterBufferDays),
  requiredPreBaseTradingDays: 20,
  requiredPostBaseCalendarDays,
  requiredShortReactionCalendarDays: shortReactionCalendarDays,
  requiredLongMonitoringCalendarDays: longMonitoringCalendarDays,
  specialHandling: event.specialHandling ?? [],
  note:
    "Bu aralık uzun izleme dahil tamponlu veri toplama aralığıdır; kısa tepki pilotu requiredShortReactionRangeEnd alanını kullanır."
}));

const symbols = [...new Set(events.flatMap((event) => event.requiredSeries))].sort();
const payload = {
  version: "2026-05-25",
  status: "price_data_requirements",
  sourceInput: "data/calculation-inputs.json",
  principle:
    "Bu dosya ilk 10 candidate kaydın kısa tepki ve uzun izleme fiyat/takvim verisi kapsamını denetlemek amacıyla üretilmiştir.",
  coverageRule: {
    beforeBaseCalendarBufferDays: beforeBufferDays,
    afterBaseCalendarBufferDays: afterBufferDays,
    shortReactionAfterBaseCalendarBufferDays: shortReactionAfterBufferDays,
    longMonitoringAfterBaseCalendarBufferDays: afterBufferDays,
    preBaseTradingDaysRequired: 20,
    postBaseCalendarDaysRequired: requiredPostBaseCalendarDays,
    shortReactionPostBaseCalendarDaysRequired: shortReactionCalendarDays,
    longMonitoringPostBaseCalendarDaysRequired: longMonitoringCalendarDays,
    shortReactionWindowKeys,
    longMonitoringWindowKeys,
    benchmark: inputs.benchmark.symbol
  },
  symbols,
  events
};

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`price data requirements ok: ${events.length} events, ${symbols.length} symbols`);
