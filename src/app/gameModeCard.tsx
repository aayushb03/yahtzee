'use client';
import {useEffect, useState} from "react";
import {GameMode as GM} from "@/models/enums";
import { RxCross1 } from "react-icons/rx";
import {Player} from "@/models/player";
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

type GameModeCardProps = {
  currentPlayers: Player[];
  startYahtzee: (players: string[], numPlayers : number) => void;
}


// This is the game mode card that shows up BEFORE starting the game


const GameModeCard = ({ startYahtzee, currentPlayers } : GameModeCardProps) => {
    // keeps track of what is happening in the game
  const [gameMode, setGameMode] = useState<GM>(GM.Local)
    // keeps track of players names in a string [] (MAX 4)
  const [players, setPlayers] = useState<string[]>(["", "", "", ""])
    // keeps track of the number of players (MAX 4)
  const [numPlayers, setNumPlayers] = useState<number>(1)

  useEffect(() => {
    // when page is loaded, always going to declare the players names in the newPlayers [] and add to numPlayers
    const newPlayers = ["", "", "", ""]
    for (let i = 0; i < currentPlayers.length; i++) {
      if (i >= 4) break;
      newPlayers[i] = currentPlayers[i].name;
      setNumPlayers(i + 1);
    }
    setPlayers(newPlayers);
  }, []);


    // handles adding a player the card
  const addPlayer = () => {
    if (numPlayers >= 4) return;
    setNumPlayers(numPlayers + 1);
  }

    // handles removing a player fom card
  const removePlayer = (index: number) => {
    if (numPlayers <= 1) return;
    const newPlayers = players.slice(0, index).concat(players.slice(index + 1)).concat([""]);
    setPlayers(newPlayers);
    setNumPlayers(numPlayers - 1);
  }

    // handles clicking the 'change players' button 
  const onPlayerChange = (i: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[i] = value;
    setPlayers(newPlayers);
  }

    // starts the game with the current number of players
  const startGame = () => {
    for (let i = 0; i < numPlayers; i++) {
      if (players[i].trim() == "") {
        return;
      }
    }
    startYahtzee(players, numPlayers);
  }

  // the screen at the begining of the game before the game actually starts
  return (
    <div className={"flex h-full w-full justify-center items-center mb-40"}>
      <div className={"flex flex-col p-2 w-96 rounded-xl bg-white text-black shadow-2xl"}>
        <div className={"flex justify-around"}>

          {/* This is the div that holds the local and online buttons*/}
          <button className={`border-app-gray px-2 py-1 rounded mx-1 w-48 border transition hover:scale-105
          ${gameMode == GM.Local ? 'bg-app-gray text-white' : 'bg-white'}`}
          onClick={() => {
            setGameMode(GM.Local)
          }}>Local
          </button>
          <button className={`border-app-gray px-2 py-1 rounded mx-1 w-48 border transition hover:scale-105
          ${gameMode == GM.Online ? 'bg-app-gray text-white' : 'bg-white'}`}
          onClick={() => {
            setGameMode(GM.Online)
          }}>Online
          </button>
        </div>

        {/* this is div in the middle part of the gamecard with the player names if the game mode LOCAL is selected*/}
        <div className={`flex flex-col h-48 items-center w-full py-2 ${baloo2.className}`}>
          {gameMode == GM.Local && <div className={"pt-2"}>
            {[...Array(numPlayers)].map((_, i) => {
              const playerNum = i + 1;
              return (
                <div key={i}>
                  <div className="flex justify-center items-center h-8 w-full gap-4">
                    <label htmlFor={`playerInput-${i}`} className="text-xl">
                      Player {playerNum}:
                    </label>

                    {/* handles chagnging players by clicking the "x" button */}
                    <input className={`border-b-[1px] text-xl ${players[i].trim() == "" ? "border-app-red" : "border-app-gray"} outline-0 text-center w-32`}
                      id={`playerInput-${i}`}
                      value={players[i]}
                      onChange={(e) => onPlayerChange(i, e.target.value)}
                      maxLength={8}
                    />
                    <button data-testid={`remove-player-button-${i}`} className={"hover:text-app-red"} onClick={() => {removePlayer(i)}}><RxCross1/></button>
                  </div>
                </div>
              );
            })}

            {/* the add button below the player names  */}
            <div className={"flex justify-center items-center h-8 mt-2"}>
              {numPlayers != 4 &&
                    <button
                      className={"bg-app-light-gray text-white rounded mx-1 w-24 shadow-xl transition hover:scale-105"}
                      onClick={addPlayer}>Add</button>
              }
            </div>
          </div>}

          {/* handles if the game mode ONLINE is selected  */}
          {gameMode == GM.Online && <>
              (Online game mode options)
          </>}
        </div>


        {/* start of game button at the bottom */}
        <div className={`flex justify-center items-center ${baloo2.className}`}>
          <button
            className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow" onClick={startGame}>
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameModeCard;