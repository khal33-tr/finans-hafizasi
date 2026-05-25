"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/event-card";

function matchesImportStatus(event, importStatus) {
  if (importStatus === "all") return true;
  if (importStatus === "pilot_included") return Boolean(event.importState?.inPilot);
  return event.importState?.status === importStatus;
}

function getImportPriority(event) {
  if (event.importState?.status === "incomplete") return 0;
  if (event.importState?.status === "ready") return 1;
  if (event.importState?.status === "not_in_pilot") return 2;
  return 3;
}

function sortEvents(events, sort) {
  const sorted = [...events];

  if (sort === "oldest") {
    return sorted.sort((first, second) => first.date.localeCompare(second.date));
  }

  if (sort === "ticker") {
    return sorted.sort((first, second) => first.ticker.localeCompare(second.ticker) || second.date.localeCompare(first.date));
  }

  if (sort === "pilot_first") {
    return sorted.sort((first, second) => getImportPriority(first) - getImportPriority(second) || second.date.localeCompare(first.date));
  }

  if (sort === "missing_first") {
    return sorted.sort((first, second) => {
      const firstMissing = first.importState?.missingSeries?.length ?? 0;
      const secondMissing = second.importState?.missingSeries?.length ?? 0;
      return secondMissing - firstMissing || getImportPriority(first) - getImportPriority(second) || second.date.localeCompare(first.date);
    });
  }

  return sorted.sort((first, second) => second.date.localeCompare(first.date));
}

export default function EventsArchiveClient({ events, tickers, categories, statuses, importStatuses }) {
  const [ticker, setTicker] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [importStatus, setImportStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

    const matches = events.filter((event) => {
      const matchesTicker = ticker === "all" || event.ticker === ticker;
      const matchesCategory = category === "all" || event.category === category;
      const matchesStatus = status === "all" || event.dataStatus === status;
      const matchesImport = matchesImportStatus(event, importStatus);
      const matchesQuery =
        !normalizedQuery ||
        `${event.title} ${event.summary} ${event.ticker} ${event.importState?.statusLabel ?? ""}`
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedQuery);

      return matchesTicker && matchesCategory && matchesStatus && matchesImport && matchesQuery;
    });

    return sortEvents(matches, sort);
  }, [category, events, importStatus, query, sort, status, ticker]);

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

        <label>
          <span>Import durumu</span>
          <select value={importStatus} onChange={(event) => setImportStatus(event.target.value)}>
            <option value="all">Tümü</option>
            {importStatuses.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Sıralama</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">En yeni</option>
            <option value="oldest">En eski</option>
            <option value="pilot_first">Pilot öncelikli</option>
            <option value="missing_first">Eksik seri önce</option>
            <option value="ticker">Hisse kodu</option>
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
