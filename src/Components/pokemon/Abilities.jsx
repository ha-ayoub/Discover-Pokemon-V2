import '../../styles/Abilities.css';

export default function Abilities({ abilities }) {
  return (
    <div className="abilities-section">
      <h3>Abilities</h3>
      <div className="abilities-list">
        {abilities.map((ability, index) => (
          <div key={index} className="ability-item">
            <span className="ability-name">
              {ability.ability.name.replace('-', ' ')}
            </span>
            {ability.is_hidden && (
              <span className="hidden-badge">Hidden</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}