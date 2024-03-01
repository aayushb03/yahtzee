'use client';
import React, { useEffect, useState } from 'react';
import Board from './components/board'
import DiceRow from "@/app/components/dice_row";
import { Dice } from "@/models/dice";
import { Scorecard } from "@/models/scorecard";
import { ScoreEvaluator } from "@/models/scoreEvaluator";
import { ScoreCategory } from "@/models/enums";

type YahtzeeGameProps = {
  changePlayers: () => void;
}

const YahtzeeGame = ({changePlayers} : YahtzeeGameProps) => {
  const [dice, setDice] = useState(new Dice());
  const [scores, setScores] = useState<Scorecard>(new Scorecard());
  const [scoreEval, setScoreEval] = useState<ScoreEvaluator>(new ScoreEvaluator(dice));
  const [rollsLeft, setRollsLeft] = useState(3);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  /**
   * Resets the game to the initial state.
   */
  useEffect(() => {
    setDice(new Dice());
    setScores(new Scorecard());
  }, []);

  /** 
   * Updates the score evaluator when the dice change.
   */
  useEffect(() => {
    setScoreEval(new ScoreEvaluator(dice));
  }, [dice]);

  const rollDice = (selectedDice? : number[]) => {
    if (rollsLeft > 0) {
      if (selectedDice) {
        let indices = [];
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
    scores.addScore(category, score);
    setScores(new Scorecard(scores));
    setDice(new Dice());
    setRollsLeft(3);
  };

  /**
   * Resets the game to the initial state.
   */
  const resetGame = () => {
    setDice(new Dice());
    setScores(new Scorecard());
    setRollsLeft(3);
    setIsPlayerTurn(true);
  };

  const changePlayersAndReset = () => {
    resetGame();
    changePlayers();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center my-4">
        <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2 w-48 transition hover:scale-105" onClick={resetGame}>New Game</button>
        <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2 w-48 transition hover:scale-105" onClick={changePlayersAndReset}>Change Players</button>
      </div>

      <Board
        currentScores={scores}
        onScoreSelect={handleScoreSelect}
        potentialScores={scoreEval}
        diceRolled={rollsLeft < 3}
      />

      <DiceRow dice={dice} rollDice={rollDice} diceRolled={rollsLeft<3} playerName={"YOU"} playerTurn={true} rollsLeft={rollsLeft} />
  </div>);
};

export default YahtzeeGame;