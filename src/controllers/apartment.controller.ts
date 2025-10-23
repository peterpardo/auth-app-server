import { Request, Response } from "express";
import { Apartment, apartments } from "../models/apartments.model";
import { v4 as uuidv4 } from "uuid";
import {
  createApartmentSchema,
  updateApartmentSchema,
} from "../validators/apartmentValidators";

export const getApartments = (req: Request, res: Response) => {
  res.json(apartments);
};

export const getApartment = (req: Request, res: Response) => {
  const apartment = apartments.find((a) => a.id === req.params.id);

  if (!apartment) return res.json({ message: "Apartment not found" });

  res.json(apartment);
};

export const createApartment = (req: Request, res: Response) => {
  const parsed = createApartmentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  const newApartment: Apartment = {
    id: uuidv4(),
    name: parsed.data.name,
    rentPrice: parsed.data.rentPrice,
    status: parsed.data.status || "vacant",
    description: parsed.data.description as string,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  apartments.push(newApartment);

  res.status(201).json(newApartment);
};

export const updateApartment = (req: Request, res: Response) => {
  const index = apartments.findIndex((a) => a.id === req.params.id);
  if (index === -1)
    return res.status(400).json({ message: "Apartment not found" });

  const parsed = updateApartmentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  apartments[index] = {
    ...apartments[index],
    ...(parsed.data as Apartment),
    updatedAt: new Date(),
  };

  res.json(apartments[index]);
};

export const deleteApartment = (req: Request, res: Response) => {
  const index = apartments.findIndex((a) => a.id === req.params.id);

  if (index === -1)
    return res.status(400).json({ message: "Apartment not found" });

  const deleted = apartments.splice(index, 1);

  res.json({ message: "Apartment deleted", deleted });
};
