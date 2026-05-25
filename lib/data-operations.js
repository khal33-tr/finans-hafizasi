import marketDataPolicy from "@/data/market-data-source-policy.json";
import pilotImportManifest from "@/data/imports/pilot-import-manifest.json";
import pilotRequirements from "@/data/imports/pilot-price-data-requirements.json";
import pilotValidationReport from "@/data/imports/pilot-validation-report.json";
import maturityReport from "@/data/imports/pilot-window-maturity-report.json";
import todayRequirements from "@/data/imports/today-completable-price-data-requirements.json";
import todayValidationReport from "@/data/imports/today-completable-validation-report.json";

const validationStatusLabels = {
  ready: "Hazır",
  ready_with_warnings: "Uyarılı hazır",
  valid_schema_with_coverage_gaps: "Veri bekleniyor",
  invalid: "Geçersiz"
};

const workflowStatusLabels = {
  awaiting_real_market_data: "Gerçek veri bekleniyor"
};

const coverageStatusLabels = {
  ready: "Hazır",
  incomplete: "Eksik"
};

const calendarStatusLabels = {
  covered: "Takvim kapsıyor",
  range_incomplete: "Takvim eksik"
};

function getValidationStatusLabel(status) {
  return validationStatusLabels[status] ?? status;
}

function getWorkflowStatusLabel(status) {
  return workflowStatusLabels[status] ?? status;
}

function getMissingSymbols(report, requiredSymbols) {
  const importedSymbols = new Set(report.summary.symbols ?? []);
  return requiredSymbols.filter((symbol) => !importedSymbols.has(symbol));
}

function getValidationSummary(report, requiredSymbols) {
  return {
    status: report.status,
    statusLabel: getValidationStatusLabel(report.status),
    priceRows: report.summary.priceRows,
    calendarRows: report.summary.calendarRows,
    warnings: report.summary.warnings,
    readyEvents: report.summary.coverageReadyEvents,
    incompleteEvents: report.summary.coverageIncompleteEvents,
    missingSymbols: getMissingSymbols(report, requiredSymbols),
    nextActions: report.nextActions.slice(0, 3)
  };
}

function getCoverageEventDetails(report, requirements) {
  return report.coverage.map((event) => {
    const requirement = requirements.events.find((item) => item.slug === event.slug);
    const missingSeries = event.series.filter((series) => series.status !== "ready").map((series) => series.symbol);
    const sampleMissingDates = event.series.flatMap((series) =>
      series.sampleMissingDates.map((date) => `${series.symbol}:${date}`)
    );

    return {
      slug: event.slug,
      ticker: event.ticker,
      status: event.status,
      statusLabel: coverageStatusLabels[event.status] ?? event.status,
      calendarStatus: event.calendarStatus,
      calendarStatusLabel: calendarStatusLabels[event.calendarStatus] ?? event.calendarStatus,
      requiredRangeStart: event.requiredRangeStart,
      requiredRangeEnd: event.requiredRangeEnd,
      baseDate: requirement?.baseDate ?? "-",
      requiredSeries: requirement?.requiredSeries ?? event.series.map((series) => series.symbol),
      missingSeries,
      sampleMissingDates: sampleMissingDates.slice(0, 6),
      specialHandling: requirement?.specialHandling ?? []
    };
  });
}

function getPublicationGateStatus(validation) {
  if (validation.status === "ready") return "Yayına alınabilir";
  if (validation.status === "ready_with_warnings") return "Editör onayı gerekli";
  if (validation.status === "invalid") return "CSV hatası var";
  return "Veri eksik";
}

export function getDataOperationSnapshot() {
  const todayEvent = todayRequirements.events[0];
  const futureEvents = maturityReport.events.filter((event) => event.status === "awaiting_future_window");
  const dateMaturedEvents = maturityReport.events.filter((event) => event.status === "date_matured");
  const todaySymbols = todayRequirements.symbols ?? [];

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
      validationStatusLabel: getValidationStatusLabel(todayValidationReport.status),
      readyEvents: todayValidationReport.summary.coverageReadyEvents,
      incompleteEvents: todayValidationReport.summary.coverageIncompleteEvents,
      warnings: todayValidationReport.summary.warnings,
      missingSymbols: getMissingSymbols(todayValidationReport, todaySymbols)
    },
    importWorkflow: {
      status: pilotImportManifest.status,
      statusLabel: getWorkflowStatusLabel(pilotImportManifest.status),
      windowScope: pilotImportManifest.windowScope,
      eventCount: pilotImportManifest.selectedSlugs.length,
      symbols: pilotImportManifest.symbols,
      requiredDateRange: pilotImportManifest.requiredDateRange,
      validation: getValidationSummary(pilotValidationReport, pilotImportManifest.symbols),
      publicationGate: getPublicationGateStatus(pilotValidationReport),
      coverageEvents: getCoverageEventDetails(pilotValidationReport, pilotRequirements),
      files: [
        {
          label: "Fiyat alan rehberi",
          purpose: "OHLC, adjustedClose, hacim ve kaynak kuralları"
        },
        {
          label: "Takvim alan rehberi",
          purpose: "İşlem günü, yarım gün ve kapalı gün denetimi"
        },
        {
          label: "Operatör kontrol listesi",
          purpose: "Veri giriş sırası ve yayın öncesi kontrol"
        },
        {
          label: "Doğrulama raporu",
          purpose: "Uyarılar, eksik kapsam ve sonraki aksiyonlar"
        }
      ]
    },
    futureWindows: futureEvents.map((event) => ({
      ticker: event.ticker,
      slug: event.slug,
      blockingWindows: event.blockingWindows
    }))
  };
}
