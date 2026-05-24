"use client";

import { useMemo, useState } from "react";

const windows = [
  ["d1", "1G"],
  ["d3", "3G"],
  ["w1", "1H"],
  ["w2", "2H"],
  ["d30", "30G"]
];

function formatReturn(value) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

function returnClass(value) {
  return value >= 0 ? "positive" : "negative";
}

function SentimentRow({ label, value, tone = "positive" }) {
  return (
    <div className="sentiment-row">
      <span>{label}</span>
      <div className={`bar ${tone}`}>
        <span style={{ width: `${value}%` }} />
      </div>
      <strong>{value}%</strong>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div>
        <div className="event-meta">
          <span className="badge">{event.ticker}</span>
          <span>{event.company}</span>
          <span>{event.date}</span>
          <span>{event.type}</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.summary}</p>
        <p>
          <strong>Kaynak:</strong> {event.sourceLabel}
        </p>
      </div>

      <div>
        <div className="return-grid">
          {windows.map(([key, label]) => {
            const value = event.returns[key];
            return (
              <div className="return-cell" key={key}>
                <span>{label}</span>
                <strong className={returnClass(value)}>{formatReturn(value)}</strong>
              </div>
            );
          })}
        </div>

        <div className="sentiment" aria-label="Kamuya açık söylem özeti">
          <SentimentRow label="Pozitif" value={event.sentiment.positive} />
          <SentimentRow label="Nötr" value={event.sentiment.neutral} tone="neutral" />
          <SentimentRow label="Negatif" value={event.sentiment.negative} tone="negative" />
        </div>

        <p>
          <strong>BIST 100'e göre:</strong> {formatReturn(event.bistRelative)} |{" "}
          <strong>Hacim:</strong> {event.volumeMultiple.toFixed(1)}x
        </p>
      </div>
    </article>
  );
}

export default function HomeClient({ events, tickers }) {
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toUpperCase();
    if (!normalized) return events;
    const matches = events.filter((event) => event.ticker.includes(normalized));
    return matches.length ? matches : events;
  }, [events, query]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="/" aria-label="Finans Hafızası ana sayfa">
          <span className="brand-mark">FH</span>
          <span>Finans Hafızası</span>
        </a>
        <nav className="nav" aria-label="Ana menü">
          <a href="#gundem">Gündem</a>
          <a href="#hisseler">Hisseler</a>
          <a href="#metodoloji">Metodoloji</a>
        </nav>
      </header>

      <main>
        <section className="workspace" id="gundem">
          <div className="panel intro">
            <p className="eyebrow">BIST olay arşivi</p>
            <h1>Haber değil, piyasa hafızası.</h1>
            <p className="lead">
              Önemli şirket olaylarını kaynaklarıyla birlikte inceleyin; olay sonrası fiyat, hacim
              ve kamuya açık söylem tepkisini standart zaman pencerelerinde görün.
            </p>
            <form className="search-row" role="search" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="ticker-search">
                Hisse ara
              </label>
              <input
                id="ticker-search"
                name="ticker"
                type="search"
                placeholder="THYAO, TUPRS, ASELS..."
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="submit">Ara</button>
            </form>
            <div className="principles" aria-label="Ürün ilkeleri">
              <span>Yorum yapmaz</span>
              <span>Yönlendirmez</span>
              <span>Kaynağı belirtir</span>
            </div>
          </div>

          <aside className="panel market-pulse" aria-label="Piyasa özeti">
            <p className="eyebrow">MVP kapsamı</p>
            <div className="metric">
              <strong>20</strong>
              <span>ilk hisse</span>
            </div>
            <div className="metric">
              <strong>9</strong>
              <span>olay sınıfı</span>
            </div>
            <div className="metric">
              <strong>5</strong>
              <span>tepki penceresi</span>
            </div>
          </aside>
        </section>

        <section className="section-row" id="hisseler">
          <div>
            <p className="eyebrow">İzleme havuzu</p>
            <h2>İlk takip edilecek hisseler</h2>
          </div>
          <div className="ticker-grid" aria-label="İlk hisse listesi">
            {tickers.slice(0, 8).map((ticker) => (
              <button type="button" key={ticker} onClick={() => setQuery(ticker)}>
                {ticker}
              </button>
            ))}
          </div>
        </section>

        <section className="events-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Son eklenen olaylar</p>
              <h2>Olay sonrası tepki kartları</h2>
            </div>
            <div className="window-tabs" aria-label="Zaman pencereleri">
              <button type="button" className="active">
                1G
              </button>
              <button type="button">3G</button>
              <button type="button">1H</button>
              <button type="button">2H</button>
              <button type="button">30G</button>
            </div>
          </div>
          <div className="event-list" aria-live="polite">
            {filteredEvents.map((event) => (
              <EventCard event={event} key={`${event.ticker}-${event.date}`} />
            ))}
          </div>
        </section>

        <section className="method" id="metodoloji">
          <div>
            <p className="eyebrow">Güven standardı</p>
            <h2>Yarı otomatik, editör onaylı akış</h2>
          </div>
          <ol className="method-steps">
            <li>Olay adayları KAP, şirket duyuruları ve güvenilir haber kaynaklarından toplanır.</li>
            <li>Sistem olay tipini, ilgili hisseyi ve ilk piyasa tarihini önerir.</li>
            <li>Fiyat, hacim ve endeks karşılaştırmaları otomatik hesaplanır.</li>
            <li>Editör kaynak, özet ve tarih doğrulamasından sonra olayı yayınlar.</li>
          </ol>
        </section>
      </main>

      <footer className="footer">
        <p>
          Finans Hafızası yatırım tavsiyesi sunmaz. Bilgiler geçmiş olayların ve piyasa verilerinin
          incelenmesi amacıyla hazırlanır.
        </p>
      </footer>
    </>
  );
}
