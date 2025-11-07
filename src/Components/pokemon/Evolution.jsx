import { Link } from 'react-router-dom';
import { useEvolution } from '../../hooks/useEvolution';
import { getPokemonSpriteUrl, formatPokemonId } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/Evolution.css';
import { ArrowRight } from 'lucide-react';

export default function Evolution({ evolutionChainUrl }) {
  const { evolutions, loading, error } = useEvolution(evolutionChainUrl);

  if (loading) return <LoadingSpinner size="small" />;
  if (error || evolutions.length <= 1) return null;

  return (
    <div className="evolution-section">
      <h3>Evolution Chain</h3>
      <div className="evolution-chain">
        {evolutions.map((evolution, index) => (
          <div key={evolution.id} className="evolution-stage">
            <Link to={`/${evolution.name}`} className="evolution-link">
              <div className="evolution-card">
                <img 
                  src={getPokemonSpriteUrl(evolution.id)} 
                  alt={evolution.name}
                />
                <span className="evolution-id">#{formatPokemonId(evolution.id)}</span>
                <span className="evolution-name">{evolution.name}</span>
              </div>
            </Link>
            {index < evolutions.length - 1 && (
              <div className="evolution-arrow">
                <ArrowRight size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}