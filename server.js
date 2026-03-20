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

/** @type {Array<{id:string,name:string,description?:string,priceCLP:number,category:string,includes?:string[],sideOptions?:string[]}>} */
const menuData = [
  {
    id: "pollo-01",
    name: "Pollo a la plancha",
    description: "Pollo jugoso, estilo casero.",
    priceCLP: 6990,
    category: "Menú del día",
    includes: ["Ensalada mixta (puede variar)", "Pan", "Postre del día"],
    sideOptions: ["Papas fritas", "Arroz"],
  },
  {
    id: "pollo-02",
    name: "Pollo al horno",
    description: "Sazonado con hierbas, dorado al horno.",
    priceCLP: 6990,
    category: "Menú del día",
    includes: ["Ensalada mixta (puede variar)", "Pan", "Postre del día"],
    sideOptions: ["Papas fritas", "Arroz"],
  },
  {
    id: "pollo-03",
    name: "Pollo apanado crujiente",
    description: "Apanado casero, bien crocante.",
    priceCLP: 7490,
    category: "Menú del día",
    includes: ["Ensalada mixta (puede variar)", "Pan", "Postre del día"],
    sideOptions: ["Papas fritas", "Arroz"],
  },
  {
    id: "pollo-04",
    name: "Pollo en salsa (del día)",
    description: "Salsa casera del día (ej: champiñón / mostaza / BBQ suave).",
    priceCLP: 7490,
    category: "Menú del día",
    includes: ["Ensalada mixta (puede variar)", "Pan", "Postre del día"],
    sideOptions: ["Papas fritas", "Arroz"],
  },
];

// Basic rate limiting to protect static file serving
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200,            // max requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// API: menu items
app.get("/api/menu", (_req, res) => {
  res.json(menuData);
});

// Serve static files from the dist directory
app.use(express.static(distDir));

// SPA fallback: for any route not matched by static files, serve index.html
app.get("*", (_req, res) => {
  res.sendFile(join(distDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
