'use client';

import {Baloo_2} from "next/font/google";
import {useEffect, useState} from "react";
import {IOnlinePlayer, createGameRoom, getAllPlayers, joinGameRoom} from "@/services/onlineGameService";
import {pusherClient} from "@/services/pusher/pusherClient";
import OnlinePlayerList from "@/app/components/onlinePlayerList";
const baloo2 = Baloo_2({subsets: ["latin"]});

export const OnlineCard = () => {
  const [gameId, setGameId] = useState<string>("");
  const [gameJoined, setGameJoined] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [players, setPlayers] = useState<IOnlinePlayer[]>([]);
  const [gameRoomId, setGameRoomId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

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

  const createGame = () => {
    if (playerName.trim() == "") {
      setError("Please enter your name")
      return;
    }
    createGameRoom(playerName).then((gameId ) => {
      setGameRoomId(gameId);
      setGameJoined(true);
      setIsHost(true);
    }).catch(() => {
      setError("Error creating game room");
    })
  }

  const addPlayers = (newPlayer: IOnlinePlayer[]) => {
    setPlayers((players) => {
      return [...players, ...newPlayer];
    });
    console.log("Players", [...players, ...newPlayer]);
  }

  const joinGame = () => {
    if (gameId.trim() == "" || playerName.trim() == "") {
      setError("Please enter your name and game ID")
      return;
    }
    joinGameRoom(gameId, playerName).then((gameId) => {
      setGameRoomId(gameId);
      setGameJoined(true);
      setIsHost(false);
    }).catch(() => {
      setError("Game room does not exist or is full");
    })
  }

  const toggleReadyStatus = () => {
    setIsReady(!isReady);
  };

  return (
    <div className={"flex flex-col h-full w-full"}>
      {!gameJoined && <div className={"flex flex-col h-full w-full items-center justify-center gap-2"}>
        <input
          className={`border-b-[1px] text-xl ${playerName.trim() == "" ? "border-app-red" : "border-app-gray"} outline-0 text-center w-40 bg-transparent`}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder={"Your Name"}
        />
        <button
          className="bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"
          onClick={createGame}>
          CREATE A GAME ROOM
        </button>
        <div className="text-xl">OR</div>
        <input
          className={`border-b-[1px] text-xl ${gameId.trim() == "" ? "border-app-red" : "border-app-gray"} outline-0 text-center w-40 bg-transparent`}
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder={"Enter Game ID"}
        />
        <button
          className="bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"
          onClick={joinGame}>
          JOIN A GAME ROOM
        </button>
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