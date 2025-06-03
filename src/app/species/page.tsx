// app/species/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import SpeciesCard from "@/components/SpeciesCard";

interface Species {
  name: string;
  url: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getSpecies(): Promise<{ results: Species[] }> {
  const res = await fetch(`${baseUrl}/api/species`);
  return res.json();
}

export default async function SpeciesPage() {
  const data = await getSpecies();

  return (
    <main className="py-12 px-6 max-w-6xl mx-auto">

      {/* === Back Arrow Container === */}
      <div className="w-full max-w-5xl mb-6">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <IoArrowBack className="text-2xl text-[#007fcf]" />
        </Link>
      </div>

      {/* === HEADING === */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-press text-[#007fcf] mb-6">
          Pokémon Species
        </h1>
        <p className="text-base md:text-lg font-outfit text-gray-600">
          Explore the various Pokémon species, their color types, and breeding egg groups.
        </p>
      </div>
      
      {/* === SPECIES GRID === */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data.results.map((species) => (
          <SpeciesCard key={species.name} name={species.name} url={species.url} />
        ))}
      </div>
    </main>
  );
}
