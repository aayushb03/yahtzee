"use server";

import {pusherServer} from "@/services/pusher/pusherServer";

const url = `${process.env.BASE_URL}/api/online`;

/**
 * Creates a game room with the player's name.
 * @param playerName 
 * @returns IRoomAndPlayerIds
 */
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

/**
 * Joins a game room with the player's name.
 * @param roomId 
 * @param playerName 
 * @returns IRoomAndPlayerIds
 */
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

/**
 * Gets all players in the game room.
 * @param roomId 
 * @returns IOnlinePlayer[]
 */
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

/**
 *  Removes a player from the game room.
 * @param roomId 
 * @param playerId 
 * @returns IRoomAndPlayerIds
 */
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

/**
 * Ends the game.
 * @param roomId 
 * @returns IRoomAndPlayerIds
 */ 
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

/**
 * Starts the game.
 * @param roomId 
 */
// eslint-disable-next-line
export async function startGame(roomId: string) {
  await pusherServer.trigger(roomId, "game-started", {});
}

/**
 * Sends the selectdice roll to the game room.
 * @param roomId
 * @param selectedDice
 */
// eslint-disable-next-line
export async function sendSelectDice(roomId: string, selectedDice: number[]) {
  await pusherServer.trigger(roomId, "dice-selected", selectedDice);
}

/**
 * Sends the dice roll to the game room.
 * @param roomId
 * @param diceAndRolls
 */
// eslint-disable-next-line
export async function sendDiceRoll(roomId: string, diceAndRolls: [number[], number]) {
  await pusherServer.trigger(roomId, "dice-rolled", diceAndRolls);
}

/**
 * Toggles the player's readiness.
 * @param roomId 
 * @param playerId 
 * @returns IOnlinePlayer
 */
// eslint-disable-next-line
export async function togglePlayerReadiness(roomId: string, playerId: number) {
  const response = await fetch(`${url}/toggleReady?id=${roomId}&playerId=${playerId}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error("Error: " + response.status);
  }

  return await response.json() as IOnlinePlayer;
}

/**
 * Sends the selected score to the game room.
 * @param roomId 
 * @param scoreCategoryAndYahtzee 
 */
// eslint-disable-next-line
export async function sendAddScore(roomId: string, scoreCategoryAndYahtzee: [number, string, number]) {
  await pusherServer.trigger(roomId, "score-added", scoreCategoryAndYahtzee);
}

/**
 * Sends the end game to the game room.
 * @param roomId 
 */
// eslint-disable-next-line
export async function sendEndGame(roomId: string) {
  await pusherServer.trigger(roomId, "ended-game", {});
}

/**
  * The online player interface.
 */
export interface IOnlinePlayer {
  id: number;
  name: string;
  isHost: boolean;
  gameRoomId: string;
  isReady: boolean;
}

/**
 * The room and player IDs interface.
 */
export interface IRoomAndPlayerIds {
  roomId: string;
  playerId: number;
}