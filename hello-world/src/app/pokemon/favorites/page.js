'use client'
import usePokemonApi from "@/hooks/getPokemon";
import Card from "@/components/Card/Card";
import favStyles from './favorites.module.css'
export default function Favorites() {
    const pokeData = usePokemonApi();
    const data = pokeData.favoritePokemon
    const cards = data.map(
        (item, index, elements) => {
            if (data.length === 0) 
                { return <h1>No Favorites</h1>

                }

            else {
            return (
                <Card name={item.name} types={pokeData.arrayToString(item.types)} sprite={item.sprites.front_default} id={item.id} key={item.id} favoriteStyle={item.favoriteStyle} onClick={() => pokeData.toggleFavorite(item)}/>
            )
        }
        }
    )

    return (
        <main>
        <div className={favStyles.container}>
            {cards}
        </div>
        </main>
    )
}