import { TYPE_EFFECTIVENESS } from '../constants';

export function formatPokemonId(id) {
  return String(id).padStart(3, '0');
}

export function getPokemonIdFromUrl(url) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
}

export function getPokemonSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
}

export function convertHeight(height) {
  return (height / 3.048).toFixed(1);
}

export function convertWeight(weight) {
  return (weight / 10).toFixed(1);
}

export function extractStats(pokemonData) {
  return {
    height: convertHeight(pokemonData.height),
    weight: convertWeight(pokemonData.weight),
    exp: pokemonData.base_experience,
    hp: pokemonData.stats[0].base_stat,
    attack: pokemonData.stats[1].base_stat,
    defence: pokemonData.stats[2].base_stat,
    splAttack: pokemonData.stats[3].base_stat,
    splDefence: pokemonData.stats[4].base_stat,
    speed: pokemonData.stats[5].base_stat,
  };
}

export function getEnglishDescription(speciesData) {
  const englishEntries = speciesData.flavor_text_entries.filter(
    entry => entry.language.name === 'en'
  );
  
  if (englishEntries.length === 0) return 'No description available.';
  
  const description = englishEntries[englishEntries.length - 1].flavor_text;
  
  return description.replace(/\f|\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
}

export function calculateTypeEffectiveness(types) {
  const weaknesses = new Set();
  const resistances = new Set();
  const immunities = new Set();

  types.forEach(typeObj => {
    const typeName = typeObj.type.name;
    const effectiveness = TYPE_EFFECTIVENESS[typeName];

    if (effectiveness) {
      effectiveness.weak.forEach(type => weaknesses.add(type));
      effectiveness.resistant.forEach(type => resistances.add(type));
      effectiveness.immune.forEach(type => immunities.add(type));
    }
  });

  immunities.forEach(type => {
    weaknesses.delete(type);
    resistances.delete(type);
  });

  resistances.forEach(type => {
    weaknesses.delete(type);
  });

  return {
    weaknesses: Array.from(weaknesses),
    resistances: Array.from(resistances),
    immunities: Array.from(immunities),
  };
}

export function parseEvolutionChain(chain) {
  const evolutions = [];

  function traverse(node) {
    evolutions.push({
      name: node.species.name,
      id: getPokemonIdFromUrl(node.species.url),
    });

    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach(evolution => traverse(evolution));
    }
  }

  traverse(chain);
  return evolutions;
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatStatName(statName) {
  const nameMap = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return nameMap[statName] || statName;
}