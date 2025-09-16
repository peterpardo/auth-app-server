import { Request, Response, Router } from "express";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", protect, (req: Request, res: Response) => {
  return res.json({
    message: "Profile data accessed successfully",
    user: (req as any).user,
  });
});

export default router;
