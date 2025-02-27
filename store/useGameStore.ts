import { PlayerState } from "@/libs/models/player";
import { create } from "zustand";

export const useGameStore = create<PlayerState>((set) => ({
  players: [],
  setPlayers: (players) => set({ players }),
}));
