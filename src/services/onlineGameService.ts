"use server";

const url = 'http://localhost:3000/api/online';

// eslint-disable-next-line
export async function createGameRoom(playerName: string) {
  const response = await fetch(`${url}/createGameRoom?playerName=${playerName}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as string;
}

// eslint-disable-next-line
export async function joinGameRoom(roomId: string, playerName: string) {
  const response = await fetch(`${url}/joinGameRoom?id=${roomId}&playerName=${playerName}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as string;
}

// eslint-disable-next-line
export async function getAllPlayers(roomId: string) {
  const response = await fetch(`${url}/getAllPlayers?id=${roomId}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as IOnlinePlayer[];
}

export interface IOnlinePlayer {
  id: string;
  name: string;
  isHost: boolean;
  gameRoomId: string;
}