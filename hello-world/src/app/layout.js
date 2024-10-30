'use client'
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "../components/Navbar/Navbar";
import { PokemonProvider } from "@/hooks/getPokemon";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      
        <PokemonProvider>
        <Navbar />
        {children}
        </PokemonProvider>
      </body>
    </html>
  );
}
