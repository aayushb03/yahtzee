'use client';

import {useEffect, useState} from "react";
import {IOnlinePlayer, createGameRoom, getAllPlayers, joinGameRoom} from "@/services/onlineGameService";
import OnlinePlayerList from "@/app/components/onlinePlayerList";
import { useUser } from '@/services/userContext';

export const OnlineCard = () => {
  const [gameIdInput, setGameIdInput] = useState<string>("");
  const [gameJoined, setGameJoined] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [players, setPlayers] = useState<IOnlinePlayer[]>([]);
  const [gameRoomId, setGameRoomId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { user } = useUser(); 

  /**
   * Sets the player name to the user's username if it exists.
   */
  useEffect(() => {
    if (user && user.username) {
      setPlayerName(user.username);
    }
  }, [user]);

  /**
   * Gets all players in the game room when the game is joined.
   */
  useEffect(() => {
    if (gameJoined) {
      getAllPlayers(gameRoomId).then((players) => {
        setPlayers(players);
        console.log(players);
      }).catch((error) => {
        console.error("Error getting players", error);
      })
    }
  }, [gameJoined]);

  /**
   * Creates a game room with the player's name.
   */
  const createGame = () => {
    if (playerName.trim() == "") {
      setError("Please enter your name")
      return;
    }
    createGameRoom(playerName).then((ids ) => {
      setGameRoomId(ids.roomId);
      setGameJoined(true);
      setIsHost(true);
    }).catch(() => {
      setError("Error creating game room");
    })
  }

  /**
   * Adds new players to the list of players.
   * @param newPlayer
   */
  const addPlayers = (newPlayer: IOnlinePlayer[]) => {
    setPlayers((players) => {
      return [...players, ...newPlayer];
    });
    console.log("Players", [...players, ...newPlayer]);
  }

  /**
   * Joins a game room with the given game ID and player name.
   */
  const joinGame = () => {
    if (gameIdInput.trim() == "" || playerName.trim() == "") {
      setError("Please enter your name and game ID")
      return;
    }
    joinGameRoom(gameIdInput, playerName).then((ids) => {
      setGameRoomId(ids.roomId);
      setGameJoined(true);
      setIsHost(false);
    }).catch(() => {
      setError("Game room does not exist or is full");
    })
  }

  /**
   * Toggles the ready status of the player.
   */
  const toggleReadyStatus = () => {
    setIsReady(!isReady);
  };

  return (
    <div className={"flex flex-col h-full w-full"}>
      {!gameJoined && <div className={"flex flex-col h-full w-full items-center justify-center gap-2"}>
        {/* <input
          className={`border-b-[1px] text-xl ${playerName.trim() == "" ? "border-app-red" : "border-app-gray"} outline-0 text-center w-40 bg-transparent`}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder={"Your Name"}
        /> */}
        <div className={`text-xl font-bold ${playerName.trim() === "" ? "text-red-500" : "text-gray-800"} text-center w-40 mb-4`}>
          {playerName || "Your Name"}
        </div>
        <input
          className={`border-b-[1px] text-xl ${gameIdInput.trim() == "" ? "border-app-red" : "border-app-gray"} outline-0 text-center w-40 bg-transparent`}
          value={gameIdInput}
          onChange={(e) => setGameIdInput(e.target.value)}
          placeholder={"Enter Game ID"}
        />
        <div className="flex justify-center items-center mt-10"> 
          <button
            className="bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-40 border transition hover:scale-105 shadow"
            onClick={createGame}>
            CREATE A GAME
          </button>
          <button
            className={`bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-40 border transition hover:scale-105 shadow ${gameIdInput.trim() === "" ? 'bg-gray-300 text-gray-500' : ''}`}
            onClick={joinGame}
            disabled={gameIdInput.trim() === ""}>
            JOIN A GAME
          </button>
        </div>
        <div className={"text-xs text-app-red"}>
          {error}
        </div>
      </div>}
      {gameJoined &&
        <div className={"flex flex-col w-full h-full items-center justify-between"}>
          <div className={"flex flex-col items-center w-full"}>
            <div className="text-xl font-bold">
              {gameRoomId}
            </div>
            <div className={"text-xl"}>
              Players:
            </div>
            {gameRoomId!="" &&
              <OnlinePlayerList initialPlayers={players} gameRoomId={gameRoomId} addPlayers={addPlayers}/>
            }
          </div>
          <div className={`flex justify-center items-center`}>
            {isHost ? (
              <button className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-40 border transition hover:scale-105 shadow">
                START GAME
              </button>
            ) : (
              <button
                className={`text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-40 border transition hover:scale-105 shadow ${!isReady ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={toggleReadyStatus}
              >
                {isReady ? "UNREADY" : "READY"}
              </button>
            )}
            <button className="bg-app-red text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-40 border transition hover:scale-105 shadow">
              QUIT
            </button>
          </div>
        </div>
      }
    </div>
  );
}