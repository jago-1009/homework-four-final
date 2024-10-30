'use client'
import usePokemonApi from "@/hooks/getPokemon";
export default function Favorites() {
    const pokeData = usePokemonApi();

    return (
        <div>
            <h1>Favorite Pokemon</h1>
        </div>
    );
}