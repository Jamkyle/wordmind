"use client";
import { useGameRealTime, useJoinRoom } from "@/libs/hooks/games";
import PlayerList from "./PlayerList";
import { useRouter } from "next/navigation";

export function GameList() {
  const { data: games, isLoading } = useGameRealTime();
  const joinRoom = useJoinRoom();
  const router = useRouter();
  const handleJoinRoom = (roomId: string) => {
    joinRoom.mutate({ roomId });
    router.push(`/game/${roomId}`);
  };
  return isLoading ? (
    <p>Chargement des parties...</p>
  ) : games?.length ? (
    <ul className="text-white">
      {games?.map((game) => (
        <li key={game.id}>
          Partie {game.id} - Statut: {game.status}
          <PlayerList items={game.players} />
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
