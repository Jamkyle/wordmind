import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from ".";
import { GameState } from "../models/game";
import { Room } from "../models/room";
import { identifiedWord } from "../utils/gameUtils";

export const startGameIfReady = async (roomId: string) => {
  const roomRef = doc(db, `games/${roomId}`);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) return;
  const roomData = roomSnap.data();
  const players = roomData.players || [];

  const allReady = players.every(
    (player: { isReady: boolean }) => player.isReady
  );

  if (allReady && roomData.status === "waiting") {
    await updateDoc(roomRef, { status: "ready" }); // ✅ Mark game as started
  }
};

export const startNewGame = async (roomId: string, wordToGuess: string) => {
  const gameRef = doc(db, `games/${roomId}`);
  const data = {
    wordToGuess,
    currentTurn: 0,
    guesses: [],
    status: "playing",
  };
  await updateDoc(gameRef, data);
  return data;
};

export const submitGuess = async (roomId: string, guess: string) => {
  const gameRef = doc(db, `games/${roomId}`);
  const gameSnap = await getDoc(gameRef);
  if (!gameSnap.exists()) return;
  const gameData = gameSnap.data();
  
  if (gameData.status !== "playing") return;
  const playersRef = collection(db, `games/${roomId}/players`);
  const playersSnap = await getDocs(playersRef);
  const players = playersSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { name: string; isReady: boolean }),
  }));
  const result = identifiedWord(guess, gameData.wordToGuess);
  
  const newGuesses = [...gameData.guesses, { word: guess.toLocaleLowerCase(), result }];

  const status = guess === gameData.wordToGuess ? "finished" : "playing";

  await updateDoc(gameRef, {
    guesses: newGuesses,
    status,
    currentTurn: (gameData.currentTurn + 1) % players.length,
  });

  return { word: guess, result };
};

export const subscribeToGame = (roomId: string, cb: (args: Partial<Room & GameState>) => void) => {
  const gameRef = doc(db, `games/${roomId}`);

  return onSnapshot(gameRef, (docSnap) => {
    if (!docSnap.exists()) return;

    const gameData = docSnap.data() as Partial<Room & GameState>;

    cb(gameData);
  });
};
