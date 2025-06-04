// app/api/pokemon/route.ts
import { NextRequest, NextResponse } from "next/server";

interface PokemonSummary {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  image: string | null;
  type: string | null;
}

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch Pokémon list" }, { status: res.status });
    }

    const data = await res.json();
    const results: PokemonSummary[] = data.results;

    const detailedData: PokemonDetail[] = await Promise.all(
      results.map(async (poke) => {
        try {
          const detailRes = await fetch(poke.url);
          if (!detailRes.ok) throw new Error("Failed to fetch Pokémon details");

          const details = await detailRes.json();

          return {
            name: poke.name,
            image: details.sprites.front_default ?? null,
            type: details.types[0]?.type?.name ?? null,
          };
        } catch {
          return {
            name: poke.name,
            image: null,
            type: null,
          };
        }
      })
    );

    return NextResponse.json(detailedData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
