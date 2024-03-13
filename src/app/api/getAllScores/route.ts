import {NextResponse} from "next/server";
import prisma from "@/../prisma/client";

export async function GET() {
  try {
    const scores = await prisma.past_Scores.findMany();
    return NextResponse.json(scores, { status: 200 });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Error fetching scores' }, { status: 500 });
  }
}