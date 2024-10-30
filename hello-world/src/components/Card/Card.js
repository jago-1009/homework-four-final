import Cardstyles from './card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import usePokemonApi from '@/hooks/getPokemon';
export default function Card({name, types, sprite, id,favoriteStyle, onClick, toggleRedirect}) {
    const pokeData = usePokemonApi();
 
   
    
    return (
        
        <div id={id} className={Cardstyles.card} >
            <FontAwesomeIcon onClick={onClick} style={{stroke: 'black', strokeWidth: '50px', color:favoriteStyle}} icon={faStar} />
            <h2>{pokeData.capitalizeFirstLetter(name) || "Unknown"}</h2>
            <p>Types:{pokeData.capitalizeFirstLetter(types) || "Unknown"} </p>
            <img  src={sprite || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"} alt={name} className={Cardstyles.sprite}/>
            <button onClick={toggleRedirect}>Read More</button>
        </div>
    );
}