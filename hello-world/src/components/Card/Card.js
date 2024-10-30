import Cardstyles from './card.module.css'
export default function Card({name, types, sprite}) {
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    return (
        <div className={Cardstyles.card}>
            <h2>{capitalizeFirstLetter(name) || "Unknown"}</h2>
            <p>Types:{capitalizeFirstLetter(types) || "Unknown"} </p>
            <img  src={sprite || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"} alt={name} className={Cardstyles.sprite}/>
        </div>
    );
}