import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().nonempty({
    message: "Can't be empty!",
  }),
  modelId: z.string().nonempty({
    message: "Can't be empty!",
  }),
  negativePrompt: z.string().optional(),
  guidanceScale: z.coerce.number().min(1).max(20),
  width: z.coerce.number().min(32).max(1024),
  height: z.coerce.number().min(32).max(1024),
});
