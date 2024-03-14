import {Dice} from "@/models/dice";
import React, {useEffect, useState} from "react";

type DiceRowProps = {
  dice: Dice; // enum that returns 5 randomly generated numbers
  rollDice: (selectedDice: number[]) => void; // generates the numbers for each of the dice
  diceRolled: boolean; // if the dice have been rolled or not
  playerName: string; // player who's turn it is 
  rollsLeft?: number; // the rolls left in the turn 
}

const DiceRow = ({ dice, rollDice, diceRolled, playerName, rollsLeft = 3 }: DiceRowProps) => {
  const [diceArr, setDiceArr] = useState([0, 0, 0, 0, 0]); // keeps track of each dice value
  const [selectedDice, setSelectedDice] = useState([0, 0, 0, 0, 0]); // keeps track of dice to freeze

  useEffect(() => {
    setDiceArr([...dice.dice]);
  }, [dice]);

  // at the beegining of each turn, the dice are all set to 0
  useEffect(() => {
    setSelectedDice([0, 0, 0, 0, 0]);
  }, [diceRolled]);

  // handles the device being clicked, if it is, the number of the dye stays the same even after rolling
  const handleDiceClick = (index: number) => {
    if (!diceRolled) return;
    const newSelectedDice = [...selectedDice];
    newSelectedDice[index] = newSelectedDice[index] == 0 ? 1 : 0;
    setSelectedDice(newSelectedDice);
  }

  // the progress bar visually shows the players have 3 rolls, each time "Roll" is selected, the progress bar goes down 1/3
  type VerticalProgressBarProps = {
    rollsLeft: number;
  };
  
  /* vertical progress bar for rolls left */
  const VerticalProgressBar = ({ rollsLeft }: VerticalProgressBarProps) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column-reverse', 
      height: '60px',
      width: '20px',
      marginLeft: '10px',
      marginRight: '10px',
      border: '1px solid #879CB9',
      borderRadius: '5px', 
      overflow: 'hidden' 
    }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} style={{
          height: '20px',
          backgroundColor: index < rollsLeft ? '#879CB9' : 'transparent',
          transition: 'background-color 0.3s ease'
        }} />
      ))}
    </div>
  );
  
  
  return (
    <div className="flex justify-center items-center my-4 relative" style={{ marginLeft: '50px' }}>
      {playerName && (
        <div className="absolute left-0 text-4xl text-white transform -translate-x-full">
          {playerName}'s turn:
        </div>
      )}
      <VerticalProgressBar rollsLeft={rollsLeft} />
      {/* visual of dice rolling */}
      {diceArr.map((die, index) => (
        <div
          key={index}
          onClick={() => handleDiceClick(index)}
          className={`p-4 mx-1 rounded-full cursor:pointer text-2xl text-black ${diceRolled && 'cursor-pointer hover:bg-gray-400'} ${
            selectedDice[index] == 1 ? 'bg-gray-400' : 'bg-white'
          }`}
        >
          <div className="w-4 h-7 text-center">{die != 0 && die}</div>
        </div>
      ))}
      {/* the ROLL button */}
      <button
        className="bg-[#E8CC9D] text-gray-800 font-bold px-4 py-2 rounded mx-2 transition hover:scale-105"
        onClick={() => rollDice(selectedDice)}
      >
        ROLL
      </button>
    </div>
  );
}

export default DiceRow;