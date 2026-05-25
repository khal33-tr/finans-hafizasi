import marketDataPolicy from "@/data/market-data-source-policy.json";
import pilotImportManifest from "@/data/imports/pilot-import-manifest.json";
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
