"use client";
import usePokemonApi from "@/hooks/getPokemon";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import pageStyles from './page.module.css'
export default function Home() {
  
  const pokeData = usePokemonApi();
  console.log(pokeData.favoritePokemon)


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

  
  const data = pokeData.randomPokemon
    const cards = data.map(
      (item, index, elements) => {
        
        return (
          <Card
            name={item.name}
            types={arrayToString(item.types)}
            sprite={item.sprites.front_default}
            key={item.id}
            id={item.id}
            favoriteStyle={pokeData.favoriteStyle[item.id]}
            onClick={() => {pokeData.toggleFavorite(item)}}
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