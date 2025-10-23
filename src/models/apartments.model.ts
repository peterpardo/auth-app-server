import { v4 as uuidv4 } from "uuid";

export type Apartment = {
  id: string;
  name: string;
  rentPrice: number;
  status: "vacant" | "occupied" | "under_maintenance";
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const apartments: Apartment[] = [
  {
    id: uuidv4(),
    name: "Unit 1A",
    rentPrice: 15000,
    status: "vacant",
    description: "1-bedroom apartment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Unit 2B",
    rentPrice: 18000,
    status: "occupied",
    description: "2-bedroom apartment with balcony",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
