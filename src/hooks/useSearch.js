import { useState, useEffect, useCallback } from 'react';
import { searchPokemon } from '../api/pokemonApi';
import { debounce } from '../utils/helpers';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') {
      setResults([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);

    try {
      const searchResults = await searchPokemon(searchQuery, 10);
      setResults(searchResults);
      setShowSuggestions(searchResults.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      performSearch(searchQuery);
    }, 300),
    [performSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleQueryChange = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setShowSuggestions(false);
  }, []);

  const hideSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return {
    query,
    results,
    loading,
    showSuggestions,
    handleQueryChange,
    clearSearch,
    hideSuggestions,
  };
}