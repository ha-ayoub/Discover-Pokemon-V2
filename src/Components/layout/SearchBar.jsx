import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { formatPokemonId } from '../../utils/helpers';
import Button from '../common/Button';
import { Search, X } from 'lucide-react';
import '../../styles/SearchBar.css';

export default function SearchBar() {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { 
    query, 
    results, 
    loading, 
    showSuggestions, 
    handleQueryChange, 
    clearSearch, 
    hideSuggestions 
  } = useSearch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        hideSuggestions();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideSuggestions]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/${query.toLowerCase().trim()}`);
      clearSearch();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = () => {
    clearSearch();
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        {query && (
          <button onClick={clearSearch} className="clear-button">
            <X size={20} />
          </button>
        )}
      </div>

      <Button label="Search" onClick={handleSearch} />

      {showSuggestions && (
        <div className="search-suggestions">
          {loading ? (
            <div className="suggestion-item loading">Searching...</div>
          ) : results.length > 0 ? (
            results.map((pokemon) => {
              const id = pokemon.url.split('/').filter(Boolean).pop();
              return (
                <Link
                  key={pokemon.name}
                  to={`/${pokemon.name}`}
                  className="suggestion-item"
                  onClick={handleSuggestionClick}
                >
                  <span className="suggestion-id">#{formatPokemonId(id)}</span>
                  <span className="suggestion-name">{pokemon.name}</span>
                </Link>
              );
            })
          ) : (
            <div className="suggestion-item no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}