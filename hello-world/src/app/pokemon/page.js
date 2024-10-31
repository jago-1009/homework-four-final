'use client'
import usePokemonApi from '@/hooks/getPokemon';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import pokeStyles from './pokemon.module.css'
export default function Pokemon() {
   
    const pokeData = usePokemonApi();
    const [query,setQuery] = useState('')
    const [eggGroup, setEggGroup] = useState('')
    const [cards,setCard] = useState([])
    const [method, setMethod ] = useState('By Name')
    const data = pokeData.pokemonSearch
    useEffect(() => {
      if (pokeData.pokemonSearch.length != 0) {
        pokeData.searchPokemon(query)
        
      }
    }, [query]);
    function loadCard(data) {
      setCard(...cards, <Card name={data.name} types={pokeData.arrayToString(data.types)} sprite={data.sprites.front_default}
      id={data.id} favoriteStyle={pokeData.favoriteStyle[data.id]} onClick={() => pokeData.toggleFavorite(data)} toggleRedirect={data.id}/>)
    }
    return (
        <div className={pokeStyles.container}>
            <div className={pokeStyles.search}>
              <ul className={pokeStyles.list}>
                <li onClick={() => setMethod('By Name')}>By Name</li>
                <li onClick={() => setMethod('By Egg Group')}>By Egg Group</li>
                <li onClick={() => setMethod('By Habitat')}>By Habitat</li>
              </ul>
            {method === 'By Name' ? <div className={pokeStyles.searchBar}>
            <input value={query} onChange={(e) => setQuery(e.target.value)}  type="text" placeholder='Search by name' />
            <button onClick={() => loadCard(pokeData.pokemonSearch)}>Search</button>
            </div> : ""}
            {method === 'By Egg Group' ? <div className={pokeStyles.searchBar}>
            <label htmlFor ="eggGroup">Search by Egg Group</label>
              <select name='eggGroup' onChange={(e) => setEggGroup(e.target.value)}>
                {
                  pokeData.eggGroups.map((item, index, elements) => {
                    return <option value={item.name} key={index}>{item.name}</option>
                  })
                }
              </select>
              <button onClick={() => loadCard(pokeData.pokemonSearch)}>Search</button>

            </div> : ""}
            {method === 'By Habitat' ? <div className={pokeStyles.searchBar}>
            <label htmlFor ="habitat">Search by Habitat</label>

            <select name='habitat' onChange={(e) => setEggGroup(e.target.value)}>
                
              </select>
              <button onClick={() => loadCard(pokeData.pokemonSearch)}>Search</button>

            </div> : ""}
            </div>
            
            <div>
              
            </div>
            <div>{cards}</div>
        </div>
    )
}