// @ts-check
import express from "express";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distDir = join(__dirname, "dist");

// Basic rate limiting to protect static file serving
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200,            // max requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Serve static files from the dist directory
app.use(express.static(distDir));

// SPA fallback: for any route not matched by static files, serve index.html
app.get("*", (_req, res) => {
  res.sendFile(join(distDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
