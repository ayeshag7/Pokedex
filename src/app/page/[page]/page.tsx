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

async function getPokemonData(page: number): Promise<Pokemon[]> {
  const limit = 20;
  const offset = (page - 1) * limit;
  const res = await fetch(`${baseUrl}/api/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data;
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10);
  const pokemonList = await getPokemonData(pageNumber);

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

    {/* === Navigation Arrows === */}
    <div className="text-center mt-8 flex justify-center gap-8">

      {/* Home Link */}
      <Link href="/" className="text-[#007fcf] font-bold underline">
        Home
      </Link>

      {/* Back Arrow: Go to "/" if page 2, else previous numbered page */}
      {pageNumber > 1 && (
        <Link
          href={pageNumber === 2 ? "/" : `/page/${pageNumber - 1}`}
          className="text-[#007fcf] font-bold underline"
        >
          ← Previous
        </Link>
      )}

      {/* Next Arrow: Only show if current batch looks full */}
      {pokemonList.length === 20 && (
        <Link
          href={`/page/${pageNumber + 1}`}
          className="text-[#007fcf] font-bold underline"
        >
          Next →
        </Link>
      )}
    </div>

    </main>
  );
}
