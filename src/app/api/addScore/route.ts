import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const name = data.name;
  const score = data.score;
  try {
    const new_score = await prisma.past_Scores.create({
      data: {
        Player_Name: name,
        Score: score,
      },
    });
    return NextResponse.json(new_score, { status: 200 });
  } catch (error) {
    console.error('Error adding score:', error);
    return NextResponse.json({ error: 'Error adding score' }, { status: 500 });
  }
}