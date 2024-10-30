'use client'
import usePokemonApi from '@/hooks/getPokemon';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import pokeStyles from './pokemon.module.css'
export default function Pokemon() {
   
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
      setCard(<Card name={data.name} types={pokeData.arrayToString(data.types)} sprite={data.sprites.front_default}
      id={data.id} favoriteStyle={data.favoriteStyle} onClick={() => pokeData.toggleFavorite(data)} toggleRedirect={() => {pokeData.toggleRedirect(item.id)}}/>)
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