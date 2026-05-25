"use client";

import { useMemo, useState } from "react";
import DataOperationsPanel from "@/components/data-operations-panel";
import EventCard from "@/components/event-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function HomeClient({ events, tickers, operationSnapshot }) {
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
      <SiteHeader />

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
            <div className="hero-actions">
              <a className="primary-link" href="/hisseler">
                Hisseleri görüntüle
              </a>
              <a className="secondary-link" href="/metodoloji">
                Metodolojiye bak
              </a>
            </div>
          </div>

          <aside className="panel market-pulse" aria-label="Piyasa özeti">
            <p className="eyebrow">MVP kapsamı</p>
            <div className="metric">
              <strong>{tickers.length}</strong>
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

        <DataOperationsPanel snapshot={operationSnapshot} />

        <section className="section-row" id="hisseler">
          <div>
            <p className="eyebrow">İzleme havuzu</p>
            <h2>İlk takip edilecek hisseler</h2>
            <p className="section-copy">
              Sembol seçerek ana sayfadaki örnek olay kartlarını süzebilir veya tüm hisse arşivine
              geçebilirsiniz.
            </p>
            <a className="text-link" href="/hisseler">
              Tüm hisseler
            </a>
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
              <p className="section-copy">
                Kartlar şu an örnek veriyle çalışır; gerçek kaynak ve fiyat serisi editör onayından
                sonra yayın standardına alınacaktır.
              </p>
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

      <SiteFooter />
    </>
  );
}
