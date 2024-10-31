import Cardstyles from './card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import usePokemonApi from '@/hooks/getPokemon';
import Link from 'next/link';
export default function Card({name, types, sprite, id,favoriteStyle, onClick, toggleRedirect}) {
    const pokeData = usePokemonApi();
 
   
    
    return (
        
        <div id={id} className={Cardstyles.card} >
            <FontAwesomeIcon onClick={onClick} style={{stroke: 'black', strokeWidth: '50px', color:favoriteStyle}} icon={faStar} />
            <h2>{pokeData.capitalizeFirstLetter(name) || "Unknown"}</h2>
            <p>Types:{pokeData.capitalizeFirstLetter(types) || "Unknown"} </p>
            <img  src={sprite || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpbKiUFba7go6lXL6Ryu4B3F4cC1qPpbvqw&s"} alt={name} className={Cardstyles.sprite}/>
            <Link href={`/details/${toggleRedirect}`}><button>Read More</button></Link>
        </div>
    );
}