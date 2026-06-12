import { z } from "zod";

export const mobileSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^\+?[0-9]{7,15}$/, "invalidMobile"),
});

export const emailSchema = z.object({
  value: z.string().trim().min(1, "required").email("invalidEmail"),
});

export type CredentialFormValues = z.infer<typeof mobileSchema>;
