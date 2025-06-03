// app/abilities/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface Ability {
  name: string;
  url: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getAbilities(): Promise<{ results: Ability[] }> {
  const res = await fetch(`${baseUrl}/api/abilities`);
  return res.json();
}

export default async function AbilitiesPage() {
  const data = await getAbilities();

  return (
    <main className="py-12 px-6 max-w-6xl mx-auto">

        {/* === BACK ARROW CONTAINER === */}
        <div className="w-full max-w-5xl mb-6">
            <Link
                href="/"
                className="flex items-center gap-2"
                >
                <IoArrowBack className="text-2xl text-[#007fcf]" />
            </Link>
        </div>

      {/* === Heading === */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-press text-center text-[#007fcf] mb-6">
            Pokémon Abilities
        </h1>
        <p className="text-base md:text-lg text-center text-gray-600 font-outfit">
            Here are some unique abilities possessed by different Pokémon. Click on one to learn more!
        </p>
      </div>

      {/* === Grid of Abilities === */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data.results.map((ability) => (
            <Link href={`/abilities/${ability.name}`} key={ability.name}>
            <div
                className="bg-[#ffcb05] border-b-2 border-r-2 border-[#007fcf] text-[#1d2c5e] font-outfit p-4 rounded-lg text-center capitalize hover:scale-105 transition-transform cursor-pointer"
            >
                {ability.name}
            </div>
            </Link>
        ))}
        </div>

    </main>
  );
}
