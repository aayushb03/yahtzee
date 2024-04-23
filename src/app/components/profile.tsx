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
          <strong><span style={{ display: 'inline-flex', alignItems: 'center'}}><GiGamepad style={{marginRight:'4px'}}/>Online Games Played: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{numOnlineGames} </span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><TbConfetti style={{marginRight:'4px'}}/>Number of Online Wins: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{toatlOnlineWinCount}</span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><TbConfetti style={{marginRight:'4px'}}/>Win Rate: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{Math.round(toatlOnlineWinCount/numOnlineGames * 100)/100 * 100}</span></span></strong> <strong>%</strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice style={{marginRight:'6px'}}/> Total Number of Yahtzees: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{totalOnlineYahtzeeCount}</span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
            <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice style={{marginRight:'6px'}}/> Avg Number of Yahtzee's per game: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{Math.round(totalOnlineYahtzeeCount / numOnlineGames * 100)/100} </span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard style={{marginRight:'4px'}}/>Average Score: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{Math.round(totalOnlineScore / numOnlineGames * 100)/100}</span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard style={{marginRight:'4px'}}/>Highest Online Game Score: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}> {maxOnlineScore}</span></span></strong>
        </div>
        
        <hr style={{ height: '3px', borderWidth: '0', color: 'black', backgroundColor: 'black' }}/>

        <h2 className="font-bold ml-1 mr-1 my-1"><i>Local Game Statistics: </i></h2>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><GiGamepad style={{marginRight:'4px'}}/> Local Games Played: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{numLocalGames} </span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice style={{marginRight:'6px'}}/> Total Number of Yahtzees: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{totalLocalYahtzeeCount}</span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><FaDice style={{marginRight:'6px'}}/> Avg Number of Yahtzee's per Game: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{Math.round(totalLocalYahtzeeCount / numLocalGames * 100)/100}</span></span></strong> 
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard style={{marginRight:'4px'}}/>Average Score: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{Math.round(totalLocalScore / numLocalGames * 100)/100}</span></span></strong>
        </div>
        <div className= "ml-20 mr-20">
          <strong><span style={{ display: 'inline-flex', alignItems: 'center' }}><MdScoreboard style={{marginRight:'4px'}}/>Highest Local Game Score: <span style={{ color: '#AA6C39', fontSize: '24px', marginLeft: '6px'}}>{maxLocalScore}</span></span></strong> 
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
