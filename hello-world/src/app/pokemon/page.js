'use client'
import usePokemonApi from '@/hooks/getPokemon';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import pokeStyles from './pokemon.module.css'
export default function Pokemon() {
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
    const pokeData = usePokemonApi();
    const [query,setQuery] = useState('')
    const [card,setCard] = useState('')
    const data = pokeData.pokemonSearch
    useEffect(() => {
      if (pokeData.pokemonSearch.length != 0) {
        pokeData.searchPokemon(query)
        
      }
    }, [query]);
    function loadCard(data) {
      setCard(<Card name={data.name} types={arrayToString(data.types)} sprite={data.sprites.front_default}/>)
    }
    return (
        <div className={pokeStyles.container}>
            <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)}  type="text" placeholder='Enter Pokemon Name...'/>
            <button onClick={() => loadCard(pokeData.pokemonSearch)}>Search</button>
            </div>
            <div>{card}</div>
        </div>
    )
}