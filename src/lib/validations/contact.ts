import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "required"),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^\+?[0-9\s\-]{7,15}$/, "invalidPhone"),
  message: z.string().trim().min(1, "required"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
