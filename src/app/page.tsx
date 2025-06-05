// app/page.tsx
export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import PokemonCard from "@/components/PokemonCard";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  GiPokecog,
  GiLightningTrio,
  GiSwordSpin,
  GiTribalGear,
} from "react-icons/gi";

interface Pokemon {
  name: string;
  image: string;
  type: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getPokemonData(): Promise<Pokemon[]> {
  const res = await fetch(`${baseUrl}/api/pokemon`);
  const data = await res.json();
  return data.slice(0, 20); // First 20
}

export default async function Home() {
  const pokemonList = await getPokemonData();

  const dockItems = [
    { title: "Pokemons", icon: <GiPokecog size={20} />, href: "/" },
    { title: "Abilities", icon: <GiLightningTrio size={20} />, href: "/abilities" },
    { title: "Moves", icon: <GiSwordSpin size={20} />, href: "/moves" },
    { title: "Species", icon: <GiTribalGear size={20} />, href: "/species" }
    ];

  return (
    <main className="py-12 px-8 md:px-16">

      {/* === TEXT CONTAINER === */}
      <div className="flex flex-col items-center mb-12 md:mb-8">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <Image
            src="/assets/images/pokemon-header-text.png"
            alt="Pokémon Header"
            width={220}
            height={80}
            className="w-[180px] md:w-[220px]"
          />
          <span className="text-xl md:text-3xl font-press text-[#007fcf]">
            Explorer
          </span>
        </div>

        <p className="text-base md:text-lg font-outfit text-center text-gray-600 max-w-xl mt-2">
          Browse through your favorite Pokémon and discover their types, sprites, and more!
        </p>
      </div>

      {/* === Floating Dock === */}
      <div className="flex justify-center mb-16">
        <FloatingDock 
          items={dockItems}
          desktopClassName="relative w-fit bg-[#1d2c5e] px-6 py-3 rounded-2xl border-2 border-[#007fcf]"
          mobileClassName="relative mt-4"
        />
      </div>

      {/* === CARD GRID CONTAINER === */}
      <div className="flex flex-wrap gap-12 justify-center">
        {pokemonList.map((poke: Pokemon) => (
          <PokemonCard
            key={poke.name}
            name={poke.name}
            image={poke.image}
            type={poke.type}
          />
        ))}
      </div>

      {/* === Forward Arrow Container === */}
      <div className="text-center mt-8">
        <Link href="/page/2" className="text-[#007fcf] font-bold underline">
          Next →
        </Link>
      </div>

    </main>
  );
}
