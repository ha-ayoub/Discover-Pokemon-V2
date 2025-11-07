export default function Stat({ parameter, value, units }) {
  return (
    <div className="stat-item">
      <div className="stat-parameter">{parameter}</div>
      <div className="stat-value">
        {value}
        {units && <span className="stat-unit">{units}</span>}
      </div>
    </div>
  );
}