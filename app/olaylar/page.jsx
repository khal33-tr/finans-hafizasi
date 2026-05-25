import EventsArchiveClient from "@/components/events-archive-client";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  dataStatuses,
  eventCategories,
  sampleEvents,
  tickers
} from "@/lib/market-data";

export const metadata = {
  title: "Olay Arşivi | Finans Hafızası",
  description: "KAP kaynaklı aday olaylar, veri durumu ve fiyat tepkisi hesap akışı."
};

export default function EventsArchivePage() {
  const sortedEvents = [...sampleEvents].sort((first, second) => second.date.localeCompare(first.date));
  const categories = Object.entries(eventCategories).map(([value, label]) => ({ value, label }));
  const statuses = Object.entries(dataStatuses).map(([value, status]) => ({
    value,
    label: status.label
  }));
  const candidateCount = sortedEvents.filter((event) => event.verificationStatus === "candidate").length;
  const sourcedCount = sortedEvents.filter((event) => event.dataStatus === "source_found").length;

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
            <strong>{candidateCount}</strong>
            <span>aday kayıt</span>
          </div>
          <div className="compact-stat">
            <strong>{sourcedCount}</strong>
            <span>kaynak bulundu</span>
          </div>
        </section>

        <EventsArchiveClient
          events={sortedEvents}
          tickers={tickers}
          categories={categories}
          statuses={statuses}
        />
      </main>
      <SiteFooter />
    </>
  );
}
