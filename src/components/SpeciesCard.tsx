"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  url: string;
}

interface SpeciesApiResponse {
  color: { name: string };
  egg_groups: { name: string }[];
}

export default function SpeciesCard({ name, url }: Props) {
  const [color, setColor] = useState<string>("yellow");
  const [eggGroups, setEggGroups] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(url);
      const data: SpeciesApiResponse = await res.json();
      setColor(data.color.name);
      setEggGroups(data.egg_groups.map((g) => g.name));
    }
    fetchDetails();
  }, [url]);

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

  const style = colorClasses[color] || "bg-[#ffcb05] border-[#007fcf]";

  const filteredEggGroups = eggGroups.filter((g) => g !== "no-eggs");
  const isNoEggs = eggGroups.length === 1 && eggGroups[0] === "no-eggs";

  return (
    <Link href={`/species/${name}?color=${color}`}>
      <div
        className={`p-4 rounded-lg border-b-4 border-r-4 ${style} text-center hover:scale-105 transition-transform capitalize cursor-pointer`}
      >
        {/* === Species Name === */}
        <h3 className="font-bold text-black text-lg font-outfit">{name}</h3>

        {/* === Egg Groups === */}
        {isNoEggs ? (
          <div className="mt-2">
            <span className="text-xs bg-white/40 border border-black text-black px-2 py-1 rounded-full font-outfit">
              No Egg Groups
            </span>
          </div>
        ) : (
          <>
            <p className="text-xs text-[#1d2c5e] font-semibold mt-2 mb-1 font-outfit">
              Egg Groups
            </p>
            <div className="flex flex-wrap justify-center gap-1">
              {filteredEggGroups.map((g) => (
                <span
                  key={g}
                  className="text-xs bg-white/40 border border-black text-black px-2 py-1 rounded-full font-outfit"
                >
                  {g}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
