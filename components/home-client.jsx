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

        <div className="sentiment" aria-label="Kamuya acik soylem ozeti">
          <SentimentRow label="Pozitif" value={event.sentiment.positive} />
          <SentimentRow label="Notr" value={event.sentiment.neutral} tone="neutral" />
          <SentimentRow label="Negatif" value={event.sentiment.negative} tone="negative" />
        </div>

        <p>
          <strong>BIST 100'e gore:</strong> {formatReturn(event.bistRelative)} |{" "}
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
        <a className="brand" href="/" aria-label="Finans Hafizasi ana sayfa">
          <span className="brand-mark">FH</span>
          <span>Finans Hafizasi</span>
        </a>
        <nav className="nav" aria-label="Ana menu">
          <a href="#gundem">Gundem</a>
          <a href="#hisseler">Hisseler</a>
          <a href="#metodoloji">Metodoloji</a>
        </nav>
      </header>

      <main>
        <section className="workspace" id="gundem">
          <div className="panel intro">
            <p className="eyebrow">BIST olay arsivi</p>
            <h1>Haber degil, piyasa hafizasi.</h1>
            <p className="lead">
              Onemli sirket olaylarini kaynaklariyla birlikte inceleyin; olay sonrasi fiyat, hacim
              ve kamuya acik soylem tepkisini standart zaman pencerelerinde gorun.
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
            <div className="principles" aria-label="Urun ilkeleri">
              <span>Yorum yapmaz</span>
              <span>Yonlendirmez</span>
              <span>Kaynagi belirtir</span>
            </div>
          </div>

          <aside className="panel market-pulse" aria-label="Piyasa ozeti">
            <p className="eyebrow">MVP kapsami</p>
            <div className="metric">
              <strong>20</strong>
              <span>ilk hisse</span>
            </div>
            <div className="metric">
              <strong>9</strong>
              <span>olay sinifi</span>
            </div>
            <div className="metric">
              <strong>5</strong>
              <span>tepki penceresi</span>
            </div>
          </aside>
        </section>

        <section className="section-row" id="hisseler">
          <div>
            <p className="eyebrow">Izleme havuzu</p>
            <h2>Ilk takip edilecek hisseler</h2>
          </div>
          <div className="ticker-grid" aria-label="Ilk hisse listesi">
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
              <h2>Olay sonrasi tepki kartlari</h2>
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
            <p className="eyebrow">Guven standardi</p>
            <h2>Yari otomatik, editor onayli akis</h2>
          </div>
          <ol className="method-steps">
            <li>Olay adaylari KAP, sirket duyurulari ve guvenilir haber kaynaklarindan toplanir.</li>
            <li>Sistem olay tipini, ilgili hisseyi ve ilk piyasa tarihini onerir.</li>
            <li>Fiyat, hacim ve endeks karsilastirmalari otomatik hesaplanir.</li>
            <li>Editor kaynak, ozet ve tarih dogrulamasindan sonra olayi yayinlar.</li>
          </ol>
        </section>
      </main>

      <footer className="footer">
        <p>
          Finans Hafizasi yatirim tavsiyesi sunmaz. Bilgiler gecmis olaylarin ve piyasa verilerinin
          incelenmesi amaciyla hazirlanir.
        </p>
      </footer>
    </>
  );
}
