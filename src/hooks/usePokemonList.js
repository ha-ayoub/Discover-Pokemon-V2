import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPokemonList } from '../api/pokemonApi';
import { ITEMS_PER_PAGE, MAX_POKEMON } from '../constants';

export function usePokemonList(enableInfiniteScroll = false) {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const loadPokemons = useCallback(async (currentOffset, append = false) => {
    if (currentOffset >= MAX_POKEMON) {
      setHasMore(false);
      return;
    }

    setLoading(true);

    try {
      const data = await fetchPokemonList(ITEMS_PER_PAGE, currentOffset);
      
      setPokemons(prev => append ? [...prev, ...data.results] : data.results);
      setHasMore(currentOffset + ITEMS_PER_PAGE < MAX_POKEMON);
      
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPokemons(offset, false);
  }, [offset, loadPokemons]);

  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setOffset(prev => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [enableInfiniteScroll, hasMore, loading]);

  const handleNextPage = useCallback(() => {
    if (offset + ITEMS_PER_PAGE < MAX_POKEMON) {
      setOffset(prev => prev + ITEMS_PER_PAGE);
    }
  }, [offset]);

  const handlePreviousPage = useCallback(() => {
    setOffset(prev => Math.max(0, prev - ITEMS_PER_PAGE));
  }, []);

  return {
    pokemons,
    loading,
    hasMore,
    handleNextPage,
    handlePreviousPage,
    observerTarget,
    offset,
  };
}