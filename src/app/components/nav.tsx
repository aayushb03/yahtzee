import React, {useState} from "react";
import {IoIosHelpCircleOutline, IoIosStats, IoIosLogIn} from "react-icons/io";
import Modal from "./modal";

const Nav = () => {
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const iconClasses = "transition transform hover:-translate-y-1 cursor-pointer";
  
  const navToHomeScreen = () =>{
      
  }

  return (
    <>
      <nav className="flex w-full bg-app-red justify-center items-center">
        <div className="w-[22%]"/>
        <h1 className="text-6xl text-white my-1 w-[50%] text-center [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]">YAHTZEE</h1>
        <div className="w-[22%] flex justify-end text-3xl text-white gap-4">

          {/* When this button is clicked, isHelpModalOpen becomes true, which should show the Modal */}
          <button onClick={() => setHelpModalOpen(true)} className={iconClasses}>
            <IoIosHelpCircleOutline />
          </button>

          {/*<IoIosSettings className={iconClasses}/>*/}

          <button onClick={() => setStatsOpen(true)} className={iconClasses}>
            <IoIosStats className={iconClasses}/>
          </button>

          <button onClick={() => navToHomeScreen} className={iconClasses}>
            <IoIosLogIn className={iconClasses}/>
          </button>
      
        </div>
      </nav>

      {/* This Modal should appear when isHelpModalOpen is true */}
      <Modal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}>
        <p><u><b>Basic rule of Yahtzee:</b></u></p>
        <p>Objective: Score points by rolling 5 dice to make certain combinations</p>
        <p>Turns: Players takes turns rolling the dice 3 times each turn</p>
        <p>Scoring: Choose from the following categories to score points</p>
        <ul>
          <li>Ones, Twos, Threes, Fours, Fives, Sixes</li>
          <li>Three of a kind, Four of a kind</li>
          <li>Full House</li>
          <li>Small Straight, Large Straight</li>
          <li>Yahtzee</li>
          <li>Chance</li>
        </ul>
        <p>Winner: the winner is the person with the most points after everyones board is filled up</p>
      </Modal>

      {/* This Modal should appear when statsOpen is true */}
      <Modal isOpen={statsOpen} onClose={() => setStatsOpen(false)}>
        <p>Modal content goes here. This should be visible when the modal is open.</p>
        {/* xxxxxx texts goes here  */}
      </Modal>

    </>
  );
};

export default Nav;