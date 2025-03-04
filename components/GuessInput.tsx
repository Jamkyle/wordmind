"use client";

import { useState } from "react";
import { useGameStore, usePlayerStore } from "@/store/useGameStore";
import { useSubmitGuess } from "@/libs/hooks/games";

export default function GuessInput({ roomId }: { roomId: string }) {
  const [guess, setGuess] = useState("");
  const submitGuess = useSubmitGuess();
  const status = useGameStore(state => state.status);
  // const { id: userId } = usePlayerStore();

  const handleGuess = () => {
    if (guess.length !== 5) return alert("Enter a 5-letter word");
    submitGuess.mutate({ roomId, guess });
    setGuess("");
  };

  return (
    <div>
      {status === "playing" && (
        <div>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={5}
            placeholder="Enter word"
          />
          <button onClick={handleGuess} disabled={submitGuess.isPending}>
            {submitGuess.isPending ? "Checking..." : "Submit"}
          </button>
        </div>
      )}
      {status === "finished" && <p>Game Over!</p>}
    </div>
  );
}
