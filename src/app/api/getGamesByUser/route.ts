import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

/**
 * Gets all games for a user.
 * @param request 
 * @returns NextResponse.json
 */
// eslint-disable-next-line
export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const userEmail = searchParams.get("userEmail");

  try {
    const localGames = await prisma.localGameStats.findMany({
      where: {
        User: { Email: userEmail as string }
      }
    });
    const onlineGames = await prisma.onlineGameStats.findMany({
      where: {
        User: { Email: userEmail as string }
      }
    });
    const games = {
      localGames: localGames,
      onlineGames: onlineGames
    }
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error('Error getting games:', error);
    return NextResponse.json({ error: 'Error getting games' }, { status: 500 });
  }
}