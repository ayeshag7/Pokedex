// app/moves/[move]/page.tsx
export const dynamic = "force-dynamic";

import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

interface MoveDetail {
  name: string;
  power: number | null;
  pp: number;
  accuracy: number | null;
  type: { name: string };
  damage_class: { name: string };
  effect_entries: { effect: string; short_effect: string; language: { name: string } }[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function getMoveDetail(move: string): Promise<MoveDetail> {
  const res = await fetch(`${baseUrl}/api/moves/${move}`);
  if (!res.ok) throw new Error("Failed to fetch move details");
  return res.json();
}

export default async function MoveDetailPage({ params }: { params: Promise<{ move: string }> }) {
  const { move } = await params;
  const data = await getMoveDetail(move);
  const effectEntry = data.effect_entries.find((e) => e.language.name === "en");

  return (
    <main className="py-12 px-6 max-w-6xl mx-auto">
      {/* === Back Arrow Container === */}
      <div className="mb-6">
        <Link href="/moves" className="flex items-center gap-2">
          <IoArrowBack className="text-2xl text-[#007fcf]" />
        </Link>
      </div>

      {/* === Heading === */}
      <h1 className="text-3xl md:text-4xl font-press text-[#007fcf] capitalize mb-6">
        {data.name.replace(/-/g, ' ')}
      </h1>

      {/* === Effect Description === */}
      <div className="rounded-lg border-b-4 border-r-4 border-[#007fcf] bg-[#ffcb05] p-4 mb-6">
        <h2 className="text-lg font-bold text-[#1d2c5e] mb-2 font-outfit">Effect</h2>
        <p className="text-[#1d2c5e] font-outfit">
          {effectEntry?.effect.replace(/\$effect_chance/g, 'X') ?? "N/A"}
        </p>
      </div>

      {/* === Move Information === */}
      <div className="bg-[#ffcb05] border-b-4 border-r-4 border-[#007fcf] rounded-xl p-6 font-outfit text-[#1d2c5e] space-y-4">
        <p><strong>Type:</strong> {data.type.name}</p>
        <p><strong>Category:</strong> {data.damage_class.name}</p>
        <p><strong>Power:</strong> {data.power ?? "—"}</p>
        <p><strong>PP:</strong> {data.pp}</p>
        <p><strong>Accuracy:</strong> {data.accuracy ?? "—"}</p>
      </div>
    </main>
  );
}
