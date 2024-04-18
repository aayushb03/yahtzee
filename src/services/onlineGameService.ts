"use server";

import {pusherServer} from "@/services/pusher/pusherServer";

const url = 'http://localhost:3000/api/online';

// eslint-disable-next-line
export async function createGameRoom(playerName: string) {
  const response = await fetch(`${url}/createGameRoom?playerName=${playerName}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as IRoomAndPlayerIds;
}

// eslint-disable-next-line
export async function joinGameRoom(roomId: string, playerName: string) {
  const response = await fetch(`${url}/joinGameRoom?id=${roomId}&playerName=${playerName}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as IRoomAndPlayerIds;
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

// eslint-disable-next-line
export async function removePlayer(roomId: string, playerId: number) {
  const response = await fetch(`${url}/removePlayer?id=${roomId}&playerId=${playerId}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as IRoomAndPlayerIds;
}

// eslint-disable-next-line
export async function endGame(roomId: string) {
  const response = await fetch(`${url}/endGame?id=${roomId}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as IRoomAndPlayerIds;
}

// eslint-disable-next-line
export async function startGame(roomId: string) {
  await pusherServer.trigger(roomId, "game-started", {});
}

// eslint-disable-next-line
export async function sendSelectDice(roomId: string, selectedDice: number[]) {
  await pusherServer.trigger(roomId, "dice-selected", selectedDice);
}

// eslint-disable-next-line
export async function sendDiceRoll(roomId: string, diceAndRolls: [number[], number]) {
  await pusherServer.trigger(roomId, "dice-rolled", diceAndRolls);
}

// eslint-disable-next-line
export async function updatePlayerReadiness(playerId: number, isReady: boolean, roomId: string) {
  try {
    await pusherServer.trigger(roomId, "player-ready", {playerId, isReady});
  } catch (error) {
    console.error("Failed to trigger player readiness update", error);
    throw error; 
  }
}

export interface IOnlinePlayer {
  id: number;
  name: string;
  isHost: boolean;
  gameRoomId: string;
  isReady: boolean;
}

export interface IRoomAndPlayerIds {
  roomId: string;
  playerId: number;
}