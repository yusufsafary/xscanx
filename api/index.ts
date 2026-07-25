import express from "express";
import cors from "cors";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
