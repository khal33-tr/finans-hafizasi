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
const afterBufferDays = 37;

const events = inputs.events.map((event) => ({
  slug: event.slug,
  ticker: event.ticker,
  baseDate: event.baseDate,
  requiredSeries: event.requiredSeries,
  requiredRangeStart: addCalendarDays(event.baseDate, -beforeBufferDays),
  requiredRangeEnd: addCalendarDays(event.baseDate, afterBufferDays),
  requiredPreBaseTradingDays: 20,
  requiredPostBaseCalendarDays: 30,
  specialHandling: event.specialHandling ?? [],
  note: "Bu aralık doğrulama için tamponlu minimum veri toplama aralığıdır; kesin pencereler işlem takvimiyle çözülür."
}));

const symbols = [...new Set(events.flatMap((event) => event.requiredSeries))].sort();
const payload = {
  version: "2026-05-25",
  status: "price_data_requirements",
  sourceInput: "data/calculation-inputs.json",
  principle: "Bu dosya ilk 10 candidate kaydın fiyat ve takvim verisi için gereken minimum kapsamı denetlemek amacıyla üretilmiştir.",
  coverageRule: {
    beforeBaseCalendarBufferDays: beforeBufferDays,
    afterBaseCalendarBufferDays: afterBufferDays,
    preBaseTradingDaysRequired: 20,
    postBaseCalendarDaysRequired: 30,
    benchmark: inputs.benchmark.symbol
  },
  symbols,
  events
};

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`price data requirements ok: ${events.length} events, ${symbols.length} symbols`);
