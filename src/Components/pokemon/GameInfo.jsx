import { GROWTH_RATES, HABITATS, CAPTURE_DIFFICULTY } from '../../constants';
import '../../styles/GameInfo.css';

export default function GameInfo({ species, pokemon }) {
  const captureRate = species?.capture_rate || 0;
  const captureDifficulty = CAPTURE_DIFFICULTY.getLevel(captureRate);
  
  const growthRate = species?.growth_rate?.name || 'unknown';
  const growthInfo = GROWTH_RATES[growthRate] || { name: 'Unknown', color: '#999' };
  
  const habitat = species?.habitat?.name || null;
  const habitatInfo = habitat ? HABITATS[habitat] : null;

  const heldItems = pokemon?.held_items || [];

  return (
    <div className="game-info-section">
      <h3>Game Information</h3>

      <div className="info-grid">
        <div className="info-card">
          <h4>Capture Rate</h4>
          <div className="capture-info">
            <div className="capture-bar-container">
              <div 
                className="capture-bar"
                style={{ 
                  width: `${captureDifficulty.percentage}%`,
                  backgroundColor: captureDifficulty.color 
                }}
              />
            </div>
            <div className="capture-details">
              <span className="capture-value">{captureRate}</span>
              <span 
                className="capture-difficulty"
                style={{ color: captureDifficulty.color }}
              >
                {captureDifficulty.level}
              </span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h4>Growth Rate</h4>
          <div className="growth-info">
            <span 
              className="growth-badge"
              style={{ backgroundColor: growthInfo.color }}
            >
              {growthInfo.name}
            </span>
            <p className="growth-description">
              {growthRate === 'slow' && 'Takes longer to level up'}
              {growthRate === 'medium-slow' && 'Slightly slower leveling'}
              {growthRate === 'medium' && 'Standard leveling speed'}
              {growthRate === 'medium-fast' && 'Slightly faster leveling'}
              {growthRate === 'fast' && 'Levels up quickly'}
              {growthRate === 'erratic' && 'Irregular leveling pattern'}
              {growthRate === 'fluctuating' && 'Variable leveling speed'}
            </p>
          </div>
        </div>

        {habitatInfo && (
          <div className="info-card">
            <h4>Natural Habitat</h4>
            <div className="habitat-info">
              <span className="habitat-icon">{habitatInfo.icon}</span>
              <span 
                className="habitat-name"
                style={{ color: habitatInfo.color }}
              >
                {habitatInfo.name}
              </span>
            </div>
          </div>
        )}

        {heldItems.length > 0 && (
          <div className="info-card full-width">
            <h4>Held Items in Wild</h4>
            <div className="held-items-list">
              {heldItems.map((item, index) => (
                <div key={index} className="held-item">
                  <span className="item-name">
                    {item.item.name.replace('-', ' ')}
                  </span>
                  <span className="item-rarity">
                    {item.version_details[0].rarity}% chance
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}