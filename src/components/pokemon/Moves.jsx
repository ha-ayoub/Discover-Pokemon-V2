import { useState } from 'react';
import '../../styles/Moves.css';
import { filtreMoves } from '../../utils/helpers';

export default function Moves({ moves }) {

  const [filter, setFilter] = useState('level-up');
  const [showAll, setShowAll] = useState(false);

  const groupedMoves = filtreMoves(moves);

  if (groupedMoves['level-up']) {
    groupedMoves['level-up'].sort((a, b) => a.level - b.level);
  }

  const currentMoves = groupedMoves[filter] || [];
  const displayedMoves = showAll ? currentMoves : currentMoves.slice(0, 10);

  return (
    <div className="moves-section">
      <div className="moves-header">
        <h3>Moves</h3>
        <div className="moves-filters">
          <button
            className={`filter-btn ${filter === 'level-up' ? 'active' : ''}`}
            onClick={() => setFilter('level-up')}
          >
            Level Up
          </button>
          <button
            className={`filter-btn ${filter === 'machine' ? 'active' : ''}`}
            onClick={() => setFilter('machine')}
          >
            TM/HM
          </button>
          <button
            className={`filter-btn ${filter === 'egg' ? 'active' : ''}`}
            onClick={() => setFilter('egg')}
          >
            Egg Moves
          </button>
          <button
            className={`filter-btn ${filter === 'tutor' ? 'active' : ''}`}
            onClick={() => setFilter('tutor')}
          >
            Tutor
          </button>
        </div>
      </div>

      <div className="moves-list">
        {displayedMoves.length === 0 ? (
          <p className="no-moves">No moves available for this method</p>
        ) : (
          displayedMoves.map((move, index) => (
            <div key={`${move.name}-${index}`} className="move-item">
              <div className="move-info">
                {filter === 'level-up' && move.level > 0 && (
                  <span className="move-level">Lv. {move.level}</span>
                )}
                <span className="move-name">{move.name.replace('-', ' ')}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {currentMoves.length > 10 && (
        <button
          className="show-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show All (${currentMoves.length})`}
        </button>
      )}
    </div>
  );
}