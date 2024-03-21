import {Dice} from "@/models/dice";
import React, {useEffect, useState} from "react";
import styles from './DiceAnimations.module.css'

type DiceRowProps = {
  // enum that returns 5 randomly generated numbers
  dice: Dice; 
  // generates the numbers for each of the dice
  rollDice: (selectedDice: number[]) => void; 
  // if the dice have been rolled or not
  diceRolled: boolean; 
   // player who's turn it is 
  playerName: string;
  // the rolls left in the turn 
  rollsLeft?: number; 
}

const DiceRow = ({ dice, rollDice, diceRolled, playerName, rollsLeft = 3 }: DiceRowProps) => {
  // keeps track of each dice value
  const [diceArr, setDiceArr] = useState([0, 0, 0, 0, 0]); 
  // keeps track of dice to freeze
  const [selectedDice, setSelectedDice] = useState([0, 0, 0, 0, 0]); 
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (!isRolling) {
      setDiceArr([...dice.dice]);
    }
  }, [dice]);

  /**
   * at the beginning of each turn, the dice are all set to 0
   */
  useEffect(() => {
    setSelectedDice([0, 0, 0, 0, 0]);
  }, [diceRolled]);

  /**
   * handles the device being clicked, if it is, the number of th dye stays the same even after rolling
   * @param index position of the dice clicked
   */
  const handleDiceClick = (index: number) => {
    if (!diceRolled || isRolling) return;
    const newSelectedDice = [...selectedDice];
    newSelectedDice[index] = newSelectedDice[index] == 0 ? 1 : 0;
    setSelectedDice(newSelectedDice);
  }

  const handleRollClick = () => {
    // 在开始滚动动画前，随机改变骰子的数字，创建翻转效果的假象
    setIsRolling(true);
    const randomDiceArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    setDiceArr(randomDiceArr);
    
    setTimeout(() => {
      rollDice(selectedDice);
      setIsRolling(false); // 1秒后停止动画，显示真实的骰子数值
    }, 3000); // 假设动画持续时间为1秒
  };

  /* the progress bar visually shows the players have 3 rolls, each time "Roll" is selected, the progress bar goes down 1/3 */
  type VerticalProgressBarProps = {
    rollsLeft: number;
  };
  
  /**
   * vertical progress bar for rolls left
   */
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
  
  {/* buttons at the bottom of the page - including dice and players name */} 
  return (
    <div>

      {/* players name div*/}
      <div className="flex justify-center items-center my-4 relative" style={{ margin: '30px' }}>
      {playerName && (
        <div className="absolute text-center text-4xl text-white ">
          {playerName}'s turn:
          </div>
      )}</div>

      {/* dice & roll button div */}
    <div className="flex justify-center items-center my-4 relative" style={{ marginLeft: '50px' }}>
      <VerticalProgressBar rollsLeft={rollsLeft} />
      {/* visual of dice rolling */}
        {diceArr.map((die, index) => (
          <div
            key={index}
            onClick={() => handleDiceClick(index)}
            className={`${styles.dice} ${selectedDice[index] === 1 ? styles.diceSelected : ''} ${isRolling ? styles.diceRolling : ''}`}
          >
            {/* 骰子在滚动动画期间不显示数字，只有当isRolling为false时才显示 */}
            {!isRolling && (
              <div className={`${styles.dieValue} w-4 h-7 text-center`}>{die}</div>
            )}
          </div>
        ))}
        {/* 更新ROLL按钮的逻辑，以便在点击时触发滚动动画 */}
        <button
          className="bg-[#E8CC9D] text-gray-800 font-bold px-4 py-2 rounded mx-2 transition hover:scale-105"
          disabled={isRolling} // 当动画进行时禁用按钮
          onClick={() => {
            setIsRolling(true);
            setTimeout(() => {
              const newSelectedDice = selectedDice.map((selected, i) => selected === 1 ? diceArr[i] : 0);
              rollDice(newSelectedDice);
              setIsRolling(false); // 动画结束，显示最终骰子数值
            }, 3000); // 假设动画持续时间为1秒
          }}
        >
          ROLL
        </button>
    </div>
    </div>
  );
}

export default DiceRow;