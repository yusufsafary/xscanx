const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Ory domain verification
app.get("/.well-known/ory-verify.txt", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("ory-verify=orynth-573fd9e21e3442b28eaba464d36d182e\n");
});

app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = (req, res) => {
  app(req, res);
};
