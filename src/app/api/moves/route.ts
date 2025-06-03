// app/api/moves/route.ts
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/move?limit=100");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch moves" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data); 
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
