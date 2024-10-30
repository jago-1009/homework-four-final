import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PokemonProvider } from "../hooks/getPokemon";


export default function Details() {
    const [data, setData] = useState({});
    const [card, setCard] = useState();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const pokeData = usePokemonApi();

    