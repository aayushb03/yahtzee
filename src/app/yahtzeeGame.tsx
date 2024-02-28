'use client';
import React, {useEffect, useState} from 'react';
import Board from './components/board'
import { Dice } from "@/models/dice";
import DiceRow from "@/app/components/dice-row";
import {Scorecard} from "@/models/scorecard";
import {ScoreEvaluator} from "@/models/scoreEvaluator";
import {ScoreCategory} from "@/models/enums";
import {number} from "prop-types";

// Define the Score type with the same naming convention as in Board.tsx
// type Score = {
//   Ones?: number;
//   Twos?: number;
//   Threes?: number;
//   Fours?: number;
//   Fives?: number;
//   Sixes?: number;
//   TopBonus?: number;
//   TopTotal?: number;
//   ThreeOfAKind?: number;
//   FourOfAKind?: number;
//   FullHouse?: number;
//   SmallStraight?: number;
//   LargeStraight?: number;
//   Chance?: number;
//   Yahtzee?: number;
//   TotalScore?: number;
// };
//
// // Initialize the scores with camelCase keys that match the Score type
// const initialScores: Score = {
//   Ones: 0,
//   Twos: 0,
//   Threes: 0,
//   Fours: 0,
//   Fives: 0,
//   Sixes: 0,
//   TopBonus: 0,
//   TopTotal: 0,
//   ThreeOfAKind: 0,
//   FourOfAKind: 0,
//   FullHouse: 0,
//   SmallStraight: 0,
//   LargeStraight: 0,
//   Chance: 0,
//   Yahtzee: 0,
//   TotalScore: 0,
// };

const YahtzeeGame = () => {
  const [dice, setDice] = useState(new Dice());
  const [scores, setScores] = useState<Scorecard>(new Scorecard());
  const [scoreEval, setScoreEval] = useState<ScoreEvaluator>(new ScoreEvaluator(dice));
  const [rollsLeft, setRollsLeft] = useState(3);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  useEffect(() => {
    setDice(new Dice());
    setScores(new Scorecard());
  }, []);

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
      alert('No rolls left, please choose a score category.');
    }
  };

  const handleScoreSelect = (category: ScoreCategory, score: number) => {
    scores.addScore(category, score);
    setScores(new Scorecard(scores));
    setDice(new Dice());
    setRollsLeft(3);
  };

  const resetGame = () => {
    setDice(new Dice());
    setScores(new Scorecard());
    setRollsLeft(3);
    setIsPlayerTurn(true); // Resets to player's turn on a new game
  };

  // const scoreRoll = (category: keyof Score) => {
  //   console.log(`Scored category ${category}`);
  //   setScores({ ...scores, [category]: scores[category]! + 1 }); // Increment score as an example
  // };

  // // Function to render dice with a conditional Roll button next to it
  // const renderDiceRow = (playerTurn: boolean, playerName: string) => (
  //   <div className="flex justify-center items-center my-4">
  //     {/* <div className="text-4xl text-white mr-4">YOU</div> */}
  //     <div className="text-4xl text-white mr-4">{playerName}</div>
  //     {dice && dice.dice.map((die, index) => (
  //       <div key={index} className="p-4 mx-1 rounded-full bg-white text-2xl">
  //         {die}
  //       </div>
  //     ))}
  //     {playerTurn && (
  //       <button
  //         className="bg-[#E8CC9D] text-white px-4 py-2 rounded mx-2"
  //         onClick={rollDice}
  //       >
  //         {/* Roll ({rollsLeft}) */}
  //         ROLL
  //       </button>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex flex-col h-screen bg-[#CC5D64]" style={{ minWidth: '1162px' }}>
      <div className="flex flex-col items-center">
        <h1 className="text-6xl text-white my-4">YAHTZEE</h1>

        <div className="flex justify-center my-4">
          <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2" onClick={resetGame}>New Game</button>
          <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2">Single Player</button>
          <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2">Multi Player</button>
        </div>

        {/*{renderDiceRow(true, 'BILL')}*/}
        {/*<DiceRow dice={dice} rollDice={rollDice} diceRolled={rollsLeft<3} playerName={"BILL"} playerTurn={true}></DiceRow>*/}

        <Board
          currentScores={scores} // Pass scores for 'you' and an empty object for 'bill'
          onScoreSelect={handleScoreSelect}
          potentialScores={scoreEval}
          diceRolled={rollsLeft < 3}
        />

        {/*{isPlayerTurn && renderDiceRow(isPlayerTurn, 'YOU')}*/}
        <DiceRow dice={dice} rollDice={rollDice} diceRolled={rollsLeft<3} playerName={"YOU"} playerTurn={true}></DiceRow>

        {/*{!isPlayerTurn && (*/}
        {/*<div className="flex justify-center my-8">*/}
        {/*  <button*/}
        {/*    className="bg-[#E8CC9D] text-white px-4 py-2 rounded mx-2"*/}
        {/*    onClick={rollDice}*/}
        {/*  >*/}
        {/*    /!* Roll ({rollsLeft}) *!/*/}
        {/*    ROLL*/}
        {/*  </button>*/}
        {/*</div>*/}
        {/*)}*/}
    </div>
  </div>
);
};

export default YahtzeeGame;