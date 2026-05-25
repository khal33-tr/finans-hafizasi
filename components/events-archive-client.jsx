"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/event-card";

export default function EventsArchiveClient({ events, tickers, categories, statuses }) {
  const [ticker, setTicker] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

    return events.filter((event) => {
      const matchesTicker = ticker === "all" || event.ticker === ticker;
      const matchesCategory = category === "all" || event.category === category;
      const matchesStatus = status === "all" || event.dataStatus === status;
      const matchesQuery =
        !normalizedQuery ||
        `${event.title} ${event.summary} ${event.ticker}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);

      return matchesTicker && matchesCategory && matchesStatus && matchesQuery;
    });
  }, [category, events, query, status, ticker]);

  return (
    <section className="events-section archive-section" aria-label="Olay arşivi listesi">
      <div className="archive-toolbar">
        <label>
          <span>Hisse</span>
          <select value={ticker} onChange={(event) => setTicker(event.target.value)}>
            <option value="all">Tümü</option>
            {tickers.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Olay tipi</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">Tümü</option>
            {categories.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Veri durumu</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">Tümü</option>
            {statuses.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="archive-search">
          <span>Arama</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="KAP başlığı, hisse, olay..."
          />
        </label>
      </div>

      <div className="archive-result-count">
        <strong>{filteredEvents.length}</strong>
        <span>kayıt gösteriliyor</span>
      </div>

      {filteredEvents.length ? (
        <div className="event-list" aria-live="polite">
          {filteredEvents.map((event) => (
            <EventCard event={event} key={event.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Kayıt bulunamadı</h2>
          <p>Filtreleri değiştirerek arşivdeki diğer olay kayıtlarını görüntüleyebilirsiniz.</p>
        </div>
      )}
    </section>
  );
}
