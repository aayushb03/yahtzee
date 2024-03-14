import {NextResponse} from "next/server";
import prisma from "@/../prisma/client";

// uses prisma client to return all entries in the database called Past_Scores - used at end of game for leaderboard
// Past_Scores is formatted as such:
//  | Game_Number (auto_increment) | Player_Name (VARCHAR(45) | Score (INT) |
// if unsucessfull in fetching, throws error

export async function GET() {
  try {
    const scores = await prisma.past_Scores.findMany();
    return NextResponse.json(scores, { status: 200 });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Error fetching scores' }, { status: 500 });
  }
}