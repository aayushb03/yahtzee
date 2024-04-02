import React, {useState} from "react";
import {IoIosHelpCircleOutline, IoIosSettings, IoIosStats, IoIosLogIn} from "react-icons/io";
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
        <p className="text-3xl"><u>Basic rules of Yahtzee:</u></p>
        <p><span style={{ fontSize: '1.5em' }}>Objective: </span> Score points by rolling 5 dice to make certain combinations</p>
        <p><span style={{ fontSize: '1.5em' }}>Turns: </span>Players takes turns rolling the dice 3 times each turn</p>
        <p><span style={{ fontSize: '1.5em' }}>Scoring: </span> Choose from the following categories to score points</p>
        <ul style={{ paddingLeft: '20px' }} className="gap-4">
          <li style={{ display: 'block', color: 'black' }}>Ones, Twos, Threes, Fours, Fives, Sixes</li>
          <li style={{ display: 'block', color: 'black' }}>Three of a kind, Four of a kind</li>
          <li style={{ display: 'block', color: 'black' }}>Full House</li>
          <li style={{ display: 'block', color: 'black' }}>Small Straight, Large Straight</li>
          <li style={{ display: 'block', color: 'black' }}>Yahtzee</li>
          <li style={{ display: 'block', color: 'black' }}>Chance</li>
        </ul>
        <p><span style={{ fontSize: '1.5em' }}>Winner: </span> After everyone has seelcted a score for each category, whoever has the most points is the winner</p>
        <hr style={{ border: '0', borderTop: '2px solid black', width: '50%', margin: '20px auto' }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '20px' }}>For more detailed rules, please click the link below: </p>
          <a href="https://www.hasbro.com/common/instruct/yahtzee.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', display: 'block', margin: '10px auto', color: 'blue', textDecoration: 'underline' }}>Yahtzee Instructions PDF</a>
        </div>
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