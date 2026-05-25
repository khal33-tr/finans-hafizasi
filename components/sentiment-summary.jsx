function SentimentRow({ label, value, tone = "positive" }) {
  const numericValue = typeof value === "number" ? value : null;

  return (
    <div className="sentiment-row">
      <span>{label}</span>
      <div className={`bar ${tone}`}>
        <span style={{ width: `${numericValue ?? 0}%` }} />
      </div>
      <strong>{numericValue === null ? "Yok" : `${numericValue}%`}</strong>
    </div>
  );
}

export default function SentimentSummary({ sentiment }) {
  return (
    <div className="sentiment" aria-label="Kamuya açık söylem özeti">
      <SentimentRow label="Pozitif" value={sentiment.positive} />
      <SentimentRow label="Nötr" value={sentiment.neutral} tone="neutral" />
      <SentimentRow label="Negatif" value={sentiment.negative} tone="negative" />
    </div>
  );
}
