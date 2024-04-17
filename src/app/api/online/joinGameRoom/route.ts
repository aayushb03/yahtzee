import {nanoid} from "nanoid";
import prisma from "../../../../../prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {pusherServer} from "@/services/pusher/pusherServer";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);

  const id = searchParams.get("id")
  const playerName = searchParams.get("playerName");
  if (!id || !playerName) {
    return NextResponse.json({error: 'No id or playerName provided'}, {status: 400});
  }

  // Add player to the game room
  try {
    const numPlayers = await prisma.player.count({
      where: {
        gameRoomId: id
      }
    });
    if (numPlayers >= 4) {
      return NextResponse.json({ error: 'Room is full' }, { status: 400 });
    }
    await prisma.player.create({
      data: {
        name: playerName,
        isHost: false,
        gameRoomId: id
      }
    });
    await pusherServer.trigger(id, "new-player", playerName)
    return NextResponse.json(id, { status: 200 });
  } catch (error) {
    console.error('Error joining room:', error);
    return NextResponse.json({ error: 'Error joining room' }, { status: 500 });
  }
}