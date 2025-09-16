import jwt from "jsonwebtoken";

export const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1h",
  });
};
