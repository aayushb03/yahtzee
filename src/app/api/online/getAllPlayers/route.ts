import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../prisma/client";

/**
 * Gets all players in a game room.
 * @param request 
 * @returns NextResponse.json
 */
// eslint-disable-next-line
export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({error: 'No id provided'}, { status: 400 });
  }

  try {
    const players = await prisma.player.findMany({
      where: {
        gameRoomId: id
      }
    });
    return NextResponse.json(players, { status: 200 });
  }
  catch (error) {
    console.error('Error getting players:', error);
    return NextResponse.json({error: 'Error getting players:'}, { status: 200 });
  }
}