'use client';
import GameModeCard from './gameModeCard'
import YahtzeeGame from './yahtzeeGame'
import React, {useState} from "react";
import {GameStatus as GS} from "@/models/enums";
import {Player} from "@/models/player";

export default function Home() {
  const [gameStatus, setGameStatus] = useState<GS>(GS.AddPlayers);
  const [players, setPlayers] = useState<Player[]>([]);

  /**
   * Starts the game with the given players and number of players.
   * @param playerNames
   * @param numPlayers
   */
  const startGame = (playerNames : string[], numPlayers : number) => {
    let newPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      newPlayers.push(new Player(playerNames[i]));
    }
    setPlayers(newPlayers);
    setGameStatus(GS.InProgress);
  }

  /**
   * Changes the players in the game.
   */
  const changePlayers = () => {
    setGameStatus(GS.AddPlayers);
  }

  return (
    <div className="flex flex-col h-screen bg-app-red" style={{ minWidth: '1162px' }}>
      <h1 className="text-6xl text-white my-4 w-full text-center [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]">YAHTZEE</h1>
      {gameStatus == GS.AddPlayers &&  <GameModeCard startYahtzee={startGame}/>}
      {gameStatus == GS.InProgress && <YahtzeeGame changePlayers={changePlayers} players={players}/>}
    </div>
  );
}
