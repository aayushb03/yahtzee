import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Baloo_2 } from "next/font/google";

const baloo2 = Baloo_2({ subsets: ["latin"] });

interface PlayerScore {
  name: string;
  score: number;
}

interface EndPageCardProps {
  playersScores: PlayerScore[];
  onRestart: () => void;
}

const EndPageCard: React.FC<EndPageCardProps> = ({
  playersScores,
  onRestart,
}) => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex flex-col p-4 w-96 rounded-xl bg-white text-black shadow-2xl relative">
        <button className="absolute top-0 right-0 m-2" onClick={onRestart}>
          <RxCross1 className="text-2xl" />
        </button>
        <div className={`flex flex-col items-center w-full py-4 ${baloo2.className}`}>
          {playersScores.map((player, index) => (
            <div key={index} className="text-xl">{player.name}: Score: {player.score}</div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow" onClick={onRestart}>
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndPageCard;
