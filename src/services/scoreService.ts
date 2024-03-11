'use server';

const url = 'http://localhost:3000/api';

export async function getAllScores() {
  const response = await fetch(`${url}/getAllScores`, {
    method: 'GET'
  });

  if (!response.ok) {
    console.log("Error: ", response.status);
    return [] as Score[];
  }

  return await response.json() as Score[];
}

export async function addScore(name: string, score: number) {
  const response = await fetch(`${url}/addScore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, score })
  });

  if (!response.ok) {
    console.log("Error: ", response.status);
    return null;
  }

  return await response.json() as Score;
}

export async function clearScores() {
  const response = await fetch(`${url}/clearScores`, {
    method: 'DELETE'
  });
  return await response.json();
}

export interface Score {
  Game_Num: number;
  Player_Name: string;
  Score: number;
}