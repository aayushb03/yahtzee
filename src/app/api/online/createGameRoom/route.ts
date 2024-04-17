import prisma from "../../../../../prisma/client";
import { nanoid } from "nanoid"
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const id = nanoid(10);

  const playerName = searchParams.get("playerName");
  if (!playerName) {
    return NextResponse.json({ error: 'Must Provide All Params' }, { status: 500 });
  }

  // TL;DR: We create a chat room with a random id, then
  // return the room id to the client side.
  try {
    const room = await prisma.gameRoom.create({
      data: {
        id: id,
      },
    });
    await prisma.player.create({
      data: {
        name: playerName,
        isHost: true,
        gameRoomId: room.id
      }
    });
    return NextResponse.json(room.id, { status: 200 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Error creating room' }, { status: 500 });
  }
}