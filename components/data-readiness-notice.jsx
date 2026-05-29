"use client";

const readinessItems = [
  {
    label: "Kaynak",
    value: "KAP adayları",
    note: "Olay kaynağı ayrıca tutulur."
  },
  {
    label: "Fiyat",
    value: "Veri bekleniyor",
    note: "Düzeltilmiş fiyat ve hacim henüz yayın verisi değildir."
  },
  {
    label: "Yayın",
    value: "Kilitli",
    note: "Hesap tekrar üretilebilir olmadan doğrulanmış sayılmaz."
  }
];

export default function DataReadinessNotice({ compact = false }) {
  return (
    <section className={`readiness-notice ${compact ? "compact" : ""}`} aria-label="Veri doğrulama durumu">
      <div className="readiness-copy">
        <p className="eyebrow">Yayın şeffaflığı</p>
        <h2>Kaynaklı olay var; fiyat tepkisi için resmi veri bekleniyor.</h2>
        <p>
          KAP ve şirket duyurusu kaynakları ayrı, fiyat/hacim/BIST 100 hesapları ayrı tutulur.
          Lisanslı ve tekrar üretilebilir fiyat serisi gelmeden oranlar doğrulanmış kabul edilmez.
        </p>
        <div className="readiness-actions">
          <a className="text-link" href="/veri-operasyonu">
            Veri operasyonu
          </a>
          <a className="text-link" href="/metodoloji">
            Metodoloji
          </a>
        </div>
      </div>

      <div className="readiness-items" aria-label="Yayın kontrol durumu">
        {readinessItems.map((item) => (
          <div className="readiness-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
