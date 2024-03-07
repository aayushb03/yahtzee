import {NextResponse} from "next/server";
import prisma from "@/../prisma/client";

export async function DELETE() {
  try {
    await prisma.past_Scores.deleteMany();
    return NextResponse.json({ message: 'Scores deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting scores:', error);
    return NextResponse.json({ error: 'Error deleting scores' }, { status: 500 });
  }
}