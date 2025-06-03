// app/moves/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface Move {
  name: string;
  url: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getMoves(): Promise<{ results: Move[] }> {
  const res = await fetch(`${baseUrl}/api/moves`);
  return res.json();
}

export default async function MovesPage() {
  const data = await getMoves();

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

      {/* === Heading === */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-press text-[#007fcf] mb-6">
          Pokémon Moves
        </h1>
        <p className="text-base md:text-lg text-gray-600 font-outfit max-w-2xl mx-auto">
          These are some of the unique moves that Pokémon can learn. Click on one to explore its effects, type, and power!
        </p>
      </div>

      {/* === Moves Grid === */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-12">
        {data.results.map((move) => (
          <Link
            key={move.name}
            href={`/moves/${move.name}`}
            className="w-28 h-28 md:w-36 md:h-36 
                        flex items-center justify-center 
                        bg-[#ffcb05] border-b-4 border-r-4 border-[#007fcf] 
                        text-[#1d2c5e] font-outfit font-medium text-sm md:text-base 
                        rounded-full text-center capitalize 
                        hover:scale-105 transition-transform cursor-pointer"
            >
            {move.name.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </main>
  );
}
