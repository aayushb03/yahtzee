'use server';

const url = 'http://localhost:3000/api';

/**
 * Adds a local game to the database.
 * @param playerName 
 * @param score 
 * @param yahtzees 
 * @param userEmail 
 * @returns response.json()
 */
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

/**
 * Adds an online game to the database.
 * @param gameRoomId 
 * @param playerName 
 * @param score 
 * @param yahtzees 
 * @param isWin 
 * @param userEmail 
 * @returns response.json()
 */
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

/**
 * Gets all games for a user.
 * @param email 
 * @returns { localGames: ILocalGames[], onlineGames: IOnlineGames[] }
 */
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

/**
 * Local games interface.
 */
export interface ILocalGames {
  playerName: string;
  userEmail: number;
  Score: number;
  Yahtzees: number;
}

/**
 * Online games interface.
 */
export interface IOnlineGames {
  playerName: string;
  Score: number;
  Yahtzees: number;
  isWin: boolean;
}