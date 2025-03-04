import { Game, GameAction, GamesAction, GameState } from "@/libs/models/game";
import {
  Player,
  PlayerAction,
  PlayersState,
  PlayerState,
} from "@/libs/models/player";
import { Room, RoomAction } from "@/libs/models/room";
import { randomName } from "@/libs/utils/playerUtils";
import { create } from "zustand";

export const usePlayerStore = create<PlayerState & PlayerAction>((set) => ({
  id: null,
  name: randomName?.(),
  score: 0,
  isReady: false,
  setPlayer: (player: Player) => set({ ...player }),
  setPlayerName: (name: string) => set({ name }),
  setPlayerId: (id: string) => set({ id }),
  setPlayerScore: (score: number) => set({ score }),
  toggleLocalReady: () => set((state) => ({ isReady: !state.isReady })),
  resetPlayer: () => set({ name: randomName(), score: 0, isReady: false }),
}));

export const usePlayersStore = create<PlayersState>((set) => ({
  playersByRoom: {},
  setPlayers: (roomId, players) =>
    set((state) => ({
      playersByRoom: {
        ...state.playersByRoom,
        [roomId]: players,
      },
    })),
  markPlayerReady: (roomId, playerId) =>
    set((state) => ({
      playersByRoom: {
        ...state.playersByRoom,
        [roomId]: state.playersByRoom[roomId]?.map((player) =>
          player.id === playerId
            ? { ...player, isReady: player.isReady }
            : player
        ),
      },
    })),
}));

export const useGameStore = create<Omit<Room, "id"> & GameAction & GameState>((set) => ({
  wordToGuess: "",
  createdAt: new Date(),
  currentTurn: 0,
  guesses: [],
  status: "waiting",
  setGameStatus: (status) => set({ status }),
  setGameData: (data) => set((state) => ({ ...state, ...data })),
}));

export const useGamesStore = create<Game & GamesAction>((set) => ({
  gameStatusByRooms: [],
  setGameStatusByRooms: (roomId, status) =>
    set((state) => ({
      gameStatusByRooms: state.gameStatusByRooms.map((game) => {
        if (game.id === roomId) {
          return { ...game, status };
        }
        return game;
      }),
    })),
}));
