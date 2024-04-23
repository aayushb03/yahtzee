import React, {useEffect, useState} from "react";
import {signOut} from "next-auth/react";
import {useUser} from "@/services/userContext";
import {getGamesByUser, ILocalGames, IOnlineGames} from "@/services/gameService";
// eslint-disable-next-line camelcase
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

/**
 * Handles the user profile if a user is logged in
 * @returns Profile
 */
const Profile = () => {
  // const [games, setGames] = useState<IGame[]>([]);
  const {user, setUser} = useUser();

  const [totalScore, setTotalScore] = useState<number>(0);
  const [totalYahtzeeCount, setTotalYahtzeeCount] = useState<number>(0);
  const [toatlWinCount, setTotalWinCount] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);

  useEffect(() => {
    if (user?.email) {
      getGamesByUser(user.email).then((games) => {
        if (games) {
          const localGames = games.localGames;
          const onlineGames = games.onlineGames;
          // setGames(games);

          // let scoreSum = totalScore;
          // let yahtzeeCount = totalYahtzeeCount;
          // let winCount = toatlWinCount;
          // let currMaxScore = maxScore;
          //
          // for (let i = 0; i < games.length; i++) {
          //   const game = games[i];
          //   scoreSum += game.Score;
          //   yahtzeeCount += game.Yahtzees;
          //   if(game.isWin) {
          //     winCount += 1;
          //   }
          //   if(game.Score > currMaxScore) {
          //     currMaxScore = game.Score;
          //   }
          // }
          //
          // setTotalScore(scoreSum);
          // setTotalYahtzeeCount(yahtzeeCount);
          // setTotalWinCount(winCount);
          // setMaxScore(currMaxScore)
        }
      });
    }
  }, [user]);

  /**
   * Logs out the user
   */
  const logout = () => {
    signOut({redirect: false}).then(() => {
      setUser(null);
    });
  }

  return (
    <div className={`${baloo2.className} flex flex-col justify-center items-center gap-1`}>
      <div className={"text-3xl"}>
        Hello {user?.username}!
      </div>
      <div className="border border-black p-4 m-5 text-lg">
        <h1 className="font-bold ml-1 mr-1 my-1"> Profile Information: </h1>
        <p className= "ml-20 mr-20"> <strong>Email:</strong>   {user?.email} </p>
        <p className= "ml-20 mr-20"><strong>Username:</strong>  {user?.username} </p>
        <div className= "ml-20 mr-20">
          {/*<strong> Games Played: </strong> {games.length}*/}
        </div>
        <h1 className="font-bold ml-1 mr-1 my-1"> Game Statistics: </h1>
        <div className= "ml-20 mr-20">
          <strong> Number of Wins: </strong> {toatlWinCount}
        </div>
        <div className= "ml-20 mr-20">
          {/*<strong> Win Rate: </strong> {toatlWinCount/games.length * 100} <strong>%</strong>*/}
        </div>
        <div className= "ml-20 mr-20">
          <strong> Total Number of Yahtzees: </strong> {totalYahtzeeCount}
        </div>
        <div className= "ml-20 mr-20">
          {/*<strong> Average Number of Yahtzee's per Game: </strong> {totalYahtzeeCount / games.length}*/}
        </div>
        <div className= "ml-20 mr-20">
          {/*<strong> Average Score per Game: </strong> {Math.round(totalScore / games.length * 100)/100}*/}
        </div>
        <div className= "ml-20 mr-20">
          <strong> Highest Game Score: </strong> {maxScore}
        </div>
      </div>
      <button className={"bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"}
        onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Profile;
