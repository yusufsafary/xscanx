// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get("/api/healthz", (_req: any, res: any) => {
  res.json({ status: "ok" });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((_req: any, res: any) => {
  res.status(404).json({ error: "Not found" });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (req: any, res: any) => {
  app(req, res);
};
