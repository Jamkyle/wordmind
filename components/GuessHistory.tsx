import { useGameStore } from "@/store/useGameStore";
import WordDisplay from "./lineComponents/WordDisplay";

export default function GuessHistory() {
  const guesses = useGameStore(state => state.guesses);

  return (
    <div>
      <h2>Guess History</h2>
      {guesses.length === 0 ? (
        <p>No guesses yet</p>
      ) : (
        <ul>
          {guesses.map((guess, index) => (
            <li key={index}>
              <WordDisplay {...guess} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}