'use client'
import { useEffect, useState } from "react";

import usePokemonApi from "@/hooks/getPokemon";
import detailStyles from './details.module.css'
export default function Details({params}) {
    const [data, setData] = useState("");
    const [pokemon, setPokemon] = useState({});
    const [info, setInfo] = useState('');
    const [moves,setMoves] = useState([])
    const [pokeImg, setPokeImg] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpbKiUFba7go6lXL6Ryu4B3F4cC1qPpbvqw&s');
    const pokeData = usePokemonApi();
    function playCry(cry) {
        const audio = new Audio();
        audio.src = cry;
        audio.play();
    }
    useEffect(() => {
        params.then((pokemon) => {
            setData(pokemon.pokemon)
        })
    }, [params])
    useEffect(() => {
        if (data) {
            grabPokemon(data)
        }
        
       
    }, [data])
    useEffect(() => {
        console.log("GROUP",pokeData.eggGroup)
    }, [pokeData.eggGroup])
    async function grabPokemon(id) {
        const request = await pokeData.getPokemon(id)
        .then((response) => {
            // console.log(response)
            setPokemon(response)
            setPokeImg(response.sprites.front_default)
            response.moves.map((item, index, elements) => {
                setMoves((moves) => [...moves, <li key={index}>{item.move.name}</li>])
               
            })
        })
      return []
        }
      
       
        console.log(pokemon)
    return (
        <main className={detailStyles.container}>
            <div className={detailStyles.container}>
                <h1>{pokeData.capitalizeFirstLetter(pokemon.name)}</h1> 
                <img className={detailStyles.sprite} onClick={() => playCry(pokemon.cries.latest)} src={pokeImg} width="200" alt={pokemon.name} />
                <div className={detailStyles.data}>
                    <h2>Types:</h2>
                    <p>{pokeData.arrayToString(pokemon.types)}</p>
                    <h2>Abilities:</h2>
                    <p>{pokeData.arrayToString(pokemon.abilities)}</p>
                    <h2>Height:</h2>
                    <p>{(pokemon.height / 10).toFixed(1)} m</p>
                    <h2>Weight:</h2>
                    <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
                    <h2>Moves</h2>
                    <ul className={detailStyles.moves}>
                        {moves}
                    </ul>
                </div>
           </div>
        </main>
    )    
}
    