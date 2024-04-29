import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

/**
 * Adds a new local game to the database.
 * @param request 
 * @returns NextResponse.json
 */
// eslint-disable-next-line
export async function POST(request: NextRequest) {
  const data = await request.json();
  const playerName = data.playerName;
  const userEmail = data.userEmail
  const score = data.score
  const yahtzees = data.yahtzees

  try {
    const newGame = await prisma.localGameStats.create({
      data: {
        // eslint-disable-next-line
        PlayerName: playerName,
        Score: score,
        Yahtzees: yahtzees,
        UserEmail: userEmail
      },
    });
    return NextResponse.json(newGame, { status: 200 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Error adding game' }, { status: 500 });
  }
}