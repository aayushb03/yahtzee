import prisma from "../../../../../prisma/client";
import { nanoid } from "nanoid"
import {NextRequest, NextResponse} from "next/server";

/**
 * Creates a game room and adds the player to it.
 * @param request 
 * @returns NextResponse.json
 */
// eslint-disable-next-line
export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const id = nanoid(10);

  const playerName = searchParams.get("playerName");
  if (!playerName) {
    return NextResponse.json({ error: 'Must Provide All Params' }, { status: 500 });
  }

  try {
    const room = await prisma.gameRoom.create({
      data: {
        id: id,
      },
    });
    const player = await prisma.player.create({
      data: {
        name: playerName,
        isHost: true,
        isReady: true,
        gameRoomId: room.id
      }
    });
    return NextResponse.json({roomId: room.id, playerId: player.id}, { status: 200 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Error creating room' }, { status: 500 });
  }
}