import { formatReturn, returnClass, windows } from "@/lib/market-data";

export default function ReturnGrid({ returns }) {
  return (
    <div className="return-grid">
      {windows.map(([key, label]) => {
        const value = returns[key];
        return (
          <div className="return-cell" key={key}>
            <span>{label}</span>
            <strong className={returnClass(value)}>{formatReturn(value)}</strong>
          </div>
        );
      })}
    </div>
  );
}
