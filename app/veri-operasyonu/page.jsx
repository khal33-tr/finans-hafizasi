import DataReadinessNotice from "@/components/data-readiness-notice";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getDataOperationSnapshot } from "@/lib/data-operations";

export const metadata = {
  title: "Veri Operasyonu | Finans Hafızası",
  description: "Finans Hafızası fiyat import, takvim kapsamı ve yayın kontrol durumu."
};

function getTone(status) {
  if (status === "ready") return "green";
  if (status === "invalid") return "red";
  return "amber";
}

export default function DataOperationsPage() {
  const snapshot = getDataOperationSnapshot();
  const workflow = snapshot.importWorkflow;
  const publication = snapshot.mvpPublication;
  const sourceArchiveBatch = publication.recommendedBatches[0];
  const calculationPilotBatch = publication.recommendedBatches[1];
  const validation = workflow.validation;
  const validationTone = getTone(validation.status);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero operations-hero">
          <p className="eyebrow">Veri operasyonu</p>
          <h1>Import kontrol ekranı</h1>
          <p className="lead">
            Pilot fiyat verisi, işlem takvimi, eksik seri ve yayın kilidi tek kontrol görünümünde izlenir.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="/olaylar">
              Olay arşivi
            </a>
            <a className="secondary-link" href="/metodoloji">
              Metodoloji
            </a>
          </div>
        </section>

        <DataReadinessNotice compact />

        <section className="publication-readiness" aria-label="MVP yayın hazırlığı">
          <div className="publication-readiness-head">
            <div>
              <p className="eyebrow">MVP yayın hazırlığı</p>
              <h2>Kaynaklı arşiv hazır, doğrulanmış tepki resmi veri bekliyor</h2>
              <p>
                {publication.principle}
              </p>
            </div>
            <span className="status-chip amber">Verified bekliyor</span>
          </div>

          <div className="publication-stat-grid" aria-label="MVP yayın özeti">
            <div>
              <span>Kaynaklı olay</span>
              <strong>{publication.summary.sourceReadyEvents}</strong>
              <p>Birincil kaynak linki bulunan candidate kayıt.</p>
            </div>
            <div>
              <span>İlk yayın paketi</span>
              <strong>{publication.summary.firstTenSourceReadyEvents}</strong>
              <p>Kaynaklı arşiv olarak öne alınabilecek ilk hisse seti.</p>
            </div>
            <div>
              <span>Verified kayıt</span>
              <strong>{publication.summary.verifiedEvents}</strong>
              <p>Fiyat, hacim ve BIST 100 kıyası tamamlanmış kayıt.</p>
            </div>
            <div>
              <span>Veri bekleyen</span>
              <strong>{publication.summary.waitingMarketDataEvents}</strong>
              <p>Resmi/lisansı net piyasa verisi bekleyen kayıt.</p>
            </div>
          </div>

          <div className="publication-batches">
            <article>
              <span className="operation-label">Kaynaklı arşiv paketi</span>
              <strong>{sourceArchiveBatch.statusLabel}</strong>
              <p>{sourceArchiveBatch.purpose}</p>
              <div className="symbol-pills" aria-label="İlk yayın hisseleri">
                {sourceArchiveBatch.tickers.map((ticker) => (
                  <span key={ticker}>{ticker}</span>
                ))}
              </div>
            </article>

            <article>
              <span className="operation-label">İlk hesaplama pilotu</span>
              <strong>{calculationPilotBatch.statusLabel}</strong>
              <p>{calculationPilotBatch.purpose}</p>
              <div className="symbol-pills" aria-label="İlk hesaplama pilotu kayıtları">
                {calculationPilotBatch.slugs.map((slug) => (
                  <span key={slug}>{slug.split("-")[0].toUpperCase()}</span>
                ))}
              </div>
            </article>
          </div>

          <div className="publication-gates" aria-label="Yayın kapıları">
            {publication.publicationGates.map((gate) => (
              <article key={gate.gate}>
                <span className="operation-label">
                  {gate.gate === "source_archive" ? "Kaynaklı arşiv kapısı" : "Doğrulanmış tepki kapısı"}
                </span>
                <strong>{gate.allowedPublicLabel}</strong>
                <ul>
                  {gate.required.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="info-strip" aria-label="Import kontrol özeti">
          <div className="compact-stat">
            <strong>{workflow.eventCount}</strong>
            <span>pilot olay</span>
          </div>
          <div className="compact-stat">
            <strong>{workflow.symbols.length}</strong>
            <span>izlenen seri</span>
          </div>
          <div className="compact-stat">
            <strong>{workflow.publicationGate}</strong>
            <span>yayın kilidi</span>
          </div>
        </section>

        <section className="operation-control-grid" aria-label="Import aşamaları">
          <article className="control-card">
            <span className="operation-label">1. Takvim</span>
            <strong>{validation.calendarRows}</strong>
            <p>İşlem günü satırı girilmeden pencere kapsamı hesaplanmaz.</p>
          </article>
          <article className="control-card">
            <span className="operation-label">2. Fiyat</span>
            <strong>{validation.priceRows}</strong>
            <p>OHLC, adjustedClose, hacim ve kaynak alanları doğrulama kapsamındadır.</p>
          </article>
          <article className="control-card">
            <span className="operation-label">3. Uyarı</span>
            <strong>{validation.warnings}</strong>
            <p>Eksik sembol, kapalı gün fiyatı ve takvim uyuşmazlığı burada görünür.</p>
          </article>
          <article className="control-card">
            <span className="operation-label">4. Durum</span>
            <strong className={`inline-status ${validationTone}`}>{validation.statusLabel}</strong>
            <p>Rapor hazır olmadan gerçek piyasa tepkisi public kayda dönüşmez.</p>
          </article>
        </section>

        <section className="operation-layout">
          <div className="content-panel">
            <p className="eyebrow">Olay kapsamı</p>
            <h2>Pilot kayıtların veri durumu</h2>
            <div className="coverage-list" aria-label="Pilot olay kapsamı">
              {workflow.coverageEvents.map((event) => (
                <article className="coverage-row" key={event.slug}>
                  <div>
                    <span className="badge">{event.ticker}</span>
                    <h3>{event.slug}</h3>
                    <p>
                      Baz tarih {event.baseDate}; veri aralığı {event.requiredRangeStart} - {event.requiredRangeEnd}.
                    </p>
                  </div>
                  <div className="coverage-meta">
                    <span>{event.calendarStatusLabel}</span>
                    <strong>{event.statusLabel}</strong>
                    <small>{event.requiredSeries.join(" + ")}</small>
                  </div>
                  <div className="symbol-pills">
                    {event.missingSeries.length ? (
                      event.missingSeries.map((symbol) => <span key={symbol}>{symbol}</span>)
                    ) : (
                      <span>Eksik seri yok</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="content-panel">
            <p className="eyebrow">Kontrol kuyruğu</p>
            <h2>Sıradaki aksiyonlar</h2>
            <ol className="import-action-list">
              {validation.nextActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
            <div className="side-divider" />
            <h2>Operatör dosyaları</h2>
            <ul className="import-file-list">
              {workflow.files.map((file) => (
                <li key={file.label}>
                  <strong>{file.label}</strong>
                  <span>{file.purpose}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
