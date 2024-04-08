import React, { useEffect, useState } from "react";
import {
  IoIosHelpCircleOutline,
  IoIosSettings,
  IoIosStats,
  IoIosLogIn,
} from "react-icons/io";
import Modal from "./modal";
import { Player } from "@/models/player";
import { getAllScores } from "@/services/scoreService";
import { IScore } from "@/services/scoreService";
// eslint-disable-next-line
import { Baloo_2 } from "next/font/google";
import { GameStatus as GS, GameStatus } from "@/models/enums";

// font that we use for titles (not cell text)
// eslint-disable-next-line
const baloo2 = Baloo_2({ subsets: ["latin"] });

type NavProps = {
  setGameStatus: (status: GameStatus) => void;
};

const Nav = ({ setGameStatus }: NavProps) => {
  const iconClasses =
    "transition transform hover:-translate-y-1 cursor-pointer";

  const [players, setPlayers] = useState<Player[]>([]);

  // helpers to see if modals are open or not
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  // declares the current players as a list of player objects who each have name and score property
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  // array of Scores to hold all leaderboard scores
  const [leaderboardScores, setLeaderboardScores] = useState<IScore[]>([]);

  /**
   * makes sure that setLeaderboard scores gets the data from the database as soon as the button status of statsOpen is changed
   */
  useEffect(() => {
    getAllScores().then((scores: IScore[]) => {
      const sortedScores = scores.sort((a, b) => b.Score - a.Score);
      console.log(sortedScores);
      setLeaderboardScores(sortedScores.slice(0, 10));
    });
  }, [statsOpen]);

  /**
   * When logout button or logo is clicked, navigates to homescreen
   */
  const navToHomeScreen = () => {
    // setPlayers([]);
    setGameStatus(GS.AddPlayers);
  };

  return (
    <>
      <nav className="flex w-full bg-app-red justify-center items-center">
        <div className="w-[22%]" />

        {/* When YAHTZEE logo is clicked, navigates back to starting screen */}
        <h1
          className="text-6xl text-white my-1 w-[50%] text-center [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]"
          onClick={navToHomeScreen}
        >
          YAHTZEE
        </h1>
        <div className="w-[22%] flex justify-end text-3xl text-white gap-4">
          {/* When this button is clicked, isHelpModalOpen becomes true, which should show the Modal */}
          <button
            onClick={() => setHelpModalOpen(true)}
            className={iconClasses}
          >
            <IoIosHelpCircleOutline />
          </button>

          {/*<IoIosSettings className={iconClasses}/>*/}

          {/* When this button is clicked, setStatsOpen becomes true, which should show the Modal */}
          <button onClick={() => setStatsOpen(true)} className={iconClasses}>
            <IoIosStats className={iconClasses} />
          </button>

          {/* When this button is clicked, page navigates back to homescreen */}
          <button onClick={() => navToHomeScreen()} className={iconClasses}>
            <IoIosLogIn className={iconClasses} />
          </button>
        </div>
      </nav>

      {/* This Modal should appear when isHelpModalOpen is true */}
      <Modal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}>
        <p className="text-3xl">
          <u>Basic rules of Yahtzee:</u>
        </p>
        <div className={baloo2.className}>
          <p>
            <span style={{ fontSize: "1.5em" }}>Objective: </span> Score points
            by rolling 5 dice to make certain combinations
          </p>
          <p>
            <span style={{ fontSize: "1.5em" }}># of Players: </span> Yahtzee
            requires 2-4 players
          </p>
          <p>
            <span style={{ fontSize: "1.5em" }}>Turns: </span>Players takes
            turns rolling the dice 3 times each turn
          </p>
          <p>
            <span style={{ fontSize: "1.5em" }}>Scoring: </span> Each round you
            may choose one of the following categories to score points, be
            careful as you can only select each category once
          </p>
          <ul style={{ paddingLeft: "20px" }} className="gap-4">
            <li>
              <i>
                <span style={{ fontSize: "1.4em", color: "black" }}>
                  Ones, Twos, Threes, Fours, Fives, Sixes:{" "}
                </span>
              </i>
              Count & add up each corresponding dice, ex: three 4's would be 12
              points,
            </li>
            <li>
              <i>
                <span style={{ fontSize: "1.4em", color: "black" }}>
                  Three of a kind, Four of a kind:{" "}
                </span>
              </i>
              Three or Four of the same number, make sure to add up all the dice
              not just the nunmbers that are the same, ex: 3 3 3 6 4 would be 19
              points not 9
            </li>
            <li>
              <i>
                <span style={{ fontSize: "1.4em", color: "black" }}>
                  Full House:{" "}
                </span>
              </i>{" "}
              A combination of three of a kind & a pair which results in 25
              points, ex: 4 4 3 4 3 would be a full house
            </li>
            <li>
              <i>
                <span style={{ fontSize: "1.4em", color: "black" }}>
                  Small Straight, Large Straight:{" "}
                </span>
              </i>
              Small straight: 4 sequential #'s in a row & scores a fixed 30
              points, Large straight: 5 sequential #'s in a row & scores a fixed
              40 points
            </li>
            <li>
              <i>
                <span style={{ fontSize: "1.4em", color: "black" }}>
                  Yahtzee:{" "}
                </span>
              </i>
              Five of a kind of any number, scores 50 points
            </li>
            <li>
              <i>
                <span style={{ fontSize: "1.4em", color: "black" }}>
                  Chance:{" "}
                </span>
              </i>
              Wild card category where you add up all the numbers, ex: 5 5 5 3 2
              would be 20 points
            </li>
          </ul>
          <p>
            <span style={{ fontSize: "1.5em" }}>Yahtzee Bonus!: </span> Each
            yahtzee after your first gives you a 100 point bonus that takes a
            unused spot on your scorecard
          </p>
          <p>
            <span style={{ fontSize: "1.5em" }}>Winner: </span> After 13 rounds,
            whoever has the most points is the winner!
          </p>
          <hr
            style={{
              border: "0",
              borderTop: "2px solid black",
              width: "50%",
              margin: "20px auto",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "20px" }}>
            For more detailed rules, please click the link below:{" "}
          </p>
          <a
            href="https://www.hasbro.com/common/instruct/yahtzee.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "24px",
              display: "block",
              margin: "10px auto",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Yahtzee Instructions PDF
          </a>
        </div>
      </Modal>

      {/* This Modal should appear when statsOpen is true */}
      <Modal isOpen={statsOpen} onClose={() => setStatsOpen(false)}>
        <div>
          <div className={"text-2xl text-center"}>Leaderboard</div>
          <div
            className={`flex flex-col items-center w-full py-4 ${baloo2.className}`}
          >
            {leaderboardScores.length != 0 ? (
              leaderboardScores.map((entry, index) => (
                <div key={index} className={`text-xl flex w-[80%] border-b`}>
                  <div className={"text-left w-[50%]"}>{entry.Player_Name}</div>
                  <div className={"text-right w-[50%]"}>{entry.Score}</div>
                </div>
              ))
            ) : (
              <div
                className={`${baloo2.className} text-center text-app-red px-4 pb-4`}
              >
                <p>
                  <span className={"font-bold"}>Error: </span>Unable to connect
                  to database, scores will not be recorded!
                </p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Nav;
