import { Link, useParams } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Stats from '../components/pokemon/Stats';
import StatsChart from '../components/pokemon/StatsChart';
import TypeBadge from '../components/pokemon/TypeBadge';
import Abilities from '../components/pokemon/Abilities';
import Evolution from '../components/pokemon/Evolution';
import Button from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';
import { TYPE_GRADIENTS } from '../constants';
import { formatPokemonId } from '../utils/helpers';
import '../styles/DetailPokemon.css';

export default function DetailPokemon() {
  const { pokemon: pokemonName } = useParams();
  const {
    pokemon,
    species,
    stats,
    description,
    typeEffectiveness,
    loading,
    error,
  } = usePokemon(pokemonName);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="error-screen">
        <h2>Pokémon not found!</h2>
        <p>{error}</p>
        <Link to="/">
          <Button label="Go Back Home" />
        </Link>
      </div>
    );
  }

  const primaryType = pokemon.types[0].type.name;
  const gradient = TYPE_GRADIENTS[primaryType];

  return (
    <div className="pokemon-detail" style={{ background: gradient }}>
      <div className="detail-container maxWidth">
        <div className="detail-header">
          <Link to="/">
            <Button label={<><ArrowLeft size={18} /> Back</>} />
          </Link>
        </div>

        <div className="detail-hero">
          <div className="hero-content">
            <div className="pokemon-title">
              <span className="pokemon-id">#{formatPokemonId(pokemon.id)}</span>
              <h1>{pokemon.name}</h1>
            </div>

            <div className="pokemon-types">
              {pokemon.types.map((typeObj, index) => (
                <TypeBadge key={index} type={typeObj.type.name} size="large" />
              ))}
            </div>

            <p className="pokemon-description">{description}</p>

            <Stats stats={stats} />
          </div>

          <div className="hero-image">
            <div className="image-glow"></div>
            <img
              src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-sprite"
            />
          </div>
        </div>

        <div className="detail-sections">
          <div className="section-row">
            <div className="section-card">
              <Abilities abilities={pokemon.abilities} />
            </div>

            <div className="section-card">
              <h3>Type Effectiveness</h3>
              
              {typeEffectiveness.weaknesses.length > 0 && (
                <div className="effectiveness-group">
                  <h4>Weak to:</h4>
                  <div className="type-badges">
                    {typeEffectiveness.weaknesses.map((type, i) => (
                      <TypeBadge key={i} type={type} size="small" />
                    ))}
                  </div>
                </div>
              )}

              {typeEffectiveness.resistances.length > 0 && (
                <div className="effectiveness-group">
                  <h4>Resistant to:</h4>
                  <div className="type-badges">
                    {typeEffectiveness.resistances.map((type, i) => (
                      <TypeBadge key={i} type={type} size="small" />
                    ))}
                  </div>
                </div>
              )}

              {typeEffectiveness.immunities.length > 0 && (
                <div className="effectiveness-group">
                  <h4>Immune to:</h4>
                  <div className="type-badges">
                    {typeEffectiveness.immunities.map((type, i) => (
                      <TypeBadge key={i} type={type} size="small" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="section-card full-width">
            <StatsChart stats={stats} primaryType={primaryType} />
          </div>

          {species?.evolution_chain && (
            <div className="section-card full-width">
              <Evolution evolutionChainUrl={species.evolution_chain.url} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}