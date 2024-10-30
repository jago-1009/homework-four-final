'use client'
import Navstyles from './navbar.module.css'
import { useState } from 'react'
export default function Navbar() {
    const [query,setQuery] = useState('')
    return (
        <nav className={Navstyles.navbar} >
          <div className={Navstyles.searchBar}>
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" className={Navstyles.searchInput}  />
            <button className={Navstyles.submitBtn}>Search</button>
          </div>
    </nav>
    )
}
