import React, {useEffect, useState} from "react";
import {IoIosHelpCircleOutline, IoIosSettings, IoIosStats, IoIosLogIn} from "react-icons/io";
import Modal from "./modal";
import {Player} from "@/models/player";
import { getAllScores} from "@/services/scoreService";
import { Score } from "@/services/scoreService"; 
import { Baloo_2 } from "next/font/google";
import {GameStatus as GS} from "@/models/enums";
import changePlayersAndReset from '@/app/yahtzeeGame'

  // font that we use for titles (not cell text)
const baloo2 = Baloo_2({ subsets: ["latin"] });


const Nav = () => {
  const iconClasses = "transition transform hover:-translate-y-1 cursor-pointer";

  const [gameStatus, setGameStatus] = useState<GS>(GS.AddPlayers);
  const [players, setPlayers] = useState<Player[]>([]);

  // helpers to see if modals are open or not
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  // declares the current players as a list of player objects who each have name and score property
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  // array of Scores to hold all leaderboard scores
  const [leaderboardScores, setLeaderboardScores] = useState<Score[]>([]);

  /**
   * makes sure that setLeaderboard scores gets the data from the database as soon as the button status of statsOpen is changed
   */
  useEffect(() => {
    getAllScores().then((scores: Score[]) => { 
      let sortedScores = scores.sort((a, b) => b.Score - a.Score);
      console.log(sortedScores)
      setLeaderboardScores(sortedScores.slice(0,10));
    });
  }, [statsOpen]);


  /**
   * When logout button or logo is clicked, navigates to homescreen
   */
  const navToHomeScreen = () =>{

  }


  return (
    <>
      <nav className="flex w-full bg-app-red justify-center items-center">
        <div className="w-[22%]"/>

        {/* When YAHTZEE logo is clicked, navigates back to starting screen */}
        <h1 className="text-6xl text-white my-1 w-[50%] text-center [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]" onClick={navToHomeScreen}>YAHTZEE</h1>
        <div className="w-[22%] flex justify-end text-3xl text-white gap-4">

          {/* When this button is clicked, isHelpModalOpen becomes true, which should show the Modal */}
          <button onClick={() => setHelpModalOpen(true)} className={iconClasses}>
            <IoIosHelpCircleOutline />
          </button>

          {/*<IoIosSettings className={iconClasses}/>*/}

          {/* When this button is clicked, setStatsOpen becomes true, which should show the Modal */}
          <button onClick={() => setStatsOpen(true)} className={iconClasses}>
            <IoIosStats className={iconClasses}/>
          </button>

           {/* When this button is clicked, page navigates back to homescreen */}
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
        <div>
              <div className={"text-2xl text-center"}>
                Leaderboard
              </div>
                <div className={`flex flex-col items-center w-full py-4 ${baloo2.className}`}>
                  {leaderboardScores.map((entry, index) => (
                    <div
                      key={index}
                      className={`text-xl flex w-[80%] border-b`}
                    >
                      <div className={"text-left w-[50%]"}>
                        {entry.Player_Name}
                      </div>
                      <div className={"text-right w-[50%]"}>
                        {entry.Score}
                      </div>
                    </div>
                  ))}
                </div>
          </div>
      </Modal>
    </>
  );
};

export default Nav;