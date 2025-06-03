// app/api/species/[specie]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ specie: string }> }
): Promise<NextResponse> {
  const { specie } = await context.params;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${specie}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Species not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch species" },
      { status: 500 }
    );
  }
}
