import React, {useEffect, useState} from "react";
import { IoIosHelpCircleOutline, IoIosStats, IoIosLogIn, IoIosContact } from "react-icons/io";
import Modal from "./modal";
// eslint-disable-next-line
import { GameStatus as GS, GameStatus } from "@/models/enums";
import Instructions from "@/app/components/instructions";
import Leaderboard from "@/app/components/leaderboard";
import CredentialsForm from "@/app/components/credentialsForm";
import Profile from "@/app/components/profile";
import {useUser} from "@/services/userContext";
import {getSession} from "next-auth/react";

// eslint-disable-next-line
type NavProps = {
  setGameStatus: (status: GameStatus) => void;
};

/**
 * Nav bar component that includes 3 buttons (Question mark/instructions, leaderboard, logout/profile) and their respective modals
 * functionality.
 * @param param0
 * @returns Nav
 */
const Nav = ({ setGameStatus }: NavProps) => {
  const iconClasses =
    "transition transform hover:-translate-y-1 cursor-pointer";

  // helpers to see if modals are open or not
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const {user} = useUser();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  } ,[user]);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        setLoginModalOpen(true);
      }
    });
  }, []);

  /**
   * When logout button or logo is clicked, navigates to homescreen
   */
  const navToHomeScreen = () => {
    setGameStatus(GS.AddPlayers);
  };

  return (
    <>
      <nav className="flex w-full bg-app-red justify-center items-center">
        <div className="w-[22%]" />

        {/* When YAHTZEE logo is clicked, navigates back to starting screen */}
        <h1
          className="text-6xl text-white my-1 w-[50%] text-center [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)] cursor-pointer transition transform hover:scale-105"
          onClick={navToHomeScreen}
        >
          YAHTZEE
        </h1>

        <div className="w-[22%] flex justify-end text-3xl text-white gap-4">
          {/* When this button is clicked, isHelpModalOpen becomes true, which should show the Modal */}
          <button
            onClick={() => setHelpModalOpen(true)}
            className={iconClasses}
            data-testid="help-button"
          >
            <IoIosHelpCircleOutline />
          </button>

          {/* When this button is clicked, setStatsOpen becomes true, which should show the Modal */}
          <button
            onClick={() => setStatsOpen(true)}
            className={iconClasses}
            data-testid="leaderboard-button"
          >
            <IoIosStats className={iconClasses} />
          </button>

          {/* When this button is clicked, page navigates back to homescreen */}
          <button
            onClick={() => setLoginModalOpen(true)}
            className={iconClasses}
            data-testid="log-in-button"
          >
            {!loggedIn && <IoIosLogIn className={iconClasses}/>}
            {loggedIn && <IoIosContact className={iconClasses}/>}
          </button>
        </div>
      </nav>

      {/* This Modal should appear when isHelpModalOpen is true */}
      <Modal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}>
        <Instructions />
      </Modal>

      {/* This Modal should appear when statsOpen is true */}
      <Modal isOpen={statsOpen} onClose={() => setStatsOpen(false)}>
        <Leaderboard numScores={50} boldRecent={0}/>
      </Modal>

      {/* This Modal should appear when loginModalOpen is true */}
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} closeOnBackdropClick={false}>
        {!loggedIn && <CredentialsForm onClose={() => setLoginModalOpen(false)}/>}
        {loggedIn && <Profile/>}
      </Modal>
    </>
  );
};

export default Nav;
