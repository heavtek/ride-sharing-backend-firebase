import { z } from "zod";

export const driverSchema = z.object({
  vehicle: z.object({
    model: z.string().min(2),
    licenseNumber: z.string().min(5),
  }),
});