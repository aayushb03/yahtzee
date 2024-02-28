import {Dice} from "@/models/dice";
import React, {useEffect, useState} from "react";

type DiceRowProps = {
  dice: Dice;
  rollDice: (selectedDice: number[]) => void;
  diceRolled: boolean;
  playerName: string;
  playerTurn: boolean;
}

const DiceRow = ({dice, rollDice, diceRolled, playerName, playerTurn} : DiceRowProps) => {
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
    let newSelectedDice = [...selectedDice];
    newSelectedDice[index] = newSelectedDice[index] == 0 ? 1 : 0;
    setSelectedDice(newSelectedDice);
  }

  return (
    <div className="flex justify-center items-center my-4">
      <div className="text-4xl text-white mr-4">{playerName}</div>
      {diceArr.map((die, index) => (
        <div key={index}
             onClick={() => handleDiceClick(index)}
             className={`p-4 mx-1 rounded-full cursor:pointer text-2xl text-black ${diceRolled && 'cursor-pointer hover:bg-gray-400'} ${selectedDice[index]==1 ? 'bg-gray-400' : "bg-white"}` }>
          <div className={"w-4 h-7 text-center"}>
            {die != 0 && die}
          </div>
        </div>
      ))}
      {playerTurn && (
        <button
          className="bg-[#E8CC9D] text-white px-4 py-2 rounded mx-2"
          onClick={() => rollDice(selectedDice)}
        >
          {/* Roll ({rollsLeft}) */}
          ROLL
        </button>
      )}
    </div>
  );
}

export default DiceRow;