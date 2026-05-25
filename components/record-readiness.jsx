export default function RecordReadiness({ event, dataStatus, importState }) {
  const steps = [
    {
      label: "Olay kaynağı",
      state: event.sources?.some((source) => source.isPrimary) ? "Kaynak adayı var" : "Kaynak bekliyor",
      note: "Doğrudan KAP veya şirket duyurusu bağlantısı editör kontrolünden geçer."
    },
    {
      label: "Fiyat serisi",
      state: importState?.statusLabel ?? dataStatus.label,
      note: importState?.description ?? dataStatus.description
    },
    {
      label: "Takvim kapsamı",
      state: importState?.calendarStatusLabel ?? "Takvim bekliyor",
      note: "İlk tepki tarihi ve işlem günü kapsamı doğrulanmadan pencere getirileri hesaplanmaz."
    },
    {
      label: "Yayın kilidi",
      state: importState?.publicationGate ?? "Veri eksik",
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
