import caveImg from "../assets/habitats/cave.png";
import forestImg from "../assets/habitats/forest.png";
import grasslandImg from "../assets/habitats/grassland.png";
import mountainImg from "../assets/habitats/mountain.png";
import rareImg from "../assets/habitats/rare.png";
import roughTerrainImg from "../assets/habitats/rough-terrain.png";
import seaImg from "../assets/habitats/sea.png";
import urbanImg from "../assets/habitats/urban.png";
import watersEdgeImg from "../assets/habitats/waters-edge.png";

export const TYPE_COLORS = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const TYPE_GRADIENTS = {
  normal: "linear-gradient(135deg, rgba(168,167,122,0.5) 0%, rgba(198,197,185,0.5) 100%)",
  fire: "linear-gradient(135deg, rgba(238,129,48,0.5) 0%, rgba(245,172,120,0.5) 100%)",
  water: "linear-gradient(135deg, rgba(99,144,240,0.5) 0%, rgba(157,183,245,0.5) 100%)",
  electric: "linear-gradient(135deg, rgba(247,208,44,0.5) 0%, rgba(250,224,120,0.5) 100%)",
  grass: "linear-gradient(135deg, rgba(122,199,76,0.5) 0%, rgba(167,219,141,0.5) 100%)",
  ice: "linear-gradient(135deg, rgba(150,217,214,0.5) 0%, rgba(188,230,227,0.5) 100%)",
  fighting: "linear-gradient(135deg, rgba(194,46,40,0.5) 0%, rgba(214,120,115,0.5) 100%)",
  poison: "linear-gradient(135deg, rgba(163,62,161,0.5) 0%, rgba(197,131,193,0.5) 100%)",
  ground: "linear-gradient(135deg, rgba(226,191,101,0.5) 0%, rgba(237,214,154,0.5) 100%)",
  flying: "linear-gradient(135deg, rgba(169,143,243,0.5) 0%, rgba(198,183,245,0.5) 100%)",
  psychic: "linear-gradient(135deg, rgba(249,85,135,0.5) 0%, rgba(250,146,181,0.5) 100%)",
  bug: "linear-gradient(135deg, rgba(166,185,26,0.5) 0%, rgba(197,217,106,0.5) 100%)",
  rock: "linear-gradient(135deg, rgba(182,161,54,0.5) 0%, rgba(209,193,123,0.5) 100%)",
  ghost: "linear-gradient(135deg, rgba(115,87,151,0.5) 0%, rgba(163,147,184,0.5) 100%)",
  dragon: "linear-gradient(135deg, rgba(111,53,252,0.5) 0%, rgba(162,125,252,0.5) 100%)",
  dark: "linear-gradient(135deg, rgba(112,87,70,0.5) 0%, rgba(161,144,122,0.5) 100%)",
  steel: "linear-gradient(135deg, rgba(183,183,206,0.5) 0%, rgba(209,209,224,0.5) 100%)",
  fairy: "linear-gradient(135deg, rgba(214,133,173,0.5) 0%, rgba(229,179,206,0.5) 100%)",
};

export const API_ENDPOINTS = {
  POKEMON_LIST: "https://pokeapi.co/api/v2/pokemon",
  POKEMON_DETAIL: "https://pokeapi.co/api/v2/pokemon",
  POKEMON_SPECIES: "https://pokeapi.co/api/v2/pokemon-species",
  EVOLUTION_CHAIN: "https://pokeapi.co/api/v2/evolution-chain",
};

export const ITEMS_PER_PAGE = 50;
export const MAX_POKEMON = 1302;
export const CACHE_DURATION = 5 * 60 * 1000;

export const TYPE_EFFECTIVENESS = {
  normal: { weak: ["fighting"], resistant: [], immune: ["ghost"] },
  fire: { weak: ["water", "ground", "rock"], resistant: ["fire", "grass", "ice", "bug", "steel", "fairy"], immune: [] },
  water: { weak: ["electric", "grass"], resistant: ["fire", "water", "ice", "steel"], immune: [] },
  electric: { weak: ["ground"], resistant: ["electric", "flying", "steel"], immune: [] },
  grass: { weak: ["fire", "ice", "poison", "flying", "bug"], resistant: ["water", "electric", "grass", "ground"], immune: [] },
  ice: { weak: ["fire", "fighting", "rock", "steel"], resistant: ["ice"], immune: [] },
  fighting: { weak: ["flying", "psychic", "fairy"], resistant: ["bug", "rock", "dark"], immune: [] },
  poison: { weak: ["ground", "psychic"], resistant: ["grass", "fighting", "poison", "bug", "fairy"], immune: [] },
  ground: { weak: ["water", "grass", "ice"], resistant: ["poison", "rock"], immune: ["electric"] },
  flying: { weak: ["electric", "ice", "rock"], resistant: ["grass", "fighting", "bug"], immune: ["ground"] },
  psychic: { weak: ["bug", "ghost", "dark"], resistant: ["fighting", "psychic"], immune: [] },
  bug: { weak: ["fire", "flying", "rock"], resistant: ["grass", "fighting", "ground"], immune: [] },
  rock: { weak: ["water", "grass", "fighting", "ground", "steel"], resistant: ["normal", "fire", "poison", "flying"], immune: [] },
  ghost: { weak: ["ghost", "dark"], resistant: ["poison", "bug"], immune: ["normal", "fighting"] },
  dragon: { weak: ["ice", "dragon", "fairy"], resistant: ["fire", "water", "electric", "grass"], immune: [] },
  dark: { weak: ["fighting", "bug", "fairy"], resistant: ["ghost", "dark"], immune: ["psychic"] },
  steel: { weak: ["fire", "fighting", "ground"], resistant: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"], immune: ["poison"] },
  fairy: { weak: ["poison", "steel"], resistant: ["fighting", "bug", "dark"], immune: ["dragon"] },
};

export const GROWTH_RATES = {
  slow: { name: "Slow", color: "#e74c3c" },
  "medium-slow": { name: "Medium Slow", color: "#e67e22" },
  medium: { name: "Medium", color: "#f39c12" },
  "medium-fast": { name: "Medium Fast", color: "#2ecc71" },
  fast: { name: "Fast", color: "#27ae60" },
  erratic: { name: "Erratic", color: "#9b59b6" },
  fluctuating: { name: "Fluctuating", color: "#3498db" },
};

export const HABITATS = {
  cave: { name: "Cave", image: caveImg, color: "#795548" },
  forest: { name: "Forest", image: forestImg, color: "#4CAF50" },
  grassland: { name: "Grassland", image: grasslandImg, color: "#8BC34A" },
  mountain: { name: "Mountain", image: mountainImg, color: "#9E9E9E" },
  rare: { name: "Rare", image: rareImg, color: "#EFBF04" },
  "rough-terrain": { name: "Rough Terrain", image: roughTerrainImg, color: "#A1887F" },
  sea: { name: "Sea", image: seaImg, color: "#2196F3" },
  urban: { name: "Urban", image: urbanImg, color: "#607D8B" },
  "waters-edge": { name: "Waters Edge", image: watersEdgeImg, color: "#00BCD4" },
};

export const CAPTURE_DIFFICULTY = {
  getLevel: (rate) => {
    if (rate >= 200) return { level: "Very Easy", color: "#4CAF50", percentage: 100 };
    if (rate >= 120) return { level: "Easy", color: "#8BC34A", percentage: 80 };
    if (rate >= 75) return { level: "Medium", color: "#FFC107", percentage: 60 };
    if (rate >= 45) return { level: "Hard", color: "#FF9800", percentage: 40 };
    if (rate >= 25) return { level: "Very Hard", color: "#FF5722", percentage: 25 };
    return { level: "Extremely Hard", color: "#F44336", percentage: 10 };
  }
};