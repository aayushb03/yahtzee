'use client';
import React, { useEffect, useState } from 'react';
import Board from './components/board'
import DiceRow from "@/app/components/dice_row";
import { Dice } from "@/models/dice";
import { ScoreEvaluator } from "@/models/scoreEvaluator";
import { ScoreCategory } from "@/models/enums";
import { Player } from "@/models/player";
import {LocalPlayers} from "@/models/localPlayers";
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

type YahtzeeGameProps = {
  changePlayers: () => void;
  endGame: () => void;
  players: Player[];
}

const YahtzeeGame = ({changePlayers, players, endGame} : YahtzeeGameProps) => {
  const [dice, setDice] = useState(new Dice());
  const [scoreEval, setScoreEval] = useState<ScoreEvaluator>(new ScoreEvaluator(dice));
  const [rollsLeft, setRollsLeft] = useState(3);
  const [curPlayers, setCurPlayers] = useState<LocalPlayers>(new LocalPlayers([]));
  const [gameLoaded, setGameLoaded] = useState(false);

  /**
   * Resets the game to the initial state.
   */
  useEffect(() => {
    // setScores(new Scorecard());
    setRollsLeft(3);
    setCurPlayers(new LocalPlayers([...players], true));
    setGameLoaded(true);
  }, []);

  /** 
   * Updates the score evaluator when the dice change.
   */
  useEffect(() => {
    let newScoreEval = new ScoreEvaluator(dice)
    setScoreEval(newScoreEval);
  }, [dice]);

  useEffect(() => {
    if (curPlayers.players.length == 0) return;
    if (curPlayers.getCurrentPlayer().ai) {
      aiTurn(curPlayers.getCurrentPlayer())
    }
  }, [curPlayers]);

  /**
   * Rolls the dice.
   * @param selectedDice an array of ones and zeros to indicate which dice to roll.
   */
  const rollDice = (selectedDice? : number[]) => {
    if (rollsLeft > 0) {
      if (selectedDice) {
        dice.rollDiceByIndex(selectedDice);
      } else {
        dice.rollDice();
      }
      setDice(new Dice(dice));
      setRollsLeft(rollsLeft - 1);
    } else {
      // alert('No rolls left, please choose a score category.');
    }
  };

  /**
   * Handles the selection of a score category.
   * @param category 
   * @param score 
   */
  const handleScoreSelect = (category: ScoreCategory, score: number) => {
    curPlayers.getCurrentPlayer().scorecard.addScore(category, score);
    curPlayers.nextTurn();
    setRollsLeft(3);
    setCurPlayers(new LocalPlayers([...curPlayers.players], false, curPlayers.currentTurn, curPlayers.overallTurn));
    if (curPlayers.getIsGameOver()) {
      endGame();
    }
  };

  /**
   * Autofills scores in dev mode in order to view final score card quicker.
   */
  const handleAutofill = () => {
    curPlayers.players.forEach(player => {
      player.scorecard.setTotalScore(0);
    })

    endGame();
  }

  /**
   * Resets the game to the initial state.
   */
  const resetGame = () => {
    curPlayers.clearScores();
    setCurPlayers(new LocalPlayers([...players], true));
    setRollsLeft(3);
  };

  /**
   * Resets the game and sends user back to change players screen
   */
  const changePlayersAndReset = () => {
    resetGame();
    changePlayers();
  }

  const aiTurn = (ai : Player) => {
    setTimeout(() => {
      rollDice();
    }, 1000);
  }

  if (!gameLoaded) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`flex justify-center my-4 ${baloo2.className}`}>
        <button className="bg-app-gray text-xl text-white px-2 py-1 rounded mx-2 w-48 transition hover:scale-105 shadow-2xl" onClick={resetGame}>New Game</button>
        <button className="bg-app-gray text-xl text-white px-2 py-1 rounded mx-2 w-48 transition hover:scale-105 shadow-2xl" onClick={changePlayersAndReset}>Change Players</button>
        <button className="bg-app-gray text-xl text-white px-2 py-1 rounded mx-2 w-48 transition hover:scale-105 shadow-2xl" onClick={handleAutofill}>Autofill Scores</button>
      </div>

      <div className={baloo2.className}>
        <Board
          currentPlayers={curPlayers}
          onScoreSelect={handleScoreSelect}
          potentialScores={scoreEval}
          diceRolled={rollsLeft < 3}
        />
      </div>

      <DiceRow dice={dice} rollDice={rollDice} diceRolled={rollsLeft<3} playerName={curPlayers.getCurrentPlayer().name} rollsLeft={rollsLeft} />
  </div>);
};

export default YahtzeeGame;