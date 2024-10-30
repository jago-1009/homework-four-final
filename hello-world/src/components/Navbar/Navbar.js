'use client';
import Link from 'next/link'
import Navstyles from './navbar.module.css'
import { useState, useEffect } from 'react'
import usePokemonApi from '@/hooks/getPokemon'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Navbar() {
  
    return (
        <nav className={Navstyles.navbar} >
          <div className={Navstyles.searchBar}>
           <Link className={Navstyles.link} href="/">Random Pokemon</Link>
           <Link className={Navstyles.link} href="/pokemon">Search For Pokemon</Link>
           <Link className={Navstyles.link} href="/pokemon/favorites">Favorites</Link>
          </div>
    </nav>
    )
}
