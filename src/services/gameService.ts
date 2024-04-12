'use server';

const url = 'http://localhost:3000/api';

export async function addGame(score: number, yahtzees: number, isWin: boolean, email: string) {
  const response = await fetch(`${url}/addGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score, yahtzees, isWin, email })
  });

  if (!response.ok) {
    console.log("Error: ", response.status);
    return null;
  }

  return response.json();
}

export async function getGamesByUser(email: string) {
  const response = await fetch(`${url}/getGamesByUser?userEmail=${email}`, {
    method: 'GET'
  });

  if (!response.ok) {
    console.log("Error: ", response.status);
    return null;
  }

  return await response.json() as IGame[];
}

export interface IGame {
  Score: number;
  Yahtzees: number;
  isWin: boolean;
}