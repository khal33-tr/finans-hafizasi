import { formatReturn, getEventStatus, getPrimarySource } from "@/lib/market-data";
import ReturnGrid from "@/components/return-grid";
import SentimentSummary from "@/components/sentiment-summary";

export default function EventCard({ event, linked = true }) {
  const status = getEventStatus(event);
  const primarySource = getPrimarySource(event);
  const title = linked ? (
    <a className="event-title-link" href={`/olaylar/${event.slug}`}>
      {event.title}
    </a>
  ) : (
    event.title
  );

  return (
    <article className="event-card">
      <div className="event-main">
        <div className="event-meta">
          <a className="badge" href={`/hisseler/${event.ticker}`}>
            {event.ticker}
          </a>
          <span>{event.company}</span>
          <span>{event.date}</span>
          <span>{event.type}</span>
          <span className={`status-pill ${status.tone}`}>{status.label}</span>
        </div>
        <h3>{title}</h3>
        <p>{event.summary}</p>

        <div className="event-facts" aria-label="Kayıt kalitesi">
          <div>
            <span>Tepki başlangıcı</span>
            <strong>{event.reactionStartDate}</strong>
          </div>
          <div>
            <span>Kaynak sayısı</span>
            <strong>{event.sources?.length ?? 0}</strong>
          </div>
          <div>
            <span>Veri durumu</span>
            <strong>{event.dataStatus === "sample" ? "Örnek" : "Hazır"}</strong>
          </div>
        </div>

        <a className="event-source" href={primarySource.url}>
          <span>Birincil kaynak</span>
          <strong>{primarySource.label}</strong>
        </a>

        <div className="quality-note">
          <span>Not</span>
          <p>{event.qualityNote}</p>
        </div>

        <div className="event-actions">
          <a href={`/olaylar/${event.slug}`}>Detayı incele</a>
          <a href={`/hisseler/${event.ticker}`}>{event.ticker} arşivi</a>
        </div>
      </div>

      <div className="event-side">
        <div className="mini-stat-grid" aria-label="Olay tepki özeti">
          <div className="mini-stat">
            <span>BIST 100'e göre</span>
            <strong>{formatReturn(event.bistRelative)}</strong>
          </div>
          <div className="mini-stat">
            <span>Hacim</span>
            <strong>{event.volumeMultiple.toFixed(1)}x</strong>
          </div>
        </div>
        <ReturnGrid returns={event.returns} />
        <SentimentSummary sentiment={event.sentiment} />
      </div>
    </article>
  );
}
