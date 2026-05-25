import EventsArchiveClient from "@/components/events-archive-client";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  dataStatuses,
  eventCategories,
  sampleEvents,
  tickers
} from "@/lib/market-data";
import { getEventImportState } from "@/lib/data-operations";

export const metadata = {
  title: "Olay Arşivi | Finans Hafızası",
  description: "KAP kaynaklı aday olaylar, veri durumu ve fiyat tepkisi hesap akışı."
};

export default function EventsArchivePage() {
  const eventsWithImportState = sampleEvents.map((event) => ({
    ...event,
    importState: getEventImportState(event)
  }));
  const sortedEvents = [...eventsWithImportState].sort((first, second) => second.date.localeCompare(first.date));
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

        <EventsArchiveClient
          events={sortedEvents}
          tickers={tickers}
          categories={categories}
          statuses={statuses}
          importStatuses={importStatuses}
        />
      </main>
      <SiteFooter />
    </>
  );
}
