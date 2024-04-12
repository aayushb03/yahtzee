import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

// eslint-disable-next-line
export async function POST(request: NextRequest) {
  const data = await request.json();
  const score = data.score;
  const yahtzees = data.yahtzees;
  const isWin = data.isWin;
  const userEmail = data.email;

  try {
    const newGame = await prisma.game.create({
      data: {
        // eslint-disable-next-line
        Score: score,
        Yahtzees: yahtzees,
        isWin: isWin,
        User: { connect: { Email:userEmail } } // Connect the game to the user
      },
    });
    return NextResponse.json(newGame, { status: 200 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Error adding game' }, { status: 500 });
  }
}