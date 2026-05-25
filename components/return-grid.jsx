import { formatReturn, returnClass, windows } from "@/lib/market-data";

export default function ReturnGrid({ returns, windowSet = windows }) {
  return (
    <div className="return-grid">
      {windowSet.map(([key, label]) => {
        const value = returns?.[key];
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
