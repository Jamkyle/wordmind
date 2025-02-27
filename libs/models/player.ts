import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number(),
  isReady: z.boolean(),
});

export type Player = z.infer<typeof PlayerSchema>;

export type PlayerState = {
  players: Player[];
  setPlayers: (players: Player[]) => void;
};
