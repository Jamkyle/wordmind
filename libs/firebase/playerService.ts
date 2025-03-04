import {
  addDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { Player } from "../models/player";
import { db } from ".";
import { getPlayer } from "../utils/playerUtils";

export const getPlayers = async (roomId: string): Promise<Player[]> => {
  const snapshot = await getDocs(collection(db, `games/${roomId}/players`));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Player, "id">),
  }));
};

export const addPlayerToRoom = async (roomId: string): Promise<Player> => {
  const newPlayer = getPlayer();
  const playerRef = doc(db, `games/${roomId}/players/${newPlayer.id}`);
  await setDoc(playerRef, newPlayer);
  return newPlayer;
};

export const setPlayerReady = async (
  roomId: string,
  playerId: string
): Promise<void | boolean> => {
  const playerRef = doc(db, `games/${roomId}/players/${playerId}`);
  const playerSnap = await getDoc(playerRef);

  if (!playerSnap.exists()) return;
  const currentStatus = playerSnap.data().isReady;

  await updateDoc(playerRef, { isReady: !currentStatus });
  return !currentStatus
};

export const listenToPlayers = (
  roomId: string,
  callback: (players: Player[]) => void
): (() => void) => {
  const playersRef = collection(db, `games/${roomId}/players`);
  let lastSnapShot: Player[] = [];

  return onSnapshot(playersRef, (snapshot) => {
    const players = snapshot.docs.map((player) => ({
      id: player.id,
      ...(player.data() as Omit<Player, "id">),
    }));

    if (JSON.stringify(players) !== JSON.stringify(lastSnapShot)) {
      lastSnapShot = players;
      callback(players);
    }
  });
};
