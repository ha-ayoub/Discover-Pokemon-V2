import { useState, useEffect } from 'react';
import { fetchEvolutionChain } from '../api/pokemonApi';
import { parseEvolutionChain } from '../utils/helpers';

export function useEvolution(evolutionChainUrl) {
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!evolutionChainUrl) return;

    let isMounted = true;

    async function loadEvolutionChain() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchEvolutionChain(evolutionChainUrl);
        
        if (!isMounted) return;
        
        const parsedEvolutions = parseEvolutionChain(data.chain);
        setEvolutions(parsedEvolutions);

      } catch (err) {
        if (!isMounted) return;
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEvolutionChain();

    return () => {
      isMounted = false;
    };
  }, [evolutionChainUrl]);

  return {
    evolutions,
    loading,
    error,
  };
}