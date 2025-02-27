import { z } from "zod";
import { PlayerSchema } from "./player";

export const RoomSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  players: z.array(PlayerSchema),
  status: z.enum(["waiting", "playing", "finished"]),
});

export type Room = z.infer<typeof RoomSchema>;
