import {
  addDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Player } from "../models/player";
import { db } from ".";

export const getPlayers = async (roomId: string): Promise<Player[]> => {
  const snapshot = await getDocs(collection(db, `games/${roomId}/players`));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Player, "id">),
  }));
};

export const addPlayerToRoom = async (
  roomId: string,
  playerName: string
): Promise<Player> => {
  const newPlayer = { name: playerName, isReady: false, score: 0 };
  const docRef = await addDoc(
    collection(db, `games/${roomId}/players`),
    newPlayer
  );
  return { id: docRef.id, ...newPlayer };
};

export const setPlayerReady = async (
  roomId: string,
  playerId: string
): Promise<void> => {
  const playerRef = doc(db, `games/${roomId}/players/${playerId}`);
  await updateDoc(playerRef, { isReady: true });
};
