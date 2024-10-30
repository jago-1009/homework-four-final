"use client";
import { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonState, setPokemonState] = useState({
    totalPokemonCount: 0,
    randomPokemon: [],
  });
  const [pokemonSearch, setPokemonSearch] = useState({});

  /**
   * Fetches the pokemon api with a limit of 1 to minimize api call time. Uses count returned to determine the total number of pokemon stored on the api.
   **/
  async function searchPokemon(name) {
    const pokeRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (pokeRequest.ok) {
      return await pokeRequest.json();
    }
  }
  async function getNumberOfPokemon() {
    const pokeRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=1`
    );
    const { count: pokemonCount } = await pokeRequest.json();
    setPokemonState({ ...pokemonState, totalPokemonCount: pokemonCount });
  }
  /**
 * Get 5 random unique ids to fetch pokemon
 **/
async function getPokemon(number) {
  const randId = parseInt(Math.random() * pokemonState.totalPokemonCount) + 1;
  const pokeRequest = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${number}`
  );
  if (pokeRequest.ok) {
 // console.log(`${number} okay`)
 return await pokeRequest.json();
   
  }
  else {
    console.log(`${number} not okay... using ${randId}`)
    getPokemon(randId);
   
  }
  
}
async function getRandomPokemon(limit = 5) {
    if (!pokemonState.totalPokemonCount) return [];
    const pokemonIds = {};
    let pokeIndex = 0;
  
    while (pokeIndex < limit) {
      const randId = parseInt(Math.random() * pokemonState.totalPokemonCount);
      if (!pokemonIds[randId]) {
        const pokeRequest = await getPokemon(randId)
        if (pokeRequest) {
          pokemonIds[randId] = pokeRequest;
          pokeIndex += 1;
        }
      }
    
    }
  
    setPokemonState({
      ...pokemonState,
      randomPokemon: Object.values(pokemonIds),
    });
  }
  // modified
  const contextValue = { ...pokemonState, getNumberOfPokemon, getRandomPokemon };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}

export default function usePokemon() {
  return useContext(PokemonContext);
}