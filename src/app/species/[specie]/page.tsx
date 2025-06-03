// app/species/[specie]/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface SpeciesDetail {
  name: string;
  color: { name: string };
  egg_groups: { name: string }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  habitat: { name: string } | null;
  shape: { name: string };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getSpeciesDetail(specie: string): Promise<SpeciesDetail> {
  const res = await fetch(`${baseUrl}/api/species/${specie}`);
  if (!res.ok) throw new Error("Failed to fetch species details");
  return res.json();
}

function getColorClass(color: string): string {
  const colorClasses: Record<string, string> = {
    red: "bg-red-200 border-red-500",
    blue: "bg-blue-200 border-blue-500",
    green: "bg-green-200 border-green-500",
    yellow: "bg-yellow-200 border-yellow-500",
    purple: "bg-purple-200 border-purple-500",
    black: "bg-gray-800 border-gray-900 text-white",
    white: "bg-gray-100 border-gray-300",
    pink: "bg-pink-200 border-pink-400",
    brown: "bg-amber-200 border-amber-400",
    gray: "bg-gray-300 border-gray-500",
  };

  return colorClasses[color] || "bg-[#ffcb05] border-[#007fcf]";
}

export default async function SpeciesDetailPage({ params, searchParams }: {
  params: Promise<{ specie: string }>;
  searchParams: Promise<{ color?: string }>;
}) {
  const { specie } = await params;
  const { color = "yellow" } = await searchParams;

  const data = await getSpeciesDetail(specie);

  const flavorText = data.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text.replace(/\f/g, ' ') ?? "No description available.";

  return (
    <main className="py-12 px-6 max-w-6xl mx-auto">
      {/* === Back Arrow Container === */}
      <div className="mb-6">
        <Link href="/species" className="flex items-center gap-2">
          <IoArrowBack className="text-2xl text-[#007fcf]" />
        </Link>
      </div>

      {/* === Heading === */}
      <h1 className="text-3xl font-press text-[#007fcf] capitalize mb-6">{data.name}</h1>

      {/* === Description === */}
      <div className="bg-[#ffcb05] border-b-4 border-r-4 border-[#007fcf] rounded-xl p-6 font-outfit text-[#1d2c5e] mb-6">
        <h2 className="text-lg font-bold mb-2">Description</h2>
        <p>{flavorText}</p>
      </div>

      {/* === Information === */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-12 font-outfit text-[#1d2c5e]">

        {/* === Color === */}
        <div className={`border-b-4 border-r-4 rounded-lg p-4 ${getColorClass(color)}`}>
          <h3 className="font-bold mb-2">Color</h3>
          <p className="capitalize">{data.color.name}</p>
        </div>

        {/* === Habitat === */}
        <div className="bg-[#ffcb05] border-b-4 border-r-4 border-[#007fcf] rounded-lg p-4">
          <h3 className="font-bold mb-2">Habitat</h3>
          <p className="capitalize">{data.habitat?.name ?? "Unknown"}</p>
        </div>

        {/* === Egg Groups === */}
        <div className="bg-[#ffcb05] border-b-4 border-r-4 border-[#007fcf] rounded-lg p-4 col-span-2">
          <h3 className="font-bold mb-2">Egg Groups</h3>
          {data.egg_groups.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.egg_groups.map(g => (
                <span key={g.name} className="bg-[#007fcf] text-white px-3 py-1 rounded-full text-sm capitalize">
                  {g.name}
                </span>
              ))}
            </div>
          ) : (
            <p>No egg groups found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
