import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

/**
 * @returns status 200 (ok) if succesful, status 500 if not succesful 
 * attempts to add new score to the database using prisma - used at the end of the game 
 * data is the player(s) name and score(s) at the end of the game or if the autofill button is pressed
 * name and score are both assigned from the value(s) in data
 * throws an error if unsucessfull 
 * past_Scores is the database where all the scores are stored in - formatted as below:
 * | Game_Number (auto_increment) | Player_Name (VARCHAR(45) | Score (INT) |
 */
// eslint-disable-next-line
export async function POST(request: NextRequest) {
  const data = await request.json();
  const name = data.name;
  const score = data.score;
  try {
    const newScore = await prisma.past_Scores.create({
      data: {
        // eslint-disable-next-line
        Player_Name: name,
        Score: score,
      },
    });
    return NextResponse.json(newScore, { status: 200 });
  } catch (error) {
    console.error('Error adding score:', error);
    return NextResponse.json({ error: 'Error adding score' }, { status: 500 });
  }
}
