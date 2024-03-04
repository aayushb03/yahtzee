'use client';
import {useState} from "react";
import {GameMode as GM} from "@/models/enums";

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
  const removePlayer = () => {
    if (numPlayers <= 1) return;
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
      <div className={"flex flex-col p-2 w-96 rounded-xl bg-white text-black"}>
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
        <div className={"flex flex-col h-48 items-center w-full py-2"}>
          {gameMode == GM.Local && <>
            {[...Array(numPlayers)].map((_, i) => {
              const playerNum = i + 1;
              return (
                <div key={i}>
                  <div className="flex justify-center items-center h-8 w-full gap-4">
                    <div className={"text-base font-semibold"}>
                      Player {playerNum}:
                    </div>
                    <input className={`border-b-[1px] ${players[i].trim() == "" ? "border-red-500" : "border-gray-400"} outline-0 text-center w-32`}
                      defaultValue={players[i]}
                      onChange={(e) => onPlayerChange(i, e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
            <div className={"flex justify-center items-center h-8 mt-2"}>
              {numPlayers != 4 &&
                    <button
                      className={"bg-green-200 rounded mx-1 w-24 border border-green-500 transition hover:scale-105"}
                      onClick={addPlayer}>Add</button>
              }
              {numPlayers != 1 &&
                    <button className={"bg-red-200 rounded mx-1 w-24 border border-red-500 transition hover:scale-105"}
                      onClick={removePlayer}>Remove</button>
              }
            </div>
          </>}
          {gameMode == GM.Online && <>
              (Online game mode options)
          </>}
        </div>
        <div className={"flex justify-center items-center"}>
          <button
            className="bg-[#CC5D64] px-2 py-1 text-white rounded mx-1 w-32 border transition hover:scale-110" onClick={startGame}>
            Start Game!
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameModeCard;