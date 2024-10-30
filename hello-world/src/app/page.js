"use client";
import usePokemonApi from "@/hooks/getPokemon";
import { useEffect } from "react";
import Card from "@/components/Card/Card";
export default function Home() {
  const pokeData = usePokemonApi();
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
    console.log(string)
    return string;
    
  }
  const cards = pokeData.RandomPokemon?.map(
    (item, index, elements) => {
      return (
        <Card
          name={item.name}
          types={arrayToString(item.types)}
          sprite={item.sprites.front_default}
        />
      );
  }) 
  useEffect(() => {
    if (pokeData.totalPokemonCount === 0) {
      pokeData.getNumberOfPokemon();
    }
  }, [pokeData]);
  useEffect(() => {
    if (pokeData.randomPokemon.length === 0) {
      pokeData.getRandomPokemon();
    }
  }, [pokeData]);
  return (
    <main>
      
     {cards}
    </main>
  );
}