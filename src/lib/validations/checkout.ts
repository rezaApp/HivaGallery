import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "required"),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^\+?[0-9\s\-]{7,15}$/, "invalidPhone"),
  province: z.string().trim().min(1, "required"),
  city: z.string().trim().min(1, "required"),
  address: z.string().trim().min(10, "addressTooShort"),
  postalCode: z.string().trim().optional(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
