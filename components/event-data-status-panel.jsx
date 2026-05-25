import { longMonitoringWindows, windows } from "@/lib/market-data";

function WindowList({ label, items }) {
  return (
    <div>
      <span>{label}</span>
      <div className="data-window-pills">
        {items.map(([, windowLabel]) => (
          <strong key={windowLabel}>{windowLabel}</strong>
        ))}
      </div>
    </div>
  );
}

export default function EventDataStatusPanel({ event, importState }) {
  const missingSeries = importState.missingSeries.length ? importState.missingSeries.join(", ") : "Eksik seri yok";
  const rangeLabel =
    importState.requiredRangeStart && importState.requiredRangeEnd
      ? `${importState.requiredRangeStart} - ${importState.requiredRangeEnd}`
      : "Pilot kapsamına alınmadı";

  return (
    <section className="content-panel wide-panel data-detail-panel">
      <div className="section-head">
        <div>
          <p className="eyebrow">Veri durumu</p>
          <h2>{event.ticker} için yayın kilidi</h2>
          <p className="section-copy">{importState.description}</p>
        </div>
        <span className={`status-chip ${importState.tone}`}>{importState.statusLabel}</span>
      </div>

      <div className="data-detail-grid" aria-label="Olay veri kontrolü">
        <div>
          <span>Import kapsamı</span>
          <strong>{importState.inPilot ? "Pilot içinde" : "Pilot dışında"}</strong>
        </div>
        <div>
          <span>Takvim durumu</span>
          <strong>{importState.calendarStatusLabel}</strong>
        </div>
        <div>
          <span>Eksik seri</span>
          <strong>{missingSeries}</strong>
        </div>
        <div>
          <span>Yayın kilidi</span>
          <strong>{importState.publicationGate}</strong>
        </div>
      </div>

      <div className="data-range-panel">
        <div>
          <span>Gerekli veri aralığı</span>
          <strong>{rangeLabel}</strong>
        </div>
        <div>
          <span>Gerekli seriler</span>
          <strong>{importState.requiredSeries.join(" + ")}</strong>
        </div>
      </div>

      <div className="data-window-grid">
        <WindowList label="Kısa tepki pencereleri" items={windows} />
        <WindowList label="Uzun izleme pencereleri" items={longMonitoringWindows} />
      </div>

      {importState.specialHandling.length > 0 ? (
        <p className="panel-note">
          Özel kontrol: {importState.specialHandling.join(", ")}. Bu işaret, özellikle adjustedClose alanının ayrıca
          doğrulanması gerektiğini gösterir.
        </p>
      ) : null}
    </section>
  );
}
