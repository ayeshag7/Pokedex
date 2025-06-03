// app/pokemon/[name]/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa";

interface PokemonDetail {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await fetch(`${baseUrl}/api/pokemon/${name}`);
  return res.json();
}

export default async function PokemonDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const data = await getPokemonDetail(name);

  return (
    <main className="py-10 px-6 flex flex-col justify-center items-center">

        {/* === BACK ARROW CONTAINER === */}
        <div className="w-full max-w-5xl mb-6">
            <Link
            href="/"
            className="flex items-center gap-2"
            >
            <IoArrowBack className="text-2xl text-[#007fcf]" />
            </Link>
        </div>

      <div className="bg-[#ffcb05] rounded-lg border-b-4 border-r-4 border-[#007fcf] p-8 w-full max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-press text-[#1d2c5e] text-center capitalize mb-12">
          {data.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* === LEFT COLUMN: IMAGE === */}
          <div className="flex justify-center">
            <Image
              src={data.sprites.front_default}
              alt={data.name}
              width={200}
              height={200}
              className="border-b-3 border-r-3 border-black rounded-lg bg-[#007fcf] p-2"
            />
          </div>

          {/* === CENTER COLUMN: ABILITIES + TYPES === */}
          <div>
            <div className="rounded-md border border-[#1d2c5e] p-4 mb-6">
                <h2 className="text-lg font-bold text-[#1d2c5e] mb-2 font-outfit">Abilities</h2>
                <ul className="list-disc list-inside text-gray-800 font-outfit">
                {data.abilities.map((a) => (
                    <li key={a.ability.name}>{a.ability.name}</li>
                ))}
                </ul>
            </div>

            <div className="rounded-md border border-[#1d2c5e] p-4">
                <h2 className="text-lg font-bold text-[#1d2c5e] mb-2 font-outfit">Types</h2>
                <p className="text-gray-800 font-outfit">
                {data.types.map((t) => t.type.name).join(", ")}
                </p>
            </div>
          </div>

          {/* === RIGHT COLUMN: STATS + META === */}
          <div>
            <div className="rounded-md border border-[#1d2c5e] p-4 mb-6">
                <h2 className="text-lg font-bold text-[#1d2c5e] mb-2 font-outfit">Base Stats</h2>
                <ul className="list-disc list-inside text-gray-800 font-outfit">
                {data.stats.map((s) => (
                    <li key={s.stat.name}>
                    {s.stat.name}: {s.base_stat}
                    </li>
                ))}
                </ul>
            </div>
            
            {/* === Height + Weight === */}
            <div className="flex justify-start items-center text-[#1d2c5e] gap-4 p-4">
                <p className="text-base font-outfit">
                    <GiBodyHeight className="text-xl" /> Height: <span className="font-bold">{data.height}</span>
                </p>
                <p className="text-base font-outfit">
                    <FaWeightHanging className="text-xl" /> Weight: <span className="font-bold">{data.weight}</span>
                </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
