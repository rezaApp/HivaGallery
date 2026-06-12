import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "required"),
  email: z.string().trim().min(1, "required").email("invalidEmail"),
  message: z.string().trim().min(1, "required"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
