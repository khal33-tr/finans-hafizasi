function SentimentRow({ label, value, tone = "positive" }) {
  return (
    <div className="sentiment-row">
      <span>{label}</span>
      <div className={`bar ${tone}`}>
        <span style={{ width: `${value}%` }} />
      </div>
      <strong>{value}%</strong>
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
