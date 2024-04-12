import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

/**
 * @returns status 200 (ok) if succesful, status 500 if not succesful 
 * attempts to add new user to the database using prisma 
 * data is the player's username and password 
 * throws an error if unsucessfull 
 */
export async function POST(request: NextRequest) {
  const data = await request.json();
  const username = data.username;
  const password = data.password;
  const pastGameScores = data.pastGameScores;
  try {
    const newUser = await prisma.User.create({
      data: {
        // eslint-disable-next-line
        Username: username,
        password: password,
        pastGameScores: pastGameScores,
      },
    });
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error('Error adding score:', error);
    return NextResponse.json({ error: 'Error adding user' }, { status: 500 });
  }
}
