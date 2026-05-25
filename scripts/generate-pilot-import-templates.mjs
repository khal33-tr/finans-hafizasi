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
  return {
    ...event,
    requiredRangeEnd: event.requiredShortReactionRangeEnd ?? event.requiredRangeEnd,
    requiredPostBaseCalendarDays:
      event.requiredShortReactionCalendarDays ?? requirements.coverageRule.shortReactionPostBaseCalendarDaysRequired,
    windowScope: "short_reaction"
  };
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
const fieldGuideHeaders = ["file", "field", "required", "formatOrAllowedValue", "example", "validationRule"];

const priceFieldGuideRows = [
  {
    file: "pilot-prices.csv",
    field: "symbol",
    required: "yes",
    formatOrAllowedValue: symbols.join("|"),
    example: symbols[0],
    validationRule: "Büyük/küçük harf fark etmez; sistem büyük harfe çevirir."
  },
  {
    file: "pilot-prices.csv",
    field: "date",
    required: "yes",
    formatOrAllowedValue: "YYYY-MM-DD",
    example: dateStart,
    validationRule: "Takvim dosyasında aynı tarih bulunmalı ve işlem günü olmalı."
  },
  {
    file: "pilot-prices.csv",
    field: "open",
    required: "yes",
    formatOrAllowedValue: "positive_number_dot_decimal",
    example: "123.45",
    validationRule: "Sıfırdan büyük olmalı; high değerinden büyük olamaz."
  },
  {
    file: "pilot-prices.csv",
    field: "high",
    required: "yes",
    formatOrAllowedValue: "positive_number_dot_decimal",
    example: "125.10",
    validationRule: "open, low ve close değerlerinden düşük olamaz."
  },
  {
    file: "pilot-prices.csv",
    field: "low",
    required: "yes",
    formatOrAllowedValue: "positive_number_dot_decimal",
    example: "121.80",
    validationRule: "open, high ve close değerlerinden yüksek olamaz."
  },
  {
    file: "pilot-prices.csv",
    field: "close",
    required: "yes",
    formatOrAllowedValue: "positive_number_dot_decimal",
    example: "124.00",
    validationRule: "Sıfırdan büyük olmalı; high/low aralığında kalmalı."
  },
  {
    file: "pilot-prices.csv",
    field: "adjustedClose",
    required: "yes",
    formatOrAllowedValue: "positive_number_dot_decimal",
    example: "123.20",
    validationRule: "Temettü ve sermaye işlemleri etkisi bu alana yansıtılmalı."
  },
  {
    file: "pilot-prices.csv",
    field: "volume",
    required: "stock_yes_xu100_optional",
    formatOrAllowedValue: "integer_or_blank_for_xu100",
    example: "1250000",
    validationRule: "Hisse satırında boş olamaz; XU100 satırında boş kalabilir."
  },
  {
    file: "pilot-prices.csv",
    field: "source",
    required: "yes",
    formatOrAllowedValue: "provider_or_import_note",
    example: "Borsa Istanbul DataStore 2026-05-25 export",
    validationRule: "Her satırda veri kaynağı izlenebilir olmalı."
  }
];

const calendarFieldGuideRows = [
  {
    file: "pilot-trading-calendar.csv",
    field: "date",
    required: "yes",
    formatOrAllowedValue: "YYYY-MM-DD",
    example: dateStart,
    validationRule: "Tekrar eden tarih olamaz."
  },
  {
    file: "pilot-trading-calendar.csv",
    field: "isTradingDay",
    required: "yes",
    formatOrAllowedValue: "true|false",
    example: "true",
    validationRule: "true, 1, yes, evet veya false, 0, no, hayır kabul edilir."
  },
  {
    file: "pilot-trading-calendar.csv",
    field: "sessionType",
    required: "yes",
    formatOrAllowedValue: "full|half|closed",
    example: "full",
    validationRule: "isTradingDay false ise closed olmalı; true ise full veya half olmalı."
  },
  {
    file: "pilot-trading-calendar.csv",
    field: "note",
    required: "yes",
    formatOrAllowedValue: "free_text",
    example: "Resmi işlem günü",
    validationRule: "Tatil, yarım gün veya veri kaynağı notu yazılmalı."
  }
];

