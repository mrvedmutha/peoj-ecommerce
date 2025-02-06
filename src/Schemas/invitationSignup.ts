import * as z from "zod";

export const superAdminSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  token: z.string(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
  confirmPassword: z.string().min(8),
});
