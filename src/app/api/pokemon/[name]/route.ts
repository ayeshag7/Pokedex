// app/api/pokemon/[name]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ name: string }> }
): Promise<NextResponse> {
  const { name } = await context.params;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Pokémon not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch Pokémon details" },
      { status: 500 }
    );
  }
}

