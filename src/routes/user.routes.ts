import { Request, Response, Router } from "express";
import { AuthRequest, protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", protect, (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;

  return res.json({
    message: "Profile data accessed successfully",
    user,
  });
});

export default router;
