// app/api/abilities/[ability]/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ ability: string }> }
): Promise<NextResponse> {
  const { ability } = await context.params;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`);
    
    if (!res.ok) {
      return NextResponse.json(
        { error: "Ability not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch ability" },
      { status: 500 }
    );
  }
}
