import prisma from "../../../../../prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {pusherServer} from "@/services/pusher/pusherServer";

/**
 * Toggles the ready status of a player in the game room.
 * @param request 
 * @returns NextResponse.json
 */
// eslint-disable-next-line
export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const id = searchParams.get("id");
  const playerId = searchParams.get("playerId");
  if (!id || !playerId) {
    return NextResponse.json({error: 'No id or playerName provided'}, {status: 400});
  }
  const playerIdNum = parseInt(playerId);

  try {
    const player = await prisma.player.findFirst({
      where: {
        id: playerIdNum,
        gameRoomId: id
      }
    });

    if (!player) {
      return NextResponse.json({error: 'Player not found'}, {status: 400});
    }

    const updatedPlayer = await prisma.player.update({
      where: {
        id: playerIdNum,
        gameRoomId: id
      },
      data: {
        isReady: !player.isReady
      }
    });
    await pusherServer.trigger(id, "toggle-ready", updatedPlayer);
    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error('Error toggling ready status:', error);
    return NextResponse.json({ error: 'Error toggling ready status' }, { status: 500 });
  }
}