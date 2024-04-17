'use client';
import {pusherClient} from "@/services/pusher/pusherClient";
import {useEffect, useState} from "react";
import {IOnlinePlayer} from "@/services/onlineGameService";

type OnlinePlayerListProps = {
  initialPlayers: IOnlinePlayer[];
  gameRoomId: string;
  addPlayers: (newPlayer: IOnlinePlayer[]) => void;
}

const OnlinePlayerList = ({initialPlayers, gameRoomId, addPlayers}: OnlinePlayerListProps) => {
  const [newPlayers, setNewPlayers] = useState<IOnlinePlayer[]>([]);

  useEffect(() => {
    pusherClient.subscribe(gameRoomId);
    pusherClient.bind("new-player", (playerName: string) => {
      setNewPlayers((players) => {
        return [...players, {id: "", name: playerName, isHost: false, gameRoomId: gameRoomId}]
      });
    });
    return () => {
      pusherClient.unsubscribe(gameRoomId)
    }
  }, []);

  useEffect(() => {
    // remove duplicate players from newPlayers
    const unique: IOnlinePlayer[] = [];
    newPlayers.forEach(player => {
      if (unique.findIndex(item => item.id === player.id) === -1) {
        unique.push(player);
      }
    });
    if (unique.length !== newPlayers.length) {
      setNewPlayers(unique);
      addPlayers(unique);
    }
  }, [newPlayers]);

  return(
    <div className={"flex flex-col w-full"}>
      {initialPlayers.map((player, index) => {
        return (
          <div key={player.id} className="text-center text-xl">{player.name} {player.isHost && "(Host)"}</div>
        );
      })}
    </div>
  )
}

export default OnlinePlayerList;