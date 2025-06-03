// app/page/[page]/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import PokemonCard from "@/components/PokemonCard";

interface Pokemon {
  name: string;
  image: string;
  type: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getPokemonData(): Promise<Pokemon[]> {
  const res = await fetch(`${baseUrl}/api/pokemon`);
  const data = await res.json();
  return data.slice(20, 30); // Last 10
}

export default async function PageTwo() {
  const pokemonList = await getPokemonData();

  return (
    <main className="py-12 px-8 md:px-16">

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

      {/* === Back Arrow Container === */}
      <div className="text-center mt-8">
        <Link href="/" className="text-[#007fcf] font-bold underline">
          ← Previous
        </Link>
      </div>
    </main>
  );
}
