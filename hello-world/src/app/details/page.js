'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import usePokemonApi from "@/hooks/getPokemon";

export default function Details() {
    const [data, setData] = useState({});
    const [card, setCard] = useState();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const pokeData = usePokemonApi();
    useEffect(() => {
        grabPokemon(id)

    },[])
    async function grabPokemon(id) {
        const request = await pokeData.getPokemon(id)
        .then((response) => {
            console.log(response)
            setData(response)
        })
      return []
        }
    return (
        <main>
            <h1>{data.name}</h1>
        </main>
    )    
}
    