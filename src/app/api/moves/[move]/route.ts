// app/api/moves/[move]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ move: string }> }
): Promise<NextResponse> {
  const { move } = await context.params;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/move/${move}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Move not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch move details" },
      { status: 500 }
    );
  }
}
