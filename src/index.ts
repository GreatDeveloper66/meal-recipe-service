import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { getRecipe } from "./controllers/recipeControllers.js";

dotenv.config();

const app = express();

app.use(helmet());

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());

const router = Router();
router.get("/health", (_req, res) => res.json({ status: "ok" }));
router.get("/get-recipe", getRecipe);
app.use("/api", router);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

export default app;