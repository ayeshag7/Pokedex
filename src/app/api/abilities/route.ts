// app/api/abilities/route.ts

import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/ability?limit=100");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch abilities" },
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
