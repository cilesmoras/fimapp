import { z } from "zod";

export const papSchema = z.object({
  code: z.string().min(4).max(45),
  name: z.string().min(1).max(250),
  description: z.string().max(250).optional(),
});

export type Pap = z.infer<typeof papSchema> & {
  id?: number;
};
