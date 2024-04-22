import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../prisma/client";
import {pusherServer} from "@/services/pusher/pusherServer";

/**
 * Ends a game room.
 * @param request
 * @returns response.json()
 */
// eslint-disable-next-line
export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({error: 'No id provided'}, {status: 400});
  }

  try {
    await prisma.player.deleteMany({
      where: {
        gameRoomId: id
      }
    });
    const room = await prisma.gameRoom.delete({
      where: {
        id: id
      }
    });
    await pusherServer.trigger(id, "game-ended", room)
    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error('Error ending game:', error);
    return NextResponse.json({ error: 'Error ending game' }, { status: 500 })
  }
}