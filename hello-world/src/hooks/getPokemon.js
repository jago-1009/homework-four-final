"use client";
import { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonState, setPokemonState] = useState({
    totalPokemonCount: 0,
    randomPokemon: [],
    pokemonSearch: {},
    favoritePokemon: [],
    favoriteStyle: [],
  });
  function arrayToString(array) {
    let string = "";
    if (array !== undefined) {
      array.map((item, index, elements) => {
        if (elements[index + 1] !== undefined) {
          string += (item.type.name + ", ");
        }
        else {
          string += (item.type.name)
        }
       
      })
    }
    return string;
    
  }

  function toggleFavorite(pokemon) {
    const newStyle = { ...pokemonState.favoriteStyle };
    let newFavorite = [...pokemonState.favoritePokemon];

    if (pokemonState.favoriteStyle[pokemon.id] === "#d3d3d3") {
        // Remove from favorites and update style to black
        newStyle[pokemon.id] = 'black';
        newFavorite = newFavorite.filter((item) => item.id !== pokemon.id);
    } else {
        // Add to favorites and update style to #d3d3d3
        newStyle[pokemon.id] = '#d3d3d3';
        newFavorite = [...newFavorite, pokemon];
    }

    setPokemonState({
        ...pokemonState,
        favoriteStyle: newStyle,
        favoritePokemon: newFavorite
    });
}

  
  
  function addtoFavorite(pokemon) {
    setPokemonState({
      ...pokemonState,
      favoritePokemon: [...pokemonState.favoritePokemon, pokemon],
    })
  }
  
  async function searchPokemon(name) {
    const pokeRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )
    
    if (pokeRequest.ok) {
      const pokeJson = await pokeRequest.json();
      console.log(pokeJson)
      setPokemonState({ ...pokemonState, pokemonSearch: pokeJson });
    }
    ;
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

  //I'm aware that this is redundant, but before the update I used it to recursively call the function until data was called.
  //I'm leaving it here because I'm proud of it.
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
        let idToUse = randId;
        if(idToUse > 1000) {
          idToUse = "10" + String(idToUse).slice(1)
        }
        const pokeRequest = await getPokemon(idToUse)
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
  const contextValue = { ...pokemonState, getNumberOfPokemon, getRandomPokemon, searchPokemon, addtoFavorite, toggleFavorite, arrayToString };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}

export default function usePokemon() {
  return useContext(PokemonContext);
}