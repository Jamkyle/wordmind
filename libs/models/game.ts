import { z } from "zod";
import { Room, RoomSchema } from "./room";

export const GameSchema = z.object({
  gameStatusByRooms: z.array(RoomSchema),
});

export type Game = z.infer<typeof GameSchema>;

export type GamesAction = {
  setGameStatusByRooms: (roomId: string, status: Room["status"]) => void;
};

export const GuessResultSchema = z.enum(['correct','misplaced','incorrect'])

export const GuessSchema = z.object({
  word: z.string(),
  result: z.array(GuessResultSchema),
});
export type Guess = z.infer<typeof GuessSchema>;

export const GameStateSchema = z.object({
  wordToGuess: z.string(),
  currentTurn: z.number(),
  guesses: z.array(GuessSchema),
});

export const GameActionSchema = z.object({
  setGameStatus: z.function().args(z.enum(["waiting", "ready", "playing", "finished"])),
  setGameData: z.function().args(GameStateSchema.partial()),
});

export type GameState = z.infer<
  typeof GameStateSchema
>;

export type GameAction = z.infer<typeof GameActionSchema>;