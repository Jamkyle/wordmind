"use client";
import { useCreateGame } from "@/libs/hooks/games";

export default function ButtonCreateRoom() {
  const createGame = useCreateGame();
  const handleCreateGame = () => {
    createGame.mutate();
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
