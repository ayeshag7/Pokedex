// app/abilities/[name]/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface AbilityDetail {
  name: string;
  generation: { name: string };
  effect_entries: { effect: string; short_effect: string; language: { name: string } }[];
  pokemon: { pokemon: { name: string } }[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getAbilityDetail(ability: string): Promise<AbilityDetail> {
  try {
    const res = await fetch(`${baseUrl}/api/abilities/${ability}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ability details: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching ability detail:", error);
    throw error;
  }
}

export default async function AbilityDetailPage({ params }: { params: Promise<{ ability: string }> }) {
  const { ability } = await params;
  const data = await getAbilityDetail(ability);
  const effectEntry = data.effect_entries.find((e) => e.language.name === "en");

  return (
    <main className="py-12 px-6 max-w-6xl mx-auto">
      
      {/* === BACK ARROW CONTAINER === */}
        <div className="w-full max-w-5xl mb-6">
            <Link
                href="/abilities"
                className="flex items-center gap-2"
                >
                <IoArrowBack className="text-2xl text-[#007fcf]" />
            </Link>
        </div>

      {/* === Heading === */}
      <div className="mb-8">
        <h1 className="text-3xl font-press text-[#007fcf] capitalize mb-2">{data.name}</h1>
        <p className="text-lg text-gray-600 font-outfit">
            Generation: <span className="capitalize">{data.generation.name}</span>
        </p>
      </div>

      {/* === Effect Description === */}
      <div className="rounded-lg border-b-4 border-r-4 border-[#007fcf] bg-[#ffcb05] p-4 mb-6">
        <h2 className="text-lg font-bold text-[#1d2c5e] mb-2 font-outfit">Effect</h2>
        <p className="text-[#1d2c5e] font-outfit">{effectEntry?.short_effect}</p>
      </div>

      {/* === Pokémon List === */}
      <div className="rounded-lg border-b-4 border-r-4 border-[#007fcf] bg-[#ffcb05] p-4">
        <h2 className="text-lg font-bold text-[#1d2c5e] mb-2 font-outfit">Used By Pokémon</h2>
        <ul className="list-disc list-inside text-[#1d2c5e] font-outfit capitalize">
          {data.pokemon.map((entry) => (
            <li key={entry.pokemon.name}>{entry.pokemon.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
