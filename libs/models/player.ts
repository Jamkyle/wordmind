import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string(),
  score: z.number(),
  isReady: z.boolean(),
});

export type Player = z.infer<typeof PlayerSchema>;

export const PlayerKeys = z.enum(
  Object.keys(PlayerSchema.shape) as [keyof Player]
);

export type PlayerKeys = z.infer<typeof PlayerKeys>;

export type PlayerState = {
  name: string;
  score: number;
  isReady: boolean;
  id: string | null;
};

export type PlayerAction = {
  setPlayer: (player: Player) => void;
  setPlayerName: (name: string) => void;
  toggleLocalReady: () => void;
  setPlayerId: (id: string) => void;
}

export type PlayersState = {
  playersByRoom: Record<string, Player[]>;
  setPlayers: (roomId: string, players: Player[]) => void;
  markPlayerReady: (roomId: string, playerId: string) => void;
};
