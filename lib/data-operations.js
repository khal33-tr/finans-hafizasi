import marketDataPolicy from "@/data/market-data-source-policy.json";
import maturityReport from "@/data/imports/pilot-window-maturity-report.json";
import todayRequirements from "@/data/imports/today-completable-price-data-requirements.json";
import todayValidationReport from "@/data/imports/today-completable-validation-report.json";

export function getDataOperationSnapshot() {
  const todayEvent = todayRequirements.events[0];
  const futureEvents = maturityReport.events.filter((event) => event.status === "awaiting_future_window");
  const dateMaturedEvents = maturityReport.events.filter((event) => event.status === "date_matured");

  return {
    asOfDate: maturityReport.asOfDate,
    sourcePolicyStatus: marketDataPolicy.status,
    preferredPriceSource: marketDataPolicy.priceSourceOptions[0]?.name ?? "Borsa İstanbul DataStore",
    todayCompletable: {
      ticker: todayEvent?.ticker ?? "TUPRS",
      eventCount: dateMaturedEvents.length,
      symbols: todayRequirements.symbols,
      rangeStart: todayEvent?.requiredRangeStart ?? "-",
      rangeEnd: todayEvent?.requiredRangeEnd ?? "-",
      validationStatus: todayValidationReport.status,
      readyEvents: todayValidationReport.summary.coverageReadyEvents,
      incompleteEvents: todayValidationReport.summary.coverageIncompleteEvents
    },
    futureWindows: futureEvents.map((event) => ({
      ticker: event.ticker,
      slug: event.slug,
      blockingWindows: event.blockingWindows
    }))
  };
}
