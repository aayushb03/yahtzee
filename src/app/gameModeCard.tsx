'use client';
import { useState } from "react";
import {GameMode as GM} from "@/models/enums";
import { RxCross1 } from "react-icons/rx";
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

type GameModeCardProps = {
  startYahtzee: (players: string[], numPlayers : number) => void;
}

const GameModeCard = ({ startYahtzee } : GameModeCardProps) => {
  const [gameMode, setGameMode] = useState<GM>(GM.Local)
  const [players, setPlayers] = useState<string[]>(["", "", "", ""])
  const [numPlayers, setNumPlayers] = useState<number>(1)

  const addPlayer = () => {
    if (numPlayers >= 4) return;
    setNumPlayers(numPlayers + 1);
  }
  const removePlayer = (index: number) => {
    if (numPlayers <= 1) return;
    const newPlayers = players.slice(0, index).concat(players.slice(index + 1)).concat([""]);
    setPlayers(newPlayers);
    setNumPlayers(numPlayers - 1);
  }
  const onPlayerChange = (i: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[i] = value;
    setPlayers(newPlayers);
  }
  const startGame = () => {
    for (let i = 0; i < numPlayers; i++) {
      if (players[i].trim() == "") {
        return;
      }
    }
    startYahtzee(players, numPlayers);
  }

  return (
    <div className={"flex h-full w-full justify-center items-center mb-40"}>
      <div className={"flex flex-col p-2 w-96 rounded-xl bg-white text-black shadow-2xl"}>
        <div className={"flex justify-around"}>
          <button className={`bg-[#555363] border-[#555363] px-2 py-1 rounded mx-1 w-48 border transition hover:scale-105
          ${gameMode == GM.Local ? 'bg-[#555363] text-white' : 'bg-white'}`}
          onClick={() => {
            setGameMode(GM.Local)
          }}>Local
          </button>
          <button className={`bg-[#555363] border-[#555363] px-2 py-1 rounded mx-1 w-48 border transition hover:scale-105
          ${gameMode == GM.Online ? 'bg-[#555363] text-white' : 'bg-white'}`}
          onClick={() => {
            setGameMode(GM.Online)
          }}>Online
          </button>
        </div>
        <div className={`flex flex-col h-48 items-center w-full py-2 ${baloo2.className}`}>
          {gameMode == GM.Local && <div className={"pt-2"}>
            {[...Array(numPlayers)].map((_, i) => {
              const playerNum = i + 1;
              return (
                <div key={i}>
                  <div className="flex justify-center items-center h-8 w-full gap-4">
                    <div className={"text-xl"}>
                      Player {playerNum}:
                    </div>
                    <input className={`border-b-[1px] text-xl ${players[i].trim() == "" ? "border-red-500" : "border-gray-400"} outline-0 text-center w-32`}
                      value={players[i]}
                      onChange={(e) => onPlayerChange(i, e.target.value)}
                    />
                    <button className={"hover:text-red-600"} onClick={() => {removePlayer(i)}}><RxCross1/></button>
                  </div>
                </div>
              );
            })}
            <div className={"flex justify-center items-center h-8 mt-2"}>
              {numPlayers != 4 &&
                    <button
                      className={"bg-[#879CB9] text-white rounded mx-1 w-24 shadow-xl transition hover:scale-105"}
                      onClick={addPlayer}>Add</button>
              }
            </div>
          </div>}
          {gameMode == GM.Online && <>
              (Online game mode options)
          </>}
        </div>
        <div className={`flex justify-center items-center ${baloo2.className}`}>
          <button
            className="bg-[#E8CC9D] text-[#555363] text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow" onClick={startGame}>
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameModeCard;