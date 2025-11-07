import { getPokemonIdFromUrl, getPokemonSpriteUrl, formatPokemonId } from '../../utils/helpers';
import '../../styles/Card.css';

export default function Card({ data }) {
  const pokeId = getPokemonIdFromUrl(data.url);
  const imgUrl = getPokemonSpriteUrl(pokeId);

  return (
    <div className="pokemon-card">
      <div className="card-inner">
        <div className="card-image-container">
          <img 
            src={imgUrl} 
            alt={data.name}
            loading="lazy"
          />
        </div>
        <div className="card-content">
          <span className="card-id">#{formatPokemonId(pokeId)}</span>
          <h4 className="card-name">{data.name}</h4>
        </div>
      </div>
    </div>
  );
}