import {NextRequest, NextResponse} from "next/server";
import prisma from "@/../prisma/client";

/**
 * uses prisma client to return all entries in the database called Users 
 * @returns status 200 if succesful, throws an error if not
 */
export async function GET() {
  try {
    const users = await prisma.User.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}
