import { z } from "zod";

export const LetterSchema = z.object({
  letter: z.string().length(1),
  color: z.enum(["correct", "misplaced", "incorrect"]),
});

export type LetterBox = z.infer<typeof LetterSchema>;
