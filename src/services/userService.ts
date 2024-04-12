'use server';

const url = 'http://localhost:3000/api';

/**
 *  retrieves ALL Users from the database (User) and stores them in an User[]
 *  returns an empty [] if error is thrown
 */
export async function getAllUsers() {
  const response = await fetch(`${url}/getAllUsers`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as IUser[];
}

/**
 *  Adds a score to the database (Users) as a user object -
 *   @param email - player's email to add in the format of a string
 *   @param username - player's username to add in the format of a string
 *   @param password - player's password to add in the format of a string
 *   returns null if error is thrown
 **/
export async function addUser(email: string, username: string, password: string, ) {
  const response = await fetch(`${url}/addUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username, password })
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return response.json();
}

/*
 * Describes User interface
 */
export interface IUser {
  Username: string;
  Password: string;
  PastGameScores: string;
}