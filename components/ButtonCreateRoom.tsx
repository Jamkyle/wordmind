"use client";
import { useCreateGame, useJoinRoom } from "@/libs/hooks/games";
import { usePlayerStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";

export default function ButtonCreateRoom() {
  const createGame = useCreateGame();
  const joinRoom = useJoinRoom();
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const router = useRouter();
  const handleCreateGame = () => {
    createGame.mutate(undefined, {
      onSuccess: (room) => {
        if (!room?.id) return;
        joinRoom.mutate({ roomId: room?.id}, {
          onSuccess: (player) => {
            setPlayer(player);
            router.push(`/room/${room?.id}`);
          }
        });
      },
    });
    
  };
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <button
        className="btn btn-primary"
        onClick={handleCreateGame}
        disabled={createGame.isPending}
      >
        {createGame.isPending ? "Création..." : "Créer une partie"}
      </button>
    </div>
  );
}
