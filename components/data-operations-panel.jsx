export default function DataOperationsPanel({ snapshot }) {
  if (!snapshot) return null;

  const futureTickers = snapshot.futureWindows.map((event) => event.ticker).join(", ");

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
          <span className="operation-label">Bekleyen pencere</span>
          <strong>{futureTickers || "Yok"}</strong>
          <p>30G penceresi henüz oluşmayan kayıtlar veri olgunlaşınca hesap akışına alınacak.</p>
        </article>

        <article className="operation-item">
          <span className="operation-label">Doğrulama raporu</span>
          <strong>
            {snapshot.todayCompletable.readyEvents}/{snapshot.todayCompletable.incompleteEvents}
          </strong>
          <p>
            Bugünkü pilot kayıt henüz hazır değil; gerçek CSV verisi girildiğinde rapor yeniden
            üretilecek.
          </p>
        </article>
      </div>
    </section>
  );
}
