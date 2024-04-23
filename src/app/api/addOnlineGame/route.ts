import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

/**
 * Adds a new online game to the database.
 * @param request 
 * @returns NextResponse.json
 */
// eslint-disable-next-line
export async function POST(request: NextRequest) {
  const data = await request.json();
  const gameRoomId = data.gameRoomId;
  const playerName = data.playerName;
  const score = data.score;
  const Yahtzees = data.yahtzees;
  const isWin = data.isWin;
  const userEmail = data.userEmail;

  try {
    const newGame = await prisma.onlineGameStats.create({
      data: {
        // eslint-disable-next-line
        GameRoomId: gameRoomId,
        PlayerName: playerName,
        Score: score,
        Yahtzees: Yahtzees,
        isWin: isWin,
        UserEmail: userEmail,
      },
    });
    return NextResponse.json(newGame, { status: 200 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Error adding game' }, { status: 500 });
  }
}