export default function DataOperationsPanel({ snapshot }) {
  if (!snapshot) return null;

  const futureTickers = snapshot.futureWindows.map((event) => event.ticker).join(", ");
  const workflow = snapshot.importWorkflow;
  const validationTone = workflow.validation.status === "ready"
    ? "green"
    : workflow.validation.status === "invalid"
      ? "red"
      : "amber";

  return (
    <section className="data-operations" aria-label="Veri operasyon durumu">
      <div className="section-head">
        <div>
          <p className="eyebrow">Veri operasyonu</p>
          <h2>Gerçek veri gelene kadar neyi beklediğimizi açık gösteriyoruz</h2>
          <p className="section-copy">
            Kayıtlar kaynak, lisanslı fiyat verisi, işlem takvimi ve tekrar üretilebilir hesap
            kontrolünden geçmeden doğrulanmış sayılmaz.
          </p>
        </div>
        <a className="secondary-link" href="/metodoloji">
          Kontrol standardı
        </a>
      </div>

      <div className="operations-grid">
        <article className="operation-item">
          <span className="operation-label">Resmi veri talebi</span>
          <strong>Gönderildi</strong>
          <p>
            Fiyat, hacim, düzeltilmiş kapanış ve public kullanım koşulları için veri sağlayıcı
            yanıtı bekleniyor.
          </p>
        </article>

        <article className="operation-item">
          <span className="operation-label">Bugün tamamlanabilir pilot</span>
          <strong>{snapshot.todayCompletable.ticker} + XU100</strong>
          <p>
            {snapshot.todayCompletable.rangeStart} - {snapshot.todayCompletable.rangeEnd} aralığı
            için fiyat ve işlem takvimi CSV dosyası bekleniyor.
          </p>
        </article>

        <article className="operation-item">
          <span className="operation-label">Bekleyen kısa pencere</span>
          <strong>{futureTickers || "Yok"}</strong>
          <p>Kısa tepki penceresi henüz oluşmayan kayıtlar veri olgunlaşınca hesap akışına alınacak.</p>
        </article>

        <article className="operation-item">
          <span className="operation-label">Doğrulama raporu</span>
          <strong>
            {snapshot.todayCompletable.readyEvents}/{snapshot.todayCompletable.incompleteEvents}
          </strong>
          <p>
            Bugünkü pilot kayıt {snapshot.todayCompletable.validationStatusLabel.toLowerCase()} durumunda;
            {snapshot.todayCompletable.warnings} uyarı ve {snapshot.todayCompletable.missingSymbols.length} eksik
            sembol izleniyor.
          </p>
        </article>
      </div>

      <div className="import-workflow">
        <div className="import-workflow-head">
          <div>
            <span className="operation-label">CSV import akışı</span>
            <strong>{workflow.statusLabel}</strong>
            <p>
              {workflow.eventCount} pilot olay, {workflow.symbols.length} sembol ve {workflow.requiredDateRange.start} -
              {workflow.requiredDateRange.end} tarih aralığı tek doğrulama raporuna bağlandı.
            </p>
          </div>
          <span className={`status-chip ${validationTone}`}>{workflow.validation.statusLabel}</span>
        </div>

        <div className="import-summary-grid" aria-label="Import özeti">
          <div>
            <span>Fiyat satırı</span>
            <strong>{workflow.validation.priceRows}</strong>
          </div>
          <div>
            <span>Takvim satırı</span>
            <strong>{workflow.validation.calendarRows}</strong>
          </div>
          <div>
            <span>Uyarı</span>
            <strong>{workflow.validation.warnings}</strong>
          </div>
          <div>
            <span>Eksik sembol</span>
            <strong>{workflow.validation.missingSymbols.length}</strong>
          </div>
        </div>

        <div className="import-columns">
          <div className="import-column">
            <h3>Operatör dosyaları</h3>
            <ul className="import-file-list">
              {workflow.files.map((file) => (
                <li key={file.label}>
                  <strong>{file.label}</strong>
                  <span>{file.purpose}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="import-column">
            <h3>Eksik seri</h3>
            <div className="symbol-pills" aria-label="Eksik semboller">
              {workflow.validation.missingSymbols.map((symbol) => (
                <span key={symbol}>{symbol}</span>
              ))}
            </div>
            <p>
              Bu semboller için fiyat satırı girilmeden hesap motoru pilot kaydı yayınlanabilir duruma almaz.
            </p>
          </div>

          <div className="import-column">
            <h3>Sıradaki kontroller</h3>
            <ol className="import-action-list">
              {workflow.validation.nextActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
