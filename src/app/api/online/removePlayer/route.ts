import prisma from "../../../../../prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {pusherServer} from "@/services/pusher/pusherServer";

// eslint-disable-next-line
export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);

  const id = searchParams.get("id")
  const playerId = searchParams.get("playerId");
  if (!id || !playerId) {
    return NextResponse.json({error: 'No id or playerName provided'}, {status: 400});
  }
  const playerIdNum = parseInt(playerId)

  try {
    const player = await prisma.player.delete({
      where: {
        id: playerIdNum,
        gameRoomId: id
      }
    });
    await pusherServer.trigger(id, "remove-player", playerId)
    return NextResponse.json({roomId: id, playerId: player.id}, { status: 200 });
  } catch (error) {
    console.error('Error removing player from room:', error);
    return NextResponse.json({ error: 'Error removing player from room' }, { status: 500 });
  }
}