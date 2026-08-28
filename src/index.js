import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();
const origin = process.env.CORS_ORIGIN;
const app = express();
app.use(helmet());
const corsOptions = {
    origin: origin
};
app.use(cors(corsOptions));
app.use(express.json());
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.get("api/health", (_req, res) => res.json({ status: "ok" }));
export default app;
//# sourceMappingURL=index.js.map