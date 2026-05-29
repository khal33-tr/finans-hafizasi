import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildTradingCalendar,
  calculateEventReaction,
  calculateVolumeMultiple,
  percentChange,
  resolveWindowEndDate
} from "../lib/price-reaction-calculator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function runValidator(args) {
  return spawnSync(process.execPath, [path.join(root, "scripts/validate-price-import.mjs"), ...args], {
    cwd: root,
    encoding: "utf8"
  });
}

function writeFile(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text, "utf8");
}

const inputs = readJson("data/calculation-inputs.json");
const sampleBars = readJson("data/sample-price-bars.json");
const thyaoInput = inputs.events.find((event) => event.slug === "thyao-2026-ilk-ceyrek-finansal-sonuclari");

test("percentChange calculates positive and negative returns", () => {
  assert.equal(percentChange(100, 110), 10);
  assert.equal(percentChange(100, 95), -5);
  assert.equal(percentChange(322.02, 322.57), 0.1708);
});

test("percentChange rejects invalid base values", () => {
  assert.throws(() => percentChange(0, 100), /Base value cannot be zero/);
  assert.throws(() => percentChange("100", 110), /numeric values/);
});

test("trading windows skip known closed days and keep long monitoring dates", () => {
  const calendar = buildTradingCalendar(sampleBars.tradingCalendar);
  assert.equal(resolveWindowEndDate("2026-04-30", { type: "trading_day_offset", offset: 1 }, calendar), "2026-05-04");
  assert.equal(resolveWindowEndDate("2026-04-30", { type: "trading_day_offset", offset: 3 }, calendar), "2026-05-06");
  assert.equal(resolveWindowEndDate("2026-04-30", { type: "calendar_day_then_next_trading_day", calendarDays: 30 }, calendar), "2026-06-01");
  assert.equal(resolveWindowEndDate("2026-04-30", { type: "calendar_day_then_next_trading_day", calendarDays: 365 }, calendar), "2027-04-30");
});

test("sample event reaction output matches the calculation contract", () => {
  assert.ok(thyaoInput, "THYAO calculation input is missing.");

  const result = calculateEventReaction({
    input: thyaoInput,
    priceBars: sampleBars.bars,
    calendarRows: sampleBars.tradingCalendar,
    windowDefinitions: inputs.windowDefinitions
  });

  assert.equal(result.calculationStatus, "calculated");
  assert.equal(result.baseDate, "2026-04-30");
  assert.equal(result.benchmark, "XU100");

  assert.deepEqual(Object.keys(result.windows), ["d1", "d3", "w1", "w2", "d30", "d90", "d180", "y1"]);
  assert.equal(result.windows.d1.endDate, "2026-05-04");
  assert.equal(result.windows.d1.stockReturnPct, 0.1708);
  assert.equal(result.windows.d1.indexReturnPct, 0.2336);
  assert.equal(result.windows.d1.relativeReturnPct, -0.0628);
  assert.equal(result.windows.d30.endDate, "2026-06-01");
  assert.equal(result.windows.d30.relativeReturnPct, 4.6042);
  assert.equal(result.windows.d90.endDate, "2026-07-29");
  assert.equal(result.windows.d180.endDate, "2026-10-27");
  assert.equal(result.windows.y1.endDate, "2027-04-30");
  assert.equal(result.windows.y1.relativeReturnPct, 6.3188);
});

test("volume multiple uses the previous 20 trading days", () => {
  const calendar = buildTradingCalendar(sampleBars.tradingCalendar);
  const barIndex = new Map(sampleBars.bars.map((bar) => [`${bar.symbol}:${bar.date}`, bar]));
  const volume = calculateVolumeMultiple({
    ticker: "THYAO",
    baseDate: "2026-04-30",
    barIndex,
    calendar
  });

  assert.equal(volume.eventDayVolume, 1300000);
  assert.equal(volume.previousAverageVolume, 1200250);
  assert.equal(volume.volumeMultiple, 1.0831);
});

test("reaction calculation fails loudly when a required price bar is missing", () => {
  const incompleteBars = sampleBars.bars.filter((bar) => !(bar.symbol === "THYAO" && bar.date === "2026-05-04"));

  assert.throws(
    () =>
      calculateEventReaction({
        input: thyaoInput,
        priceBars: incompleteBars,
        calendarRows: sampleBars.tradingCalendar,
        windowDefinitions: inputs.windowDefinitions
      }),
    /Missing price bar for THYAO on 2026-05-04/
  );
});

test("price import validator accepts a complete minimal import", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "finans-hafizasi-validator-ok-"));

  try {
    const prices = path.join(tempDir, "prices.csv");
    const calendar = path.join(tempDir, "calendar.csv");
    const requirements = path.join(tempDir, "requirements.json");
    const report = path.join(tempDir, "report.json");

    writeFile(
      prices,
      [
        "symbol,date,open,high,low,close,adjustedClose,volume,source",
        "THYAO,2026-04-30,100,110,90,105,105,1000,test_fixture",
        "XU100,2026-04-30,10000,10100,9900,10050,10050,,test_fixture"
      ].join("\n")
    );
    writeFile(
      calendar,
      [
        "date,isTradingDay,sessionType,note",
        "2026-04-30,true,full,test"
      ].join("\n")
    );
    writeFile(
      requirements,
      JSON.stringify({
        symbols: ["THYAO", "XU100"],
        events: [
          {
            slug: "test-event",
            ticker: "THYAO",
            requiredRangeStart: "2026-04-30",
            requiredRangeEnd: "2026-04-30",
            requiredSeries: ["THYAO", "XU100"]
          }
        ]
      })
    );

    const result = runValidator([
      `--prices=${prices}`,
      `--calendar=${calendar}`,
      `--requirements=${requirements}`,
      `--out=${report}`
    ]);
    const payload = JSON.parse(fs.readFileSync(report, "utf8"));

    assert.equal(result.status, 0, result.stderr);
    assert.equal(payload.status, "ready");
    assert.equal(payload.summary.priceRows, 2);
    assert.equal(payload.summary.coverageReadyEvents, 1);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("price import validator rejects malformed imports", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "finans-hafizasi-validator-bad-"));

  try {
    const prices = path.join(tempDir, "prices.csv");
    const calendar = path.join(tempDir, "calendar.csv");
    const report = path.join(tempDir, "report.json");

    writeFile(
      prices,
      [
        "symbol,date,open,high,low,close,volume,source",
        "THYAO,2026-04-30,100,110,90,105,1000,test_fixture"
      ].join("\n")
    );
    writeFile(
      calendar,
      [
        "date,isTradingDay,sessionType,note",
        "2026-04-30,true,full,test"
      ].join("\n")
    );

    const result = runValidator([
      `--prices=${prices}`,
      `--calendar=${calendar}`,
      `--requirements=${path.join(tempDir, "missing-requirements.json")}`,
      `--out=${report}`
    ]);
    const payload = JSON.parse(fs.readFileSync(report, "utf8"));

    assert.notEqual(result.status, 0);
    assert.equal(payload.status, "invalid");
    assert.match(payload.errors.join("\n"), /adjustedClose/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

let passed = 0;

for (const { name, fn } of tests) {
  try {
    await fn();
    passed += 1;
    console.log(`ok ${passed} - ${name}`);
  } catch (error) {
    console.error(`not ok ${passed + 1} - ${name}`);
    console.error(error);
    process.exitCode = 1;
    break;
  }
}

if (!process.exitCode) {
  console.log(`system tests ok: ${passed}/${tests.length}`);
}
