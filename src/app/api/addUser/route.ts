import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";
import bcrypt from 'bcryptjs';

/**
 * @returns status 200 (ok) if succesful, status 500 if not succesful 
 * attempts to add new user to the database using prisma 
 * data is the player's username and password 
 * throws an error if unsucessfull 
 */
// eslint-disable-next-line
export async function POST(request: NextRequest) {
  const data = await request.json();
  const username = data.username;
  const email = data.email;
  const password = data.password;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        // eslint-disable-next-line
        Email: email,
        Username: username,
        Password: encryptedPassword,
      },
    });
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error('Error adding score:', error);
    return NextResponse.json({ error: 'Error adding user' }, { status: 500 });
  }
}
