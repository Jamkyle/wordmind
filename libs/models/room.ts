import { z } from "zod";
import { GameState } from "./game";

export const RoomSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  status: z.enum(["waiting", "ready", "playing", "finished"]),
});

export type Room = z.infer<typeof RoomSchema>;

export type RoomAction = {
  setGameStatus: (status: Room["status"]) => void;
  setGameData: (data: Partial<GameState>) => void; 
};
