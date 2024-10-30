import Cardstyles from './card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import usePokemonApi from '@/hooks/getPokemon';
export default function Card({name, types, sprite, id,favoriteStyle, onClick}) {
    const pokeData = usePokemonApi();
 
   
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    return (
        
        <div id={id} className={Cardstyles.card} onClick={onClick}>
            <FontAwesomeIcon style={{stroke: 'black', strokeWidth: '50px', color:favoriteStyle}} icon={faStar} />
            <h2>{capitalizeFirstLetter(name) || "Unknown"}</h2>
            <p>Types:{capitalizeFirstLetter(types) || "Unknown"} </p>
            <img  src={sprite || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"} alt={name} className={Cardstyles.sprite}/>
        </div>
    );
}