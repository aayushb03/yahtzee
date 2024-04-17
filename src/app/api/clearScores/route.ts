import {NextResponse} from "next/server";
import prisma from "@/../prisma/client";

/**
 * uses prisma to access database and completely clear all entities insside the database
 * if throws an error, throws error to console
 * throws an error if unsucessfull
 * past_Scores is the database where all the scores are stored in - formatted as below:
 * | Game_Number (auto_increment) | Player_Name (VARCHAR(45) | Score (INT) |
 * @returns status 200 if successful, throws an error if not
 */
// eslint-disable-next-line
export async function DELETE() {
  try {
    await prisma.past_Scores.deleteMany();
    return NextResponse.json({ message: 'Scores deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting scores:', error);
    return NextResponse.json({ error: 'Error deleting scores' }, { status: 500 });
  }
}
