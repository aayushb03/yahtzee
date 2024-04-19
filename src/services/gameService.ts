'use server';

const url = 'http://localhost:3000/api';

// eslint-disable-next-line
export async function addLocalGame(playerName: string, score: number, yahtzees: number, userEmail?: string,) {
  console.log("addLocalGame", playerName, score, yahtzees, userEmail);
  const response = await fetch(`${url}/addLocalGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ playerName, score, yahtzees, userEmail })
  });

  if (!response.ok) {
    console.log("Error: ", response.status);
    return null;
  }

  return response.json();
}

// eslint-disable-next-line
export async function addOnlineGame(gameRoomId: string, playerName: string, score: number, yahtzees: number, isWin: boolean, userEmail?: string) {
  const response = await fetch(`${url}/addOnlineGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ gameRoomId, playerName, score, yahtzees, isWin, userEmail })
  });

  if (!response.ok) {
    console.log("Error: ", response.status);
    return null;
  }

  return response.json();
}

// eslint-disable-next-line
export async function getGamesByUser(email: string) {
  const response = await fetch(`${url}/getGamesByUser?userEmail=${email}`, {
    method: 'GET'
  });

  if (!response.ok) {
    console.log("Error: ", response.status);
    return null;
  }

  return await response.json() as { localGames: ILocalGames[], onlineGames: IOnlineGames[] };
}

export interface ILocalGames {
  playerName: string;
  userEmail: number;
  score: number;
  yahtzees: number;
}

export interface IOnlineGames {
  playerName: string;
  Score: number;
  Yahtzees: number;
  isWin: boolean;
}