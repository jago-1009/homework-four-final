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
    eggGroups: [],
    eggGroup: [],
  });
  function arrayToString(array) {
    let string = "";
    if (array !== undefined) {
      array.map((item, index, elements) => {
        if (Object.keys(item)[1] == 'type') {
        if (elements[index + 1] !== undefined) {

          string += capitalizeFirstLetter(Object.values(item)[1].name) + ", ";
        }
        else {
          string += capitalizeFirstLetter(item.type.name);
        }    
        } 
        else if (Object.keys(item)[0] == 'ability') {
          if (elements[index + 1] !== undefined) {
            string += capitalizeFirstLetter(item.ability.name) + ", ";
          }
          else {
            string += capitalizeFirstLetter(item.ability.name);
          }
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
      // console.log(pokeJson)
      setPokemonState({ ...pokemonState, pokemonSearch: pokeJson });
    }
    ;
  }
  async function getEggGroups() {
    const pokeRequest = await fetch(
      `https://pokeapi.co/api/v2/egg-group/`
    );
    const { results } = await pokeRequest.json();
    setPokemonState({ ...pokemonState, eggGroups: results });
  }
  async function getEggGroup(id) {
    const dataToSend = id.trim()
    
    const pokeRequest = await fetch(
      `https://pokeapi.co/api/v2/egg-group/${dataToSend}`
    );

    if (!pokeRequest.ok) {
      throw new Error('Network response was not ok');
    }
    const  group  = await pokeRequest.json();
    const pokemon = group.pokemon_species
    setPokemonState({ ...pokemonState, eggGroup: pokemon });
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
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
  // modified
  const contextValue = { ...pokemonState, getNumberOfPokemon, getRandomPokemon, searchPokemon, addtoFavorite, toggleFavorite, arrayToString, getPokemon, capitalizeFirstLetter, getEggGroups, getEggGroup };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}

export default function usePokemon() {
  return useContext(PokemonContext);
}