export type SideChoice = "Papas fritas" | "Arroz";
export type MenuCategory = "Menú del día" | "Extras";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  priceCLP: number;
  category: MenuCategory;
  includes?: string[];
  sideOptions?: SideChoice[];
};

export const menu: MenuItem[] = [
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
