import { z } from "zod";

export const createApartmentSchema = z.object({
  name: z.string().min(1, "Apartment is required"),
  rentPrice: z.number().min(1, "Rent price must be greater than 0"),
  status: z.enum(["vacant", "occupied", "under_maintenance"]).optional(),
  description: z.string().optional(),
});

export const updateApartmentSchema = z.object({
  name: z.string().optional(),
  rentPrice: z.number().min(1, "Rent price must be greater than 0").optional(),
  status: z.enum(["vacant", "occupied", "under_maintenance"]).optional(),
  description: z.string().optional(),
});
