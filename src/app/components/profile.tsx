import React, {useEffect, useState} from "react";
import {signOut} from "next-auth/react";
import {useUser} from "@/services/userContext";
import {getGamesByUser, IGame} from "@/services/gameService";
// eslint-disable-next-line camelcase
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

const Profile = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const {user, setUser} = useUser();

  useEffect(() => {
    if (user?.email) {
      getGamesByUser(user.email).then((games) => {
        if (games) {
          setGames(games);
        }
      });
    }
  }, [user]);

  const logout = () => {
    signOut({redirect: false}).then(() => {
      setUser(null);
    });
  }

  return (
    <div className={`${baloo2.className} flex flex-col justify-center items-center gap-1`}>
      <div className={"text-xl"}>
        Hello {user?.username}!
      </div>
      {games.length > 0 && (
        <div className={"text-xl"}>
          You have played {games.length} games. (Temporary)
        </div>
      )}
      <button className={"bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"}
        onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Profile;
