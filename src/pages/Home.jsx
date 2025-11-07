import Feed from '../components/pokemon/Feed';
import Header from '../components/layout/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { usePokemonList } from '../hooks/usePokemonList';
import '../styles/Home.css';

export default function Home() {
  const {
    pokemons,
    loading,
    hasMore,
    handleNextPage,
    handlePreviousPage,
    offset,
  } = usePokemonList(false);

  if (loading && pokemons.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="Home maxWidth">
      <Header />

      <Feed 
        pokemons={pokemons} 
        loading={loading}
      />

      <div className="pagination">
        <Button 
          label="Previous" 
          onClick={handlePreviousPage}
          disabled={offset === 0}
        />
        <span className="page-info">
          Page {Math.floor(offset / 50) + 1}
        </span>
        <Button 
          label="Next" 
          onClick={handleNextPage}
          disabled={!hasMore}
        />
      </div>
    </div>
  );
}