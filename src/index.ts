import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import apartmentRoutes from "./routes/apartment.routes";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/apartments", apartmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
