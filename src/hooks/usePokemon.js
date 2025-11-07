import { useState, useEffect } from 'react';
import { fetchPokemonDetail, fetchPokemonSpecies } from '../api/pokemonApi';
import { extractStats, getEnglishDescription, calculateTypeEffectiveness } from '../utils/helpers';

export function usePokemon(nameOrId) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [stats, setStats] = useState(null);
  const [description, setDescription] = useState('');
  const [typeEffectiveness, setTypeEffectiveness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nameOrId) return;

    let isMounted = true;

    async function loadPokemon() {
      setLoading(true);
      setError(null);

      try {

        const pokemonData = await fetchPokemonDetail(nameOrId);
        
        if (!isMounted) return;
        
        setPokemon(pokemonData);
        setStats(extractStats(pokemonData));
        setTypeEffectiveness(calculateTypeEffectiveness(pokemonData.types));

        const speciesData = await fetchPokemonSpecies(pokemonData.id);
        
        if (!isMounted) return;
        
        setSpecies(speciesData);
        setDescription(getEnglishDescription(speciesData));

      } catch (err) {
        if (!isMounted) return;
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isMounted = false;
    };
  }, [nameOrId]);

  return {
    pokemon,
    species,
    stats,
    description,
    typeEffectiveness,
    loading,
    error,
  };
}