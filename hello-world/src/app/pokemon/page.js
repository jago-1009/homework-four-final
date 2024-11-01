'use client'
import usePokemonApi from '@/hooks/getPokemon';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import pokeStyles from './pokemon.module.css'
export default function Pokemon() {
   
    const pokeData = usePokemonApi();
    const [query,setQuery] = useState('')
    const [eggGroup, setEggGroup] = useState('monster')
    const [cards,setCard] = useState([])
    const [method, setMethod ] = useState('By Name')
  const [pokemonGroup, setPokemonGroup] = useState([]);
    const data = pokeData.pokemonSearch
    const eggGroups = pokeData.eggGroups
    // console.log(eggGroups)
    useEffect(() => {
      if (pokeData.pokemonSearch.length != 0) {
        pokeData.searchPokemon(query)
        
      }
    }, [query]);
    useEffect(() => {
      if (pokeData.eggGroups.length == 0) {
        pokeData.getEggGroups()
        
      }
    }, []);
    
    function loadCard(data) {
      if (data) {
      let newCard = <Card name={data.name} key={data.id} types={pokeData.arrayToString(data.types)} sprite={data.sprites.front_default}
      id={data.id} favoriteStyle={pokeData.favoriteStyle[data.id]} onClick={() => pokeData.toggleFavorite(data)} toggleRedirect={data.id}/>
      setCard(prevCards => {
        if (Array.isArray(prevCards)) {
          return [...prevCards, newCard];
        }
        else {
          setCard([])
          return [newCard];
        }
      });
    
    }
  }
    async function loadGroup(data) {
      setCard([])
      setPokemonGroup([])

      let response = await pokeData.getEggGroup(data)
      if (response) {
        console.log(response)
         pokeData.eggGroup.map(async (item, index, elements) => {
         let pokemon = await pokeData.getPokemon(item.name)
         setPokemonGroup(prevGroup => [...prevGroup, pokemon]);
       })
       if (pokemonGroup.length > 0) {
        const newCards = pokemonGroup
        .filter(item => item && item.name)
        .map((item) => (
            <Card
                name={item.name}
                key={item.id}
                types={pokeData.arrayToString(item.types)}
                sprite={item.sprites.front_default}
                id={item.id}
                favoriteStyle={pokeData.favoriteStyle[item.id]}
                onClick={() => pokeData.toggleFavorite(item)}
                toggleRedirect={item.id}
            />
        ));
        setCard(newCards);
    }

        
      
      }
      
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
            <button onClick={() => setCard(<Card name={pokeData.pokemonSearch.name} key={pokeData.pokemonSearch.id} types={pokeData.arrayToString(pokeData.pokemonSearch.types)} sprite={pokeData.pokemonSearch.sprites.front_default}
      id={pokeData.pokemonSearch.id} favoriteStyle={pokeData.favoriteStyle[pokeData.pokemonSearch.id]} onClick={() => pokeData.toggleFavorite(pokeData.pokemonSearch)} toggleRedirect={pokeData.pokemonSearch.id}/>)}>Search</button>
            </div> : ""}
            {method === 'By Egg Group' ? <div className={pokeStyles.searchBar}>
            <label htmlFor ="eggGroup">Search by Egg Group</label>
              <select name='eggGroup' value={eggGroup} onChange={(e) => setEggGroup(e.target.value)}>
                <option value="monster" >monster</option>
                {
                  eggGroups.map((item, index, elements) => {
                    if (item.name == "monster") {
                      return 
                    }
                    else {
                    return <option key={index} value={item.name}>{item.name}</option>
                    }
                  })
                }
              </select>
              <button onClick={() => loadGroup(eggGroup)}>Search</button>

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
            <div className={pokeStyles.cards}>{cards}</div>
        </div>
    )
}