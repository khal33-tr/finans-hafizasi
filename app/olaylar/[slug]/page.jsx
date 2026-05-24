import { notFound } from "next/navigation";
import ReturnGrid from "@/components/return-grid";
import SentimentSummary from "@/components/sentiment-summary";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  events,
  formatReturn,
  getCompany,
  getEventBySlug,
  getEventStatus,
  getPrimarySource,
  sourceTypeLabels
} from "@/lib/market-data";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: `${event.title} | Finans Hafızası`,
    description: event.summary
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const company = getCompany(event.ticker);
  const status = getEventStatus(event);
  const primarySource = getPrimarySource(event);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="detail-hero">
          <div>
            <a className="breadcrumb" href={`/hisseler/${event.ticker}`}>
              {event.ticker} olay geçmişi
            </a>
            <p className="eyebrow">{event.type}</p>
            <h1>{event.title}</h1>
            <p className="lead">{event.summary}</p>
            <div className="hero-actions">
              <a className="primary-link" href={`/hisseler/${event.ticker}`}>
                {event.ticker} arşivi
              </a>
              <a className="secondary-link" href="/metodoloji">
                Metodoloji
              </a>
            </div>
          </div>
          <div className="detail-stats" aria-label="Olay özeti">
            <div>
              <strong>{event.date}</strong>
              <span>olay tarihi</span>
            </div>
            <div>
              <strong>{formatReturn(event.bistRelative)}</strong>
              <span>BIST 100'e göre</span>
            </div>
            <div>
              <strong>{event.volumeMultiple.toFixed(1)}x</strong>
              <span>hacim tepkisi</span>
            </div>
          </div>
        </section>

        <section className="page-grid">
          <article className="content-panel">
            <p className="eyebrow">Fiyat tepkisi</p>
            <h2>Standart zaman pencereleri</h2>
            <ReturnGrid returns={event.returns} />
            <p className="panel-note">
              Bu kayıt {status.label.toLowerCase()} statüsündedir. Yayın öncesi düzeltilmiş fiyat,
              işlem günü takvimi ve endeks kıyası tekrar üretilebilir olmalıdır.
            </p>
          </article>

          <article className="content-panel">
            <p className="eyebrow">Söylem özeti</p>
            <h2>Kamuya açık yorum eğilimi</h2>
            <SentimentSummary sentiment={event.sentiment} />
            <p className="panel-note">
              Söylem özeti yatırım sinyali değildir; yalnızca kamuya açık kaynaklardaki genel tonu
              düzenlemek için kullanılır.
            </p>
          </article>
        </section>

        <section className="content-panel wide-panel">
          <p className="eyebrow">Kaynak ve kalite</p>
          <h2>{company?.name ?? event.ticker} için kayıt standardı</h2>
          <div className="record-summary">
            <div>
              <span>Şirket</span>
              <strong>{company?.name ?? event.ticker}</strong>
            </div>
            <div>
              <span>Tepki başlangıcı</span>
              <strong>{event.reactionStartDate}</strong>
            </div>
            <div>
              <span>Durum</span>
              <strong>{status.label}</strong>
            </div>
          </div>

          <div className="quality-layout">
            <div>
              <h3>Kaynaklar</h3>
              <div className="source-list">
                {event.sources.map((source) => (
                  <a href={source.url} key={`${source.type}-${source.label}`}>
                    <span>{sourceTypeLabels[source.type] ?? source.type}</span>
                    <strong>{source.label}</strong>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3>Editör kontrolü</h3>
              <ul className="quality-list">
                {event.editorChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p>{event.qualityNote}</p>
          <a className="source-link" href={primarySource.url}>
            Birincil kaynağı aç
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
