"use client"
import React, { useState } from 'react';
import Board from './components/board' 

// Define the Score type with the same naming convention as in Board.tsx
type Score = {
  Ones?: number;
  Twos?: number;
  Threes?: number;
  Fours?: number;
  Fives?: number;
  Sixes?: number;
  TopBonus?: number;
  TopTotal?: number;
  ThreeOfAKind?: number;
  FourOfAKind?: number;
  FullHouse?: number;
  SmallStraight?: number;
  LargeStraight?: number;
  Chance?: number;
  Yahtzee?: number;
  TotalScore?: number;
};

// Initialize the scores with camelCase keys that match the Score type
const initialScores: Score = {
  Ones: 0,
  Twos: 0,
  Threes: 0,
  Fours: 0,
  Fives: 0,
  Sixes: 0,
  TopBonus: 0,
  TopTotal: 0,
  ThreeOfAKind: 0,
  FourOfAKind: 0,
  FullHouse: 0,
  SmallStraight: 0,
  LargeStraight: 0,
  Chance: 0,
  Yahtzee: 0,
  TotalScore: 0,
};

const YahtzeeGame: React.FC<{}> = () => {
  const [dice, setDice] = useState([1, 2, 3, 4, 5]);
  const [scores, setScores] = useState<Score>(initialScores);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const rollDice = () => {
    if (rollsLeft > 0) {
      setDice(dice.map(() => Math.floor(Math.random() * 6) + 1));
      setRollsLeft(rollsLeft - 1);
    } else {
      alert('No rolls left');
    }
  };

  const resetGame = () => {
    setDice([1, 2, 3, 4, 5]);
    setScores(initialScores);
    setRollsLeft(3);
    setIsPlayerTurn(true); // Resets to player's turn on a new game
  };

  const scoreRoll = (category: keyof Score) => {
    console.log(`Scored category ${category}`);
    setScores({ ...scores, [category]: scores[category]! + 1 }); // Increment score as an example
  };

  // Function to render dice with a conditional Roll button next to it
  const renderDiceRow = (playerTurn: boolean, playerName: string) => (
    <div className="flex justify-center items-center my-4">
      {/* <div className="text-4xl text-white mr-4">YOU</div> */}
      <div className="text-4xl text-white mr-4">{playerName}</div>
      {dice.map((die, index) => (
        <div key={index} className="p-4 mx-1 rounded-full bg-white text-2xl">
          {die}
        </div>
      ))}
      {playerTurn && (
        <button
          className="bg-[#E8CC9D] text-white px-4 py-2 rounded mx-2"
          onClick={rollDice}
        >
          {/* Roll ({rollsLeft}) */}
          ROLL
        </button>
      )}
    </div>
  );

  const handleScoreSelect = (category: keyof Score, score: number) => {
    // Update the scores state with the new score for the selected category
    setScores((prevScores) => ({
      ...prevScores,
      [category]: score
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-[#CC5D64]" style={{ minWidth: '1162px' }}>
      <div className="flex flex-col items-center">
        <h1 className="text-6xl text-white my-4">YAHTZEE</h1>

        <div className="flex justify-center my-4">
          <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2">New Game</button>
          <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2">Single Player</button>
          <button className="bg-[#555363] text-white px-4 py-2 rounded mx-2">Multi Player</button>
        </div>

        {renderDiceRow(true, 'BILL')}

        <Board
          diceRolls={dice}
          currentScores={{ you: scores, bill: {} }} // Pass scores for 'you' and an empty object for 'bill'
          onScoreSelect={(category, score) => handleScoreSelect(category as keyof Score, score)}
        />

      {isPlayerTurn && renderDiceRow(isPlayerTurn, 'YOU')}

      {!isPlayerTurn && (
        <div className="flex justify-center my-8">
          <button
            className="bg-[#E8CC9D] text-white px-4 py-2 rounded mx-2"
            onClick={rollDice}
          >
            {/* Roll ({rollsLeft}) */}
            ROLL
          </button>
        </div>
      )}
    </div>
  </div>
);
};

export default YahtzeeGame;