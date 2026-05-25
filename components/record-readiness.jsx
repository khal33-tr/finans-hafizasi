export default function RecordReadiness({ event, dataStatus }) {
  const steps = [
    {
      label: "Olay kaynağı",
      state: event.sources?.some((source) => source.isPrimary) ? "Kaynak adayı var" : "Kaynak bekliyor",
      note: "Doğrudan KAP veya şirket duyurusu bağlantısı editör kontrolünden geçer."
    },
    {
      label: "Fiyat serisi",
      state: dataStatus.label,
      note: dataStatus.description
    },
    {
      label: "Hesap üretimi",
      state: "Tekrar üretim bekliyor",
      note: "Kısa tepki için 1G, 3G, 1H, 2H ve 30G; uzun izleme için 90G, 180G ve 1Y aynı yöntemle yeniden hesaplanmalıdır."
    }
  ];

  return (
    <div className="readiness-panel" aria-label="Kayıt hazırlık durumu">
      {steps.map((step) => (
        <div className="readiness-step" key={step.label}>
          <span>{step.label}</span>
          <strong>{step.state}</strong>
          <p>{step.note}</p>
        </div>
      ))}
    </div>
  );
}
