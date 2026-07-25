import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/healthz", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Not found" });
});

export default (req: VercelRequest, res: VercelResponse) => {
  app(req as unknown as Request, res as unknown as Response);
};
