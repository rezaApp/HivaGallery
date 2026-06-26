import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^\+?[0-9]{7,15}$/;

export const credentialSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, "required")
    .refine(
      (val) => EMAIL_RE.test(val) || MOBILE_RE.test(val),
      (val) => ({
        message: val.includes("@") ? "invalidEmail" : "invalidMobile",
      })
    ),
});

export type CredentialFormValues = z.infer<typeof credentialSchema>;

export function detectMethod(value: string): "email" | "mobile" {
  return EMAIL_RE.test(value.trim()) ? "email" : "mobile";
}

// kept for any existing imports
export const mobileSchema = credentialSchema;
export const emailSchema = credentialSchema;
