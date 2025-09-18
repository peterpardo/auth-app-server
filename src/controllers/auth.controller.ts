import { Request, Response } from "express";
import { users } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

let userIdCounter = 1;

export const signup = (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: userIdCounter++,
    username,
    email,
    password: String(password), // TODO: NEED TO HASH WITH BCRYPT
  };

  users.push(newUser);

  return res.status(201).json({
    message: "User successfully registered",
    token: generateToken(newUser.id),
    user: { id: newUser.id, username: newUser.username, email: newUser.email },
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === String(password)
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.json({
    message: "Login successful",
    token: generateToken(user.id),
    user: { id: user.id, username: user.username, email: user.email },
  });
};
