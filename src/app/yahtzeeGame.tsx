'use client';
import React, { useEffect, useState } from 'react';
import Board from './components/board'
import DiceRow from "@/app/components/dice_row";
import { Dice } from "@/models/dice";
import { ScoreEvaluator } from "@/models/scoreEvaluator";
import { ScoreCategory } from "@/models/enums";
import {Player} from "@/models/player";
import {LocalPlayers} from "@/models/localPlayers";

type YahtzeeGameProps = {
  changePlayers: () => void;
  players: Player[];
}

const YahtzeeGame = ({changePlayers, players} : YahtzeeGameProps) => {
  const [dice, setDice] = useState(new Dice());
  // const [scores, setScores] = useState<Scorecard>(new Scorecard());
  const [scoreEval, setScoreEval] = useState<ScoreEvaluator>(new ScoreEvaluator(dice));
  const [rollsLeft, setRollsLeft] = useState(3);
  const [curPlayers, setCurPlayers] = useState<LocalPlayers>(new LocalPlayers([]));
  const [gameLoaded, setGameLoaded] = useState(false);

  /**
   * Resets the game to the initial state.
   */
  useEffect(() => {
    setDice(new Dice());
    // setScores(new Scorecard());
    setRollsLeft(3);
    setCurPlayers(new LocalPlayers([...players], true));
    setGameLoaded(true);
  }, []);

  /** 
   * Updates the score evaluator when the dice change.
   */
  useEffect(() => {
    setScoreEval(new ScoreEvaluator(dice));
  }, [dice]);

  /**
   * Rolls the dice.
   * @param selectedDice an array of ones and zeros to indicate which dice to roll.
   */
  const rollDice = (selectedDice? : number[]) => {
    if (rollsLeft > 0) {
      if (selectedDice) {
        const indices = [];
        for (let i = 0; i < selectedDice.length; i++) {
          if (selectedDice[i] == 0) {
            indices.push(i);
          }
        }
        dice.rollDiceByIndex(indices);
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
    setDice(new Dice());
    setRollsLeft(3);
    setCurPlayers(new LocalPlayers([...curPlayers.players], false, curPlayers.currentTurn));
  };

  /**
   * Resets the game to the initial state.
   */
  const resetGame = () => {
    setDice(new Dice());
    curPlayers.clearScores();
    setCurPlayers(new LocalPlayers([...players], true));
    setRollsLeft(3);
  };

  const changePlayersAndReset = () => {
    resetGame();
    changePlayers();
  }

  if (!gameLoaded) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center my-4">
        <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2 w-48 transition hover:scale-105" onClick={resetGame}>New Game</button>
        <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2 w-48 transition hover:scale-105" onClick={changePlayersAndReset}>Change Players</button>
      </div>

      <Board
        currentPlayers={curPlayers}
        onScoreSelect={handleScoreSelect}
        potentialScores={scoreEval}
        diceRolled={rollsLeft < 3}
      />

      <DiceRow dice={dice} rollDice={rollDice} diceRolled={rollsLeft<3} playerName={curPlayers.getCurrentPlayer().name} rollsLeft={rollsLeft} />
  </div>);
};

export default YahtzeeGame;