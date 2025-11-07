import { Link } from 'react-router-dom';
import Card from './Card';
import SkeletonCard from '../common/SkeletonCard';
import '../../styles/Feed.css';

export default function Feed({ pokemons, loading }) {
  return (
    <section className="pokemon-feed">
      {pokemons?.map((pokemon) => (
        <Link 
          to={`/${pokemon.name}`} 
          key={pokemon.name}
          className="card-link"
        >
          <Card data={pokemon} />
        </Link>
      ))}
      
      {loading && Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} />
      ))}
    </section>
  );
}