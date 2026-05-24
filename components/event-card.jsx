import { formatReturn } from "@/lib/market-data";
import ReturnGrid from "@/components/return-grid";
import SentimentSummary from "@/components/sentiment-summary";

export default function EventCard({ event, linked = true }) {
  const title = linked ? <a href={`/olaylar/${event.slug}`}>{event.title}</a> : event.title;

  return (
    <article className="event-card">
      <div>
        <div className="event-meta">
          <a className="badge" href={`/hisseler/${event.ticker}`}>
            {event.ticker}
          </a>
          <span>{event.company}</span>
          <span>{event.date}</span>
          <span>{event.type}</span>
        </div>
        <h3>{title}</h3>
        <p>{event.summary}</p>
        <p>
          <strong>Kaynak:</strong> {event.sourceLabel}
        </p>
      </div>

      <div>
        <ReturnGrid returns={event.returns} />
        <SentimentSummary sentiment={event.sentiment} />
        <p>
          <strong>BIST 100'e göre:</strong> {formatReturn(event.bistRelative)} |{" "}
          <strong>Hacim:</strong> {event.volumeMultiple.toFixed(1)}x
        </p>
      </div>
    </article>
  );
}
