import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  createApartment,
  deleteApartment,
  getApartment,
  getApartments,
  updateApartment,
} from "../controllers/apartment.controller";

const router = Router();
router.use(protect);

router.get("/", getApartments);
router.get("/:id", getApartment);
router.post("/", createApartment);
router.put("/:id", updateApartment);
router.delete("/:id", deleteApartment);

export default router;
