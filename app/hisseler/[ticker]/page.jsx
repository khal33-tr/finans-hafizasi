import { notFound } from "next/navigation";
import DataReadinessNotice from "@/components/data-readiness-notice";
import EventCard from "@/components/event-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { companies, getCompany, getEventsByTicker } from "@/lib/market-data";

export function generateStaticParams() {
  return companies.map((company) => ({ ticker: company.ticker }));
}

export async function generateMetadata({ params }) {
  const { ticker } = await params;
  const company = getCompany(ticker);
  if (!company) return {};

  return {
    title: `${company.ticker} | Finans Hafızası`,
    description: `${company.name} için olay geçmişi, fiyat tepkileri ve kaynaklı piyasa arşivi.`
  };
}

export default async function StockDetailPage({ params }) {
  const { ticker } = await params;
  const company = getCompany(ticker);
  if (!company) notFound();

  const companyEvents = getEventsByTicker(company.ticker);
  const eventTypes = [...new Set(companyEvents.map((event) => event.type))];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="detail-hero">
          <div>
            <a className="breadcrumb" href="/hisseler">
              Hisseler
            </a>
            <p className="eyebrow">{company.sector}</p>
            <h1>
              {company.ticker} - {company.name}
            </h1>
            <p className="lead">{company.description}</p>
            <div className="hero-actions">
              <a className="primary-link" href="/hisseler">
                Hisse listesi
              </a>
              <a className="secondary-link" href="/metodoloji">
                Hesap metodolojisi
              </a>
            </div>
          </div>
          <div className="detail-stats" aria-label="Hisse özeti">
            <div>
              <strong>{companyEvents.length}</strong>
              <span>olay kaydı</span>
            </div>
            <div>
              <strong>{company.priority}</strong>
              <span>MVP önceliği</span>
            </div>
            <div>
              <strong>BIST</strong>
              <span>ilk pazar</span>
            </div>
          </div>
        </section>

        <section className="info-strip" aria-label="Hisse kayıt kapsamı">
          <div className="compact-stat">
            <strong>{eventTypes.length || "-"}</strong>
            <span>olay tipi</span>
          </div>
          <div className="compact-stat">
            <strong>{company.sector}</strong>
            <span>sektör</span>
          </div>
          <div className="compact-stat">
            <strong>{company.eventTargets.length}</strong>
            <span>hedef olay sınıfı</span>
          </div>
        </section>

        <DataReadinessNotice compact />

        <section className="content-panel wide-panel">
          <p className="eyebrow">İzleme gerekçesi</p>
          <h2>Bu hisse neden ilk evrende?</h2>
          <p>{company.watchReason}</p>
          <div className="target-list" aria-label="Hedef olay sınıfları">
            {company.eventTargets.map((target) => (
              <span key={target}>{target}</span>
            ))}
          </div>
        </section>

        <section className="events-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Olay geçmişi</p>
              <h2>Kaynaklı piyasa tepkileri</h2>
            </div>
          </div>

          {companyEvents.length ? (
            <div className="event-list">
              {companyEvents.map((event) => (
                <EventCard event={event} key={event.slug} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Henüz yayınlanmış örnek kayıt yok</h2>
              <p>Bu hisse için olay kayıtları editör onay akışına alındıkça burada görünecek.</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
