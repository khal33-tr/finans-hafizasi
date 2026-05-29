"use client";

import { useMemo, useState } from "react";
import DataOperationsPanel from "@/components/data-operations-panel";
import DataReadinessNotice from "@/components/data-readiness-notice";
import EventCard from "@/components/event-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function HomeClient({ events, tickers, operationSnapshot }) {
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toUpperCase();
    if (!normalized) return events;
    return events.filter((event) => event.ticker.includes(normalized));
  }, [events, query]);
  const hasActiveSearch = query.trim().length > 0;

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
              <a className="primary-link" href="/olaylar">
                Olay arşivi
              </a>
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

        <DataReadinessNotice />

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
            <a className="text-link" href="/olaylar">
              Tüm olaylar
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
                Liste KAP kaynaklı aday kayıtları ve arayüz örneklerini birlikte gösterir; fiyat
                serisi tamamlanmayan kayıtlar açık veri durumuyla tutulur.
              </p>
            </div>
            <div className="window-tabs" aria-label="Zaman pencereleri">
              <span className="active">1G</span>
              <span>3G</span>
              <span>1H</span>
              <span>2H</span>
              <span>30G</span>
            </div>
          </div>
          {filteredEvents.length ? (
            <div className="event-list" aria-live="polite">
              {filteredEvents.map((event) => (
                <EventCard event={event} key={`${event.ticker}-${event.date}`} />
              ))}
            </div>
          ) : (
            <div className="empty-state" aria-live="polite">
              <h2>Kayıt bulunamadı</h2>
              <p>
                {hasActiveSearch
                  ? "Bu sembol için ana sayfada gösterilen olay kaydı yok. Tüm olay arşivinde arama yapabilirsiniz."
                  : "Ana sayfada gösterilecek olay kaydı bulunamadı."}
              </p>
              <a className="text-link" href="/olaylar">
                Tüm olay arşivi
              </a>
            </div>
          )}
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
