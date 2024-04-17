import {useEffect, useState} from "react";
import {getAllScores, IScore} from "@/services/scoreService";
// eslint-disable-next-line
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

type LeaderboardProps = {
  numScores: number; // number of scores to display on the leaderboard
  boldRecent: number; // number of most recent scores to bold
}

/**
 * Returns the leaderboard displayed in both endGameCard and when button is clicked in nav bar.
 * Handles errors if not connected tothe database.
 * @param param0 
 * @returns Leaderboard
 */
const Leaderboard = ( {numScores, boldRecent} : LeaderboardProps) => {
  // declares leaderboard scores as a list of player object which each have a Game_Num. Player_Name, and Score property
  const [leaderboardScores, setLeaderboardScores] = useState<IScore[]>([]);
  // indicates whether to show the leaderboard or not
  const [leaderboardLoaded, setLeaderboardLoaded] = useState(false);
  // indicates whether there is an error in connecting to the database
  const [showError, setShowError] = useState(false);
  // array that holds the gameNumbers associated with the most recent games in the database
  const [recentGameNums, setRecentGameNums] = useState([0]);

  /**
   * makes sure that setLeaderboard scores gets the data from the database as soon as it loads
   */
  useEffect(() => {
    setLeaderboardScores([])
    setLeaderboardLoaded(false);
    setShowError(false);
    getAllScores().then((scores: IScore[]) => {
      const sortedScores = scores.sort((a, b) => b.Score - a.Score);
      setLeaderboardScores(sortedScores.slice(0, numScores));
      setLeaderboardLoaded(true);
      const sortedGames = scores.sort((a, b) => b.Game_Num - a.Game_Num);
      setRecentGameNums(sortedGames.slice(0, boldRecent).map(score => score.Game_Num));
    }).catch(() => {
      setShowError(true);
    }).finally(() => {
      setLeaderboardLoaded(true);
    }
    );

  }, []);

  if (!leaderboardLoaded) {
    return (
      <div>
        <div className={"text-2xl text-center"}>Leaderboard</div>
        <div
          className={`flex flex-col items-center w-full py-4 ${baloo2.className}`}
        >
          <div
            className={`${baloo2.className} text-center text-app-red px-4 pb-4`}
          >
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={"text-2xl text-center"}>Leaderboard</div>
      <div
        className={`flex flex-col items-center w-full py-4 ${baloo2.className} max-h-96 no-scrollbar overflow-y-auto`}
      >
        {!showError ? (
          leaderboardScores.map((entry, index) => (
            <div
              key={index}
              className={`text-xl flex w-[80%] border-b ${recentGameNums.includes(entry.Game_Num) ? "font-bold" : ""}`}
            >
              <div className={"text-center w-[10%]"}>
                {index + 1}
              </div>
              <div className={"text-left w-[45%]"}>
                {entry.Player_Name}
              </div>
              <div className={"text-right w-[45%]"}>{entry.Score}</div>
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
  );
}

export default Leaderboard;