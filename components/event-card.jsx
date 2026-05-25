import { formatReturn, getEventDataStatus, getEventStatus, getPrimarySource } from "@/lib/market-data";
import { getEventImportState } from "@/lib/data-operations";
import ReturnGrid from "@/components/return-grid";
import SentimentSummary from "@/components/sentiment-summary";

export default function EventCard({ event, linked = true }) {
  const status = getEventStatus(event);
  const dataStatus = getEventDataStatus(event);
  const importState = getEventImportState(event);
  const primarySource = getPrimarySource(event);
  const relativeReturn = typeof event.bistRelative === "number" ? formatReturn(event.bistRelative) : "Bekliyor";
  const volumeMultiple =
    typeof event.volumeMultiple === "number" ? `${event.volumeMultiple.toFixed(1)}x` : "Bekliyor";
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
          <span className={`status-pill ${importState.tone}`}>{importState.shortLabel}</span>
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
            <strong>{importState.statusLabel}</strong>
          </div>
        </div>

        <div className={`data-status-note ${importState.tone}`}>
          <span>Yayın kontrolü</span>
          <p>{importState.description}</p>
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
            <strong>{relativeReturn}</strong>
          </div>
          <div className="mini-stat">
            <span>Hacim</span>
            <strong>{volumeMultiple}</strong>
          </div>
        </div>
        <ReturnGrid returns={event.returns} />
        <SentimentSummary sentiment={event.sentiment} />
      </div>
    </article>
  );
}
