import { API_ENDPOINTS } from '../constants';
import { cache } from './cache';


export async function fetchPokemonList(limit = 50, offset = 0) {
  const cacheKey = `list_${limit}_${offset}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch(
    `${API_ENDPOINTS.POKEMON_LIST}?limit=${limit}&offset=${offset}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  
  const data = await response.json();
  cache.set(cacheKey, data);
  
  return data;
}

export async function fetchPokemonDetail(nameOrId) {
  const cacheKey = `pokemon_${nameOrId}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch(
    `${API_ENDPOINTS.POKEMON_DETAIL}/${nameOrId.toLowerCase()}`
  );
  
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  
  const data = await response.json();
  cache.set(cacheKey, data);
  
  return data;
}


export async function fetchPokemonSpecies(id) {
  const cacheKey = `species_${id}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch(
    `${API_ENDPOINTS.POKEMON_SPECIES}/${id}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon species');
  }
  
  const data = await response.json();
  cache.set(cacheKey, data);
  
  return data;
}


export async function fetchEvolutionChain(url) {
  const cacheKey = `evolution_${url}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch evolution chain');
  }
  
  const data = await response.json();
  cache.set(cacheKey, data);
  
  return data;
}

export async function searchPokemon(query, limit = 10) {
  if (!query || query.trim() === '') {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  if (!isNaN(normalizedQuery)) {
    try {
      const pokemon = await fetchPokemonDetail(normalizedQuery);
      return [{ name: pokemon.name, url: `${API_ENDPOINTS.POKEMON_DETAIL}/${pokemon.id}` }];
    } catch {
      return [];
    }
  }

  const cacheKey = `search_all`;
  let allPokemon;

  if (cache.has(cacheKey)) {
    allPokemon = cache.get(cacheKey);
  } else {
    const response = await fetch(`${API_ENDPOINTS.POKEMON_LIST}?limit=1302`);
    const data = await response.json();
    allPokemon = data.results;
    cache.set(cacheKey, allPokemon);
  }

  return allPokemon
    .filter(p => p.name.toLowerCase().includes(normalizedQuery))
    .slice(0, limit);
}