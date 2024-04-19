'use client';
import GameModeCard from './gameModeCard'
import YahtzeeGame from './yahtzeeGame'
import React, {useEffect, useState} from "react";
import {GameStatus as GS, ScoreCategory as SC} from "@/models/enums";
import {Player} from "@/models/player";
import {addScore} from "@/services/scoreService";
import EndPageCard from './endPageCard';
import Nav from "@/app/components/nav";
import { useUser } from '@/services/userContext';
import {getSession} from "next-auth/react";
import {addLocalGame, addOnlineGame} from "@/services/gameService";
import {getAllPlayers} from "@/services/onlineGameService";
import {pusherClient} from "@/services/pusher/pusherClient";

/**
 * Page that controls the navigation as well as starting/stopping/adding players to game. Edits the gameStatus to do so.
 * @returns navigating to screen depending on what player selects
 */
export default function Home() {
  const [gameStatus, setGameStatus] = useState<GS>(GS.AddPlayers);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameRoomId, setGameRoomId] = useState<string>("");
  const { user, setUser } = useUser();

  useEffect(() => {
    getSession().then((session) => {
      if (session && session.user && session.user.name && session.user.email) {
        setUser({ email: session.user.email, username: session.user.name });
      }
    });
  }, []);

  /**
   * Starts the game with the given players and number of players.
   * @param playerNames
   * @param numPlayers
   */
  const startGame = (playerNames : string[], numPlayers : number) => {
    const newPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      if (playerNames[i].includes(" (AI)")) {
        newPlayers.push(new Player(playerNames[i], true));
      } else {
        newPlayers.push(new Player(playerNames[i]));
      }
    }
    setPlayers(newPlayers);
    setGameStatus(GS.InProgress);
  }

  const startOnlineGame = (gameId : string, curPlayerId : number) => {
    getAllPlayers(gameId).then((players) => {
      const newPlayers = [];
      for (let i = 0; i < players.length; i++) {
        newPlayers.push(new Player(players[i].name, false, players[i].id != curPlayerId, players[i].id));
      }
      setGameRoomId(gameId);
      setPlayers(newPlayers);
      setGameStatus(GS.InProgress);
    }).catch(() => {
      console.error("Error getting players");
    });
  }

  /**
   * sets the game status to EndGame
   * then adds the total score of each player to their scorecard if not AI player
   */
  const endGame = async (onlineScores? : Player[]) => {
    if (gameRoomId != "" && onlineScores) {
      const player = onlineScores.find(player => !player.online);
      if(player){
        const score = player.scorecard.totalScore;
        const yahtzees = (player.scorecard.scores[SC.Yahtzee] == 50 ? 1 : 0) + ((player.scorecard.yahtzeeBonus) / 100);
        const isWin = player?.scorecard.totalScore == Math.max(...onlineScores.map(player => player.scorecard.totalScore));
        await addOnlineGame(gameRoomId, player.name, score, yahtzees, isWin, user?.email).catch(() => {});
        const playerName = user?.username ? user.username : `${player.name} (Guest)`;
        await addScore(playerName, player.scorecard.totalScore).catch(() => {});
        setPlayers(onlineScores);
        setGameStatus(GS.EndGame);
        pusherClient.unsubscribe(gameRoomId);
      }
    } else {
      for (const player of players) {
        if(!player.ai){
          const score = player.scorecard.totalScore;
          const yahtzees = (player.scorecard.scores[SC.Yahtzee] == 50 ? 1 : 0) + ((player.scorecard.yahtzeeBonus) / 100);
          await addLocalGame(player.name, score, yahtzees, user?.email).catch(() => {});
          const playerName = user?.username ? user.username : `${player.name} (Guest)`;
          await addScore(playerName, player.scorecard.totalScore).catch(() => {});
        }
      }
      setGameStatus(GS.EndGame);
    }
  }

  /**
   * Changes the players in the game.
   */
  const changePlayers = () => {
    setGameStatus(GS.AddPlayers);
  }

  /**
   * Restarts the game.
   */
  const restartGame = () => {
    setPlayers([]);
    setGameStatus(GS.AddPlayers);
  }

  return (
    <div className="flex flex-col h-screen bg-app-red" style={{ minWidth: '1162px' }}>
      <Nav setGameStatus={setGameStatus}/>
      {gameStatus == GS.AddPlayers &&  <GameModeCard startYahtzee={startGame} startOnlineYahtzee={startOnlineGame} currentPlayers={players}/>}
      {gameStatus == GS.InProgress && <YahtzeeGame changePlayers={changePlayers} players={players} endGame={endGame} gameRoomId={gameRoomId}/>}
      {gameStatus === GS.EndGame && <EndPageCard players={players} onRestart={restartGame} />}
    </div>
  );
} 