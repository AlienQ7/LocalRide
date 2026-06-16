import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(10).max(20),

  vehicleType: z.enum([
    "bike",
    "auto",
    "car",
  ]),

  vehicleNumber: z.string().min(4),

  licenseNumber: z.string().min(4),

  password: z.string().min(6),
});

export const loginSchema = z.object({
  phone: z.string(),
  password: z.string(),
});