const manifest = {
  version: "2026-05-25",
  status: "awaiting_real_market_data",
  windowScope: "short_reaction",
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
    priceFieldGuide: "data/imports/pilot-price-field-guide.csv",
    calendarFieldGuide: "data/imports/pilot-calendar-field-guide.csv",
    operatorChecklist: "data/imports/pilot-import-operator-checklist.md",
    priceImport: "data/imports/pilot-prices.csv",
    tradingCalendarImport: "data/imports/pilot-trading-calendar.csv",
    validationReport: "data/imports/pilot-validation-report.json"
  },
  nextCommandAfterDataEntry:
    "node scripts/validate-price-import.mjs --prices=data/imports/pilot-prices.csv --calendar=data/imports/pilot-trading-calendar.csv --requirements=data/imports/pilot-price-data-requirements.json --out=data/imports/pilot-validation-report.json",
  publicationGate:
    "Fiyat veri kaynağı lisans ve yeniden kullanım şartları doğrulanmadan public veri olarak yayımlanmaz.",
  longMonitoringNote:
    "90G, 180G ve 1Y pencereleri ayrı uzun izleme katmanıdır; kısa tepki pilotunun bugün tamamlanabilirliğini engellemez."
};

const shortCoverageRule = {
  ...requirements.coverageRule,
  afterBaseCalendarBufferDays: requirements.coverageRule.shortReactionAfterBaseCalendarBufferDays,
  postBaseCalendarDaysRequired: requirements.coverageRule.shortReactionPostBaseCalendarDaysRequired,
  windowKeys: requirements.coverageRule.shortReactionWindowKeys
};

const pilotRequirements = {
  ...requirements,
  status: "pilot_price_data_requirements",
  windowScope: "short_reaction",
  sourceInput: "data/pilot-price-import-plan.json",
  principle:
    "Bu dosya yalnızca ilk pilot kapsamındaki 3 candidate kaydın kısa tepki fiyat ve takvim verisini denetlemek için üretilmiştir.",
  coverageRule: shortCoverageRule,
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
  path.join(importsDir, "pilot-price-field-guide.csv"),
  `${stringifyCsv(priceFieldGuideRows, fieldGuideHeaders)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(importsDir, "pilot-calendar-field-guide.csv"),
  `${stringifyCsv(calendarFieldGuideRows, fieldGuideHeaders)}\n`,
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
fs.writeFileSync(
  path.join(importsDir, "pilot-import-operator-checklist.md"),
  `# Pilot Import Operatör Kontrol Listesi

Bu dosya gerçek fiyat verisi girilirken hata payını azaltmak için üretilir.

## Kapsam

- Olay sayısı: ${selectedEvents.length}
- Sembol sayısı: ${symbols.length}
- Semboller: ${symbols.join(", ")}
- Kısa tepki tarih aralığı: ${dateStart} - ${dateEnd}

## Doldurma Sırası

1. \`pilot-required-series.csv\` dosyasından sembol ve tarih aralığını kontrol et.
2. \`pilot-required-dates.csv\` dosyasını resmi/lisanslı BIST işlem takvimine göre doldur.
3. Sadece işlem günü olan tarihler için \`pilot-prices.csv\` içine fiyat satırları gir.
4. Hisse satırlarında \`volume\` zorunludur; \`XU100\` satırında boş kalabilir.
5. Her satırda \`source\` alanına veri sağlayıcı ve dışa aktarım notu yaz.
6. Temettü içeren olaylarda \`adjustedClose\` alanını ayrıca kontrol et.

## Hızlı Format Kuralları

- Tarih: \`YYYY-MM-DD\`
- Ondalık: virgül değil nokta kullan, örnek \`123.45\`
- \`sessionType\`: \`full\`, \`half\` veya \`closed\`
- Kapalı günlerde fiyat satırı girme.
- Aynı \`symbol + date\` için ikinci satır girme.

## Doğrulama Komutu

\`\`\`bash
${manifest.nextCommandAfterDataEntry}
\`\`\`

Rapor \`ready\` dönmeden public veri yayınlama.
`,
  "utf8"
);

console.log(`pilot import templates ok: ${selectedEvents.length} events, ${symbols.length} symbols, ${dateRows.length} calendar dates`);
