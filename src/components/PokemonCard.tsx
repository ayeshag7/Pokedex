'use client';

import Link from "next/link";
import Image from "next/image";
import React from "react";

interface PokemonProps {
  name: string;
  image: string;
  type: string;
}

const PokemonCard: React.FC<PokemonProps> = ({ name, image, type }) => {
  return (
    <Link href={`/pokemon/${name}`} className="no-underline">
      
      {/* === Card container === */}
      <div
        className="
          w-64 h-72
          bg-[#ffcb05]                             /* Pokémon yellow background */
          rounded-lg 
          border-b-4 border-r-4 border-[#007fcf]   /* Blue bottom-right border */
          p-4 
          flex flex-col justify-center items-center 
          transition-transform 
          hover:scale-105                          /* Slightly scale on hover */
          hover:brightness-110                     /* Slightly brighten on hover */
        "
      >
        {/* === Pokémon image === */}
        <Image 
          src={image} 
          alt={name} 
          width={120} 
          height={120} 
          className="border border-black rounded-lg" 
        />

        {/* === Pokémon name === */}
        <h3 className="text-lg md:text-xl text-black font-press font-bold capitalize mt-4 mb-1 text-center">
          {name}
        </h3>

        {/*=== Pokémon type === */}
        <p className="text-sm md:text-base text-[#1d2c5e] font-semibold font-outfit">
          Type: {type}
        </p>
      </div>
    </Link>
  );
};

export default PokemonCard;
