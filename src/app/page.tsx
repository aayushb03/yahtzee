'use client';
import GameModeCard from './gameModeCard'
import YahtzeeGame from './yahtzeeGame'
import React, {useState} from "react";
import {GameStatus as GS} from "@/models/enums";

export default function Home() {
  const [gameStatus, setGameStatus] = useState<GS>(GS.AddPlayers)

  const startGame = (players : string[]) => {
    setGameStatus(GS.InProgress);
  }

  const changePlayers = () => {
    setGameStatus(GS.AddPlayers);
  }

  return (
    <div className="flex flex-col h-screen bg-[#CC5D64]" style={{ minWidth: '1162px' }}>
      <h1 className="text-6xl text-white my-4 w-full text-center">YAHTZEE</h1>
      {gameStatus == GS.AddPlayers &&  <GameModeCard startYahtzee={startGame}/>}
      {gameStatus == GS.InProgress && <YahtzeeGame changePlayers={changePlayers}/>}
    </div>
  );
}
