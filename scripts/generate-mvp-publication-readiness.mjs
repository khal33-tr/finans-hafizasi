import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function writeJson(relativePath, payload) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function hasPrimarySource(event) {
  return Array.isArray(event.sources) && event.sources.some((source) => source.isPrimary);
}

function hasShortReaction(event) {
  const requiredWindows = ["d1", "d3", "w1", "w2", "d30"];
  return requiredWindows.every((windowKey) => typeof event.returns?.[windowKey] === "number");
}

function getPilotStatus(event, todayCompletable, futureWindow) {
  if (todayCompletable.events.some((candidate) => candidate.slug === event.slug)) {
    return "short_window_mature_waiting_csv";
  }

  if (futureWindow.events.some((candidate) => candidate.slug === event.slug)) {
    return "short_window_not_yet_mature";
  }

  return "not_in_first_calculation_pilot";
}

const asOfDate = process.env.AS_OF_DATE || new Date().toISOString().slice(0, 10);
const candidateEvents = readJson("data/candidate-events.json");
const researchQueue = readJson("data/research-queue.json");
const todayCompletable = readJson("data/imports/today-completable-price-data-requirements.json");
const futureWindow = readJson("data/imports/future-window-price-data-requirements.json");
const longMonitoring = readJson("data/imports/long-monitoring-price-data-requirements.json");

const shortWindows = researchQueue.requiredWindows;
const longWindows = researchQueue.longMonitoringWindows;
const firstTenTickers = researchQueue.companies.slice(0, 10).map((company) => company.ticker);
const priorityTickerMap = new Map(researchQueue.companies.map((company) => [company.ticker, company.priority]));

const events = candidateEvents.map((event) => {
  const sourceReady = event.dataStatus === "source_found" && hasPrimarySource(event);
  const shortReactionReady = hasShortReaction(event);
  const marketDataReady =
    shortReactionReady &&
    typeof event.bistRelative === "number" &&
    typeof event.volumeMultiple === "number";

  return {
    slug: event.slug,
    ticker: event.ticker,
    priority: priorityTickerMap.get(event.ticker) ?? null,
    title: event.title,
    category: event.category,
    sourceStatus: sourceReady ? "primary_source_found" : "source_incomplete",
    calculationStatus: marketDataReady ? "calculated" : "waiting_market_data",
    verificationStatus: event.verificationStatus,
    publicMode: sourceReady ? "source_archive_with_data_pending_notice" : "hold",
    pilotStatus: getPilotStatus(event, todayCompletable, futureWindow),
    reactionStartDate: event.reactionStartDate,
    shortWindows,
    longMonitoringWindows: longWindows,
    requiredMarketData: ["adjustedClose", "volume", "XU100"],
    nextAction: marketDataReady
      ? "Editor kontrolünden sonra verified statüsü değerlendirilebilir."
      : "Lisans/kullanım şartı net fiyat, hacim ve XU100 serisi geldikten sonra hesaplama motoruna alınır."
  };
});

const sourceReadyEvents = events.filter((event) => event.sourceStatus === "primary_source_found");
const waitingMarketDataEvents = events.filter((event) => event.calculationStatus === "waiting_market_data");
const firstTenSourceReady = sourceReadyEvents.filter((event) => firstTenTickers.includes(event.ticker));

const payload = {
  version: "2026-05-29",
  asOfDate,
  status: "mvp_publication_readiness",
  principle:
    "Kaynak bulunan candidate kayıtlar public kaynak arşivi olarak gösterilebilir; fiyat tepkisi, hacim ve BIST 100 kıyası tamamlanmadan verified kayıt sayılmaz.",
  summary: {
    candidateEvents: candidateEvents.length,
    sourceReadyEvents: sourceReadyEvents.length,
    firstTenSourceReadyEvents: firstTenSourceReady.length,
    verifiedEvents: candidateEvents.filter((event) => event.verificationStatus === "verified").length,
    waitingMarketDataEvents: waitingMarketDataEvents.length,
    shortWindows,
    longMonitoringWindows: longWindows,
    firstCalculationPilotEvents: todayCompletable.events.length + futureWindow.events.length,
    todayCompletableShortReactionEvents: todayCompletable.events.length,
    futureShortReactionEvents: futureWindow.events.length,
    longMonitoringPilotEvents: longMonitoring.events.length
  },
  publicationGates: [
    {
      gate: "source_archive",
      required: [
        "primary_source_found",
        "neutral_summary",
        "data_pending_notice"
      ],
      allowedPublicLabel: "Kaynak bulundu, fiyat tepkisi için resmi veri bekleniyor."
    },
    {
      gate: "verified_reaction",
      required: [
        "licensed_adjusted_close",
        "volume_series",
        "benchmark_xu100_series",
        "calculation_report",
        "editor_review"
      ],
      allowedPublicLabel: "Doğrulanmış fiyat tepkisi."
    }
  ],
  recommendedBatches: [
    {
      name: "ilk_10_kaynakli_arsiv",
      purpose: "Siteye giren kullanıcıya projenin gerçek kaynak bulma disiplinini göstermek.",
      tickers: firstTenTickers,
      status: firstTenSourceReady.length === firstTenTickers.length ? "ready_as_source_archive" : "needs_source_completion"
    },
    {
      name: "ilk_hesaplama_pilotu",
      purpose: "Resmi piyasa verisi gelince hesaplama motorunu uçtan uca denemek.",
      slugs: [
        ...todayCompletable.events.map((event) => event.slug),
        ...futureWindow.events.map((event) => event.slug)
      ],
      status: "waiting_market_data"
    }
  ],
  events
};

writeJson("data/mvp-publication-readiness.json", payload);
console.log(
  `mvp publication readiness generated: ${payload.summary.sourceReadyEvents}/${payload.summary.candidateEvents} source-ready, ${payload.summary.waitingMarketDataEvents} waiting market data`
);
