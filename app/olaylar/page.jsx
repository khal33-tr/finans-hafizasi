import EventsArchiveClient from "@/components/events-archive-client";
import DataReadinessNotice from "@/components/data-readiness-notice";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  dataStatuses,
  eventCategories,
  sampleEvents,
  tickers
} from "@/lib/market-data";
import { getDataOperationSnapshot, getEventImportState, getEventPublicationState } from "@/lib/data-operations";

export const metadata = {
  title: "Olay Arşivi | Finans Hafızası",
  description: "KAP kaynaklı aday olaylar, veri durumu ve fiyat tepkisi hesap akışı."
};

const sortOptions = ["newest", "oldest", "pilot_first", "missing_first", "ticker"];

function getSearchValue(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

function readFilter(value, allowedValues, fallback = "all") {
  return value && allowedValues.includes(value) ? value : fallback;
}

function buildInitialFilters(searchParams, { categories, statuses, importStatuses }) {
  return {
    ticker: readFilter(getSearchValue(searchParams, "ticker"), tickers),
    category: readFilter(
      getSearchValue(searchParams, "category"),
      categories.map((item) => item.value)
    ),
    status: readFilter(
      getSearchValue(searchParams, "status"),
      statuses.map((item) => item.value)
    ),
    importStatus: readFilter(
      getSearchValue(searchParams, "import"),
      importStatuses.map((item) => item.value)
    ),
    sort: readFilter(getSearchValue(searchParams, "sort"), sortOptions, "newest"),
    query: (getSearchValue(searchParams, "q") ?? "").slice(0, 120)
  };
}

export default async function EventsArchivePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const snapshot = getDataOperationSnapshot();
  const publication = snapshot.mvpPublication;
  const sourceArchiveBatch = publication.recommendedBatches[0];
  const sourceArchiveTickers = new Set(sourceArchiveBatch.tickers);
  const eventsWithImportState = sampleEvents.map((event) => ({
    ...event,
    importState: getEventImportState(event),
    publicationState: getEventPublicationState(event)
  }));
  const sortedEvents = [...eventsWithImportState].sort((first, second) => second.date.localeCompare(first.date));
  const firstPublicationEvents = sortedEvents
    .filter((event) => sourceArchiveTickers.has(event.ticker) && event.dataStatus === "source_found")
    .sort(
      (first, second) =>
        sourceArchiveBatch.tickers.indexOf(first.ticker) - sourceArchiveBatch.tickers.indexOf(second.ticker)
    );
  const categories = Object.entries(eventCategories).map(([value, label]) => ({ value, label }));
  const statuses = Object.entries(dataStatuses).map(([value, status]) => ({
    value,
    label: status.label
  }));
  const importStatuses = [
    { value: "pilot_included", label: "Pilot içinde" },
    { value: "incomplete", label: "Import eksik" },
    { value: "not_in_pilot", label: "Pilot dışında" },
    { value: "sample_demo", label: "Örnek arayüz" }
  ];
  const pilotCount = sortedEvents.filter((event) => event.importState.inPilot).length;
  const pilotOutsideCount = sortedEvents.filter((event) => event.importState.status === "not_in_pilot").length;
  const initialFilters = buildInitialFilters(resolvedSearchParams, { categories, statuses, importStatuses });

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Olay arşivi</p>
          <h1>Kaynaklı piyasa olayları tek yerde.</h1>
          <p className="lead">
            KAP kaynaklı aday kayıtları, veri durumu ve yayın öncesi hesap kontrolüyle birlikte
            tarayın. Fiyat serisi tamamlanmayan kayıtlar doğrulanmış gibi gösterilmez.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="/hisseler">
              Hisse arşivleri
            </a>
            <a className="secondary-link" href="/metodoloji">
              Metodoloji
            </a>
          </div>
        </section>

        <section className="archive-publication-panel" aria-label="İlk yayın paketi">
          <div className="archive-publication-head">
            <div>
              <p className="eyebrow">İlk yayın paketi</p>
              <h2>Kaynaklı arşiv açık, fiyat tepkisi kilitli</h2>
              <p>
                İlk 10 kayıt kaynaklarıyla gösterilebilir. Fiyat, hacim ve BIST 100 kıyası resmi veriyle
                hesaplanmadan hiçbir kayıt doğrulanmış fiyat tepkisi olarak sunulmaz.
              </p>
            </div>
            <span className="status-chip amber">{sourceArchiveBatch.statusLabel}</span>
          </div>

          <div className="archive-publication-grid">
            <div>
              <span>Kaynaklı olay</span>
              <strong>{publication.summary.sourceReadyEvents}</strong>
              <p>Birincil kaynak bağlantısı bulunan candidate kayıt.</p>
            </div>
            <div>
              <span>İlk paket</span>
              <strong>{publication.summary.firstTenSourceReadyEvents}</strong>
              <p>Kullanıcının ilk bakışta göreceği kaynaklı arşiv seti.</p>
            </div>
            <div>
              <span>Verified</span>
              <strong>{publication.summary.verifiedEvents}</strong>
              <p>Henüz doğrulanmış fiyat tepkisi yayımlanmıyor.</p>
            </div>
            <div>
              <span>Veri bekleyen</span>
              <strong>{publication.summary.waitingMarketDataEvents}</strong>
              <p>Resmi/lisanslı piyasa verisi bekleyen kayıt.</p>
            </div>
          </div>

          <div className="first-batch-list" aria-label="İlk kaynaklı arşiv kayıtları">
            {firstPublicationEvents.map((event) => (
              <a href={`/olaylar/${event.slug}`} key={event.slug}>
                <span>{event.ticker}</span>
                <strong>{event.title}</strong>
                <small>{event.publicationState.calculationStatusLabel}</small>
              </a>
            ))}
          </div>
        </section>

        <section className="info-strip" aria-label="Olay arşivi özeti">
          <div className="compact-stat">
            <strong>{sortedEvents.length}</strong>
            <span>toplam olay kaydı</span>
          </div>
          <div className="compact-stat">
            <strong>{pilotCount}</strong>
            <span>pilot içinde</span>
          </div>
          <div className="compact-stat">
            <strong>{pilotOutsideCount}</strong>
            <span>pilot dışında</span>
          </div>
        </section>

        <DataReadinessNotice compact />

        <EventsArchiveClient
          events={sortedEvents}
          tickers={tickers}
          categories={categories}
          statuses={statuses}
          importStatuses={importStatuses}
          initialFilters={initialFilters}
        />
      </main>
      <SiteFooter />
    </>
  );
}
