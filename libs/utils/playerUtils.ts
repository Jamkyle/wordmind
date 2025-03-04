import { usePlayerStore } from "@/store/useGameStore";
import { getPlayers } from "../firebase/playerService";

export const randomName = () => {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Kate",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Quinn",
    "Rachel",
    "Sam",
    "Tara",
    "Ulysses",
    "Violet",
    "William",
    "Xander",
    "Yvonne",
    "Zoe",
  ];

  return `${names[Math.floor(Math.random() * names.length)]}-${Math.random()
    .toString(36)
    .substring(2, 6)}`;
};

export const checkPlayerExists = async (
  roomId: string,
  playerName: string
): Promise<boolean> => {
  const players = await getPlayers(roomId);
  return players.some((player) => player.name === playerName);
};

export const getPlayer = () => {
  const state = usePlayerStore.getState();
  return {
    id: state.id,
    name: state.name,
    score: state.score,
    isReady: state.isReady,
  };
};
