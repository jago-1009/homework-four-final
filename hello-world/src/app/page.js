"use client";
import usePokemonApi from "@/hooks/getPokemon";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import pageStyles from './page.module.css'
export default function Home() {
  
  const pokeData = usePokemonApi();
  console.log(pokeData.favoritePokemon)


  

  
  const data = pokeData.randomPokemon
    const cards = data.map(
      (item, index, elements) => {
        
        return (
          <Card
            name={item.name}
            types={pokeData.arrayToString(item.types)}
            sprite={item.sprites.front_default}
            key={item.id}
            id={item.id}
            favoriteStyle={pokeData.favoriteStyle[item.id]}
            onClick={() => {pokeData.toggleFavorite(item)}}
            toggleRedirect={() => {pokeData.toggleRedirect(item.id)}}
          />
        );
    }) 
  
  
  useEffect(() => {
    if (pokeData.totalPokemonCount === 0) {
      pokeData.getNumberOfPokemon();
    }
  }, [pokeData]);
  useEffect(() => {
    if (!pokeData.randomPokemon.length) {
      pokeData.getRandomPokemon();
    }
  }, [pokeData]);
  return (
    <main>
      
     <div className={pageStyles.main}>{cards}</div>
    </main>
  );
}