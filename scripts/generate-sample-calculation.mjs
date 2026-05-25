import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calculateEventReaction } from "../lib/price-reaction-calculator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const inputs = JSON.parse(fs.readFileSync(path.join(root, "data/calculation-inputs.json"), "utf8"));
const sampleBars = JSON.parse(fs.readFileSync(path.join(root, "data/sample-price-bars.json"), "utf8"));

const thyaoInput = inputs.events.find((event) => event.slug === "thyao-2026-ilk-ceyrek-finansal-sonuclari");
if (!thyaoInput) {
  throw new Error("THYAO sample input is missing.");
}

const result = calculateEventReaction({
  input: thyaoInput,
  priceBars: sampleBars.bars,
  calendarRows: sampleBars.tradingCalendar,
  windowDefinitions: inputs.windowDefinitions
});

const payload = {
  version: "2026-05-25",
  status: "sample_calculation_output",
  warning: "Bu dosya gerçek piyasa verisi değildir; hesap motorunu doğrulamak için üretilmiş örnek çıktıdır.",
  sourceInput: "data/calculation-inputs.json",
  sourcePrices: "data/sample-price-bars.json",
  results: [result]
};

fs.writeFileSync(
  path.join(root, "data/sample-calculation-output.json"),
  `${JSON.stringify(payload, null, 2)}\n`,
  "utf8"
);

console.log(`sample calculation ok: ${result.slug}`);
