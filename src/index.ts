import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(helmet());

const corsOptions = {
    origin: process.env.CORS_ORIGIN
}
app.use(cors(corsOptions));

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;