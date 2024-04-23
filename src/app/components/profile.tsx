import React, {useEffect, useState} from "react";
import {signOut} from "next-auth/react";
import {useUser} from "@/services/userContext";
import {getGamesByUser, ILocalGames, IOnlineGames} from "@/services/gameService";
// eslint-disable-next-line camelcase
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

import { FaDice } from "react-icons/fa";
import { GiGamepad } from "react-icons/gi";
import { TbConfetti } from "react-icons/tb";
import { MdScoreboard } from "react-icons/md";
import { colors } from "unique-names-generator";

/**
 * Handles the user profile if a user is logged in
 * @returns Profile
 */
const Profile = () => {
  // const [games, setGames] = useState<IGame[]>([]);
  const {user, setUser} = useUser();

  const [totalOnlineScore, setTotalOnlineScore] = useState<number>(0);
  const [totalLocalScore, setTotalLocalScore] = useState<number>(0);
  const [totalOnlineYahtzeeCount, setTotalOnlineYahtzeeCount] = useState<number>(0);
  const [totalLocalYahtzeeCount, setTotalLocalYahtzeeCount] = useState<number>(0);
  const [toatlOnlineWinCount, setTotalOnlineWinCount] = useState<number>(0);
  const [maxOnlineScore, setMaxOnlineScore] = useState<number>(0);
  const [maxLocalScore, setMaxLocalScore] = useState<number>(0);
  const [numOnlineGames, setNumOnlineGames] = useState<number>(0);
  const [numLocalGames, setNumLocalGames] = useState<number>(0);

  useEffect(() => {
    if (user?.email) {
      getGamesByUser(user.email).then((games) => {
        if (games) {
          const localGames : ILocalGames[] = games.localGames;
          const onlineGames : IOnlineGames[] = games.onlineGames;
          
          let onlineScoreSum = totalOnlineScore;
          let onlineYahtzeeCount = totalOnlineYahtzeeCount;
          let onlineWinCount = toatlOnlineWinCount;
          let currMaxOnlineScore = maxOnlineScore;

          let localScoreSum = totalLocalScore;
          let localYahtzeeCount = totalLocalYahtzeeCount;
          let currMaxLocalScore = maxLocalScore;

          let currNumOnlineGames = onlineGames.length;
          let currNumLocalGames = localGames.length;

          for (let i = 0; i < onlineGames.length; i++) {
            const currOnlineGame = onlineGames[i];
            onlineScoreSum += currOnlineGame.Score;
            onlineYahtzeeCount += currOnlineGame.Yahtzees;
            if(currOnlineGame.isWin) {
              onlineWinCount += 1;
            }
            if(currOnlineGame.Score > currMaxOnlineScore) {
              currMaxOnlineScore = currOnlineGame.Score;
            }
          }

          for (let j = 0; j < localGames.length; j++) {
            const currLocalGame = localGames[j];
            localScoreSum += currLocalGame.Score;
            localYahtzeeCount += currLocalGame.Yahtzees;
            if(currLocalGame.Score > currMaxLocalScore){
              currMaxLocalScore = currLocalGame.Score;
            }
          }

          setTotalOnlineScore(onlineScoreSum);
          setTotalLocalScore(localScoreSum);
          setTotalOnlineYahtzeeCount(onlineYahtzeeCount);
          setTotalLocalYahtzeeCount(localYahtzeeCount);
          setTotalOnlineWinCount(onlineWinCount);
          setMaxOnlineScore(currMaxOnlineScore);
          setMaxLocalScore(currMaxLocalScore);
          setNumLocalGames(currNumLocalGames);
          setNumOnlineGames(currNumOnlineGames);
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
        
        <hr style={{ height: '3px', borderWidth: '0', color: 'black', backgroundColor: 'black' }}/>

        <h2 className="font-bold ml-1 mr-1 my-1"><i>Online Game Statistics: </i></h2>
        <div className= "ml-20 mr-20">
          <strong> <span style={{ display: 'inline-flex', alignItems: 'center' }}><GiGamepad />Online Games Played: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{numOnlineGames} </span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><TbConfetti />Number of Online Wins: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{toatlOnlineWinCount}</span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><TbConfetti />Win Rate: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{toatlOnlineWinCount/numOnlineGames * 100}</span></span></strong> <strong>%</strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice /> Total Number of Yahtzees: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{totalOnlineYahtzeeCount}</span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
            <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice /> Avg Number of Yahtzee's per Online Game: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{Math.round(totalOnlineYahtzeeCount / numOnlineGames * 100)/100} </span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard />Average Score per Online Game: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{Math.round(totalOnlineScore / numOnlineGames * 100)/100}</span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard />Highest Online Game Score: <span style={{ color: '#AA6C39', fontSize: '24px'}}> {maxOnlineScore}</span></span></strong>
        </div>
        
        <hr style={{ height: '3px', borderWidth: '0', color: 'black', backgroundColor: 'black' }}/>

        <h2 className="font-bold ml-1 mr-1 my-1"><i>Local Game Statistics: </i></h2>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><GiGamepad /> Local Games Played: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{numLocalGames} </span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice /> Total Number of Yahtzees: <span style={{ color: '#AA6C39', fontSize: '24px' }}>{totalLocalYahtzeeCount}</span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice /> Avg Number of Yahtzee's per Local Game: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{Math.round(totalLocalYahtzeeCount / numLocalGames * 100)/100}</span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard />Average Score per Local Game: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{Math.round(totalLocalScore / numLocalGames * 100)/100}</span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard />Highest Local Game Score: <span style={{ color: '#AA6C39', fontSize: '24px'}}>{maxLocalScore}</span></span></strong> 
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
