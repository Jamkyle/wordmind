"use client";
import { useAnonymousLogin, useGameRealTime, useJoinRoom } from "@/libs/hooks/games";
import PlayerList from "./PlayerList";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "@/store/useGameStore";

export function GameList() {
  const { data: games, isLoading } = useGameRealTime();
  const login = useAnonymousLogin();
  const playerName = usePlayerStore(state => state.name);
  const joinRoom = useJoinRoom();
  const router = useRouter();
  const handleJoinRoom = (roomId: string) => {
    login.mutate(playerName);
    joinRoom.mutate({ roomId }, {
      onSuccess: (player) => {
        if(!player.id) {
          return;
        }
        router.push(`/room/${roomId}`);
      }
    });
  };

  return isLoading ? (
    <p>Chargement des parties...</p>
  ) : games?.length ? (
    <ul className="dark:text-white">
      {games?.map((game) => (
        <li key={game.id}>
          Partie {game.id} - Statut: {game.status}
          <PlayerList roomId={game.id} />
          <button
            className="btn btn-primary"
            onClick={() => handleJoinRoom(game.id)}
          >
            Rejoindre
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <span className="m-auto">Pas de partie trouvé</span>
  );
}
