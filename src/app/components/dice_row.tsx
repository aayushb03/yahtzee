import {Dice} from "@/models/dice";
import React, {useEffect, useState} from "react";

type DiceRowProps = {
  dice: Dice;
  rollDice: (selectedDice: number[]) => void;
  diceRolled: boolean;
  playerName: string;
  rollsLeft?: number;
}

const DiceRow = ({ dice, rollDice, diceRolled, playerName, rollsLeft = 3 }: DiceRowProps) => {
  const [diceArr, setDiceArr] = useState([0, 0, 0, 0, 0]);
  const [selectedDice, setSelectedDice] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    setDiceArr([...dice.dice]);
  }, [dice]);

  useEffect(() => {
    setSelectedDice([0, 0, 0, 0, 0]);
  }, [diceRolled]);

  const handleDiceClick = (index: number) => {
    if (!diceRolled) return;
    const newSelectedDice = [...selectedDice];
    newSelectedDice[index] = newSelectedDice[index] == 0 ? 1 : 0;
    setSelectedDice(newSelectedDice);
  }

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
    <div className="flex justify-center items-center my-4">
      {/*{playerName && <div className="text-4xl text-white mr-4">{playerName}'s turn: </div>}*/}
      <VerticalProgressBar rollsLeft={rollsLeft} />
      {diceArr.map((die, index) => (
        <div key={index}
          onClick={() => handleDiceClick(index)}
          className={`p-4 mx-1 rounded-full cursor:pointer text-2xl text-black ${diceRolled && 'cursor-pointer hover:bg-gray-400'} ${selectedDice[index]==1 ? 'bg-gray-400' : "bg-white"}` }>
          <div className={"w-4 h-7 text-center"}>
            {die != 0 && die}
          </div>
        </div>
      ))}
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