import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

// eslint-disable-next-line
export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const userEmail = searchParams.get("userEmail");

  try {
    const games = await prisma.game.findMany({
      where: {
        User: { Email: userEmail as string }
      }
    });
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error('Error getting games:', error);
    return NextResponse.json({ error: 'Error getting games' }, { status: 500 });
  }
}