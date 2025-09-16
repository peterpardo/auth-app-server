import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, users } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: Partial<User>;
}

export interface DecodedToken extends JwtPayload {
  id?: number;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1] as string;
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "default_secret"
      ) as DecodedToken;

      const user = users.find((u) => u.id === decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const { password, ...transformedUser } = user;

      req.user = transformedUser;

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};
