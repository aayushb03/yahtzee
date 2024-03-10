import React, {useEffect, useState} from "react";
import { RxCross1 } from "react-icons/rx";
import { Baloo_2 } from "next/font/google";
import {Player} from "@/models/player";
import { getAllScores, addScore, clearScores} from "@/services/scoreService";
import { Score } from "@/services/scoreService"; 

const baloo2 = Baloo_2({ subsets: ["latin"] });

type EndPageCardProps = {
  players: Player[];
  onRestart: () => void;
}

const EndPageCard = ({players, onRestart} : EndPageCardProps) => {
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  const [recentScores, setRecentScores] = useState<Score[]>([]);

  useEffect(() => {
    let curPlayers = [...players];
    setCurrentPlayers(curPlayers.sort((a, b) => b.scorecard.totalScore - a.scorecard.totalScore));
    getAllScores().then((scores: Score[]) => { // can change this to get the top 10 scores 
      let sortedScores = scores.sort((a, b) => b.Score - a.Score);
      setRecentScores(sortedScores.slice(0,10));
    });
  }, [players]);

  return (
    <div className="flex h-full w-full justify-center items-center mb-40">
      <div className="flex flex-col p-4 w-96 rounded-xl bg-white text-black shadow-2xl relative">
        {/*<button className="absolute top-0 right-0 m-2" onClick={onRestart}>*/}
        {/*  <RxCross1 className="text-2xl" />*/}
        {/*</button>*/}
        <div className={"text-2xl text-center"}>
          Final Score
        </div>
        <div className={`flex flex-col items-center w-full py-4 ${baloo2.className}`}>
          {currentPlayers.map((player, index) => (
            <div key={index} className="text-xl flex w-[80%] border-b">
              <div className={"text-left w-[50%]"}>
                {player.name}
              </div>
              <div className={"text-right w-[50%]"}>
                {player.scorecard.totalScore}
              </div>
            </div>
          ))}
        </div>
        <div className={"text-2xl text-center"}>
          Recent Scores
        </div>
        <div className={`flex flex-col items-center w-full py-4 ${baloo2.className}`}>
          {recentScores.map((entry, index) => (
            <div key ={index} className="text-xl flex w-[80%] border-b">
                <div className={"text-left w-[50%]"}>
                {entry.Player_Name}
              </div>
              <div className={"text-right w-[50%]"}>
                {entry.Score}
              </div>
            </div>
          ))}
        </div>
        <div className={`flex justify-center items-center ${baloo2.className}`}>
          <button className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow" onClick={onRestart}>
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndPageCard;
