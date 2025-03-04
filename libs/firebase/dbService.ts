import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import { Room } from "@/libs/models/room";
import { Player } from "../models/player";

export async function getRooms(): Promise<Room[]> {
  const roomsRef = collection(db, "games");
  const snapshot = await getDocs(roomsRef);
  const rooms = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Room, "id">),
  }));
  return rooms;
}

export function getRealTimeRooms(cb: (rooms: Room[]) => void): () => void {
  const roomsRef = collection(db, "games");
  return onSnapshot(roomsRef, (snapshot) => {
    const updatedRooms = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Room, "id">),
    }));
    cb(updatedRooms);
  });
}

export async function getRoomById(id: string) {
  const game = await getDoc(doc(db, "games", id));
  return game ? { id: game.id, ...(game.data() as Omit<Room, "id">) } : null;
}

export async function createRoom(data: Omit<Room, "id">) {
  const docRef = await addDoc(collection(db, "games"), data);
  return { id: docRef.id, ...data };
}

export async function deleteRoom(id: string) {
  await setDoc(doc(db, "games", id), { status: "finished" });
}

// export async function joinRoom(roomId: string, player?: Player | null) {
//   const roomRef = doc(db, "games", roomId);
//   const roomDoc = await getDoc(roomRef);
//   const roomData = roomDoc.data();

//   const existingPlayers = roomData?.players || [];

//   const updatedPlayers = existingPlayers.some((p: Player) => p.id === player?.id)
//   ? existingPlayers // Si le joueur existe déjà, on ne change rien
//   : [...existingPlayers, player];

//   await updateDoc(roomRef, {
//     players: updatedPlayers,
//   });
// }

export async function leaveRoom(roomId: string, player: Player) {
  const roomRef = doc(db, "games", roomId);
  const roomDoc = await getDoc(roomRef);
  const roomData = roomDoc.data();

  const existingPlayers = roomData?.players || [];

  const updatedPlayers = existingPlayers.filter(
    (p: Player) => p.id !== player.id
  );

  await updateDoc(roomRef, {
    players: updatedPlayers,
  });
}

export async function updateRoom(roomId: string, data: Room) {
  await updateDoc(doc(db, "games", roomId), data);
}

export async function startGame(roomId: string) {
  await updateDoc(doc(db, "games", roomId), { status: "started" });
}

export async function endGame(roomId: string) {
  await updateDoc(doc(db, "games", roomId), { status: "finished" });
}
