export type DecorationKind =
  | "butterfly"
  | "sparkle"
  | "flower"
  | "firefly"
  | "cloud"
  | "fish"
  | "leaf"
  | "petal"
  | "wave"
  | "shell"
  | "lantern"
  | "star"
  | "balloon";

export type DecorationSpec = {
  kind: DecorationKind;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity?: number;
};

export type BackgroundTheme = {
  id: number;
  name: string;
  icon: string;
  palette: {
    skyTop: string;
    skyBottom: string;
    horizon: string;
    groundTop: string;
    groundBottom: string;
    accent: string;
    gateGlow: string;
    panel: string;
  };
  scene: string;
  decorations: DecorationSpec[];
};

const fill = (items: DecorationSpec[]) => items;

export const gateBackgrounds: BackgroundTheme[] = [
  {
    id: 1,
    name: "Flower Garden",
    icon: "Flower2",
    scene: "garden",
    palette: {
      skyTop: "#fde7f1",
      skyBottom: "#fff7d1",
      horizon: "#ffd8ec",
      groundTop: "#b8edc6",
      groundBottom: "#74b975",
      accent: "#ff91bf",
      gateGlow: "rgba(255, 184, 219, 0.75)",
      panel: "rgba(255, 247, 253, 0.74)",
    },
    decorations: fill([
      { kind: "butterfly", x: 14, y: 24, size: 26, delay: 0, duration: 9 },
      { kind: "butterfly", x: 83, y: 32, size: 22, delay: 1.8, duration: 8 },
      { kind: "flower", x: 9, y: 83, size: 28, delay: 0.3, duration: 7 },
      { kind: "flower", x: 21, y: 88, size: 24, delay: 1.4, duration: 8 },
      { kind: "flower", x: 76, y: 86, size: 32, delay: 0.8, duration: 8 },
      { kind: "sparkle", x: 39, y: 20, size: 14, delay: 0.5, duration: 5 },
      { kind: "sparkle", x: 61, y: 15, size: 12, delay: 1, duration: 6 },
      { kind: "firefly", x: 72, y: 52, size: 10, delay: 1.6, duration: 5 },
    ]),
  },
  {
    id: 2,
    name: "Moon Lake",
    icon: "MoonStar",
    scene: "lake",
    palette: {
      skyTop: "#133366",
      skyBottom: "#5160a8",
      horizon: "#96a9ec",
      groundTop: "#6574c3",
      groundBottom: "#2a2f5a",
      accent: "#d7dfff",
      gateGlow: "rgba(201, 217, 255, 0.82)",
      panel: "rgba(245, 248, 255, 0.68)",
    },
    decorations: fill([
      { kind: "star", x: 18, y: 17, size: 12, delay: 0.5, duration: 4 },
      { kind: "star", x: 71, y: 12, size: 15, delay: 1.2, duration: 5 },
      { kind: "star", x: 85, y: 26, size: 10, delay: 1.6, duration: 4.6 },
      { kind: "fish", x: 17, y: 69, size: 22, delay: 0.2, duration: 7 },
      { kind: "fish", x: 80, y: 73, size: 18, delay: 0.8, duration: 6.5 },
      { kind: "sparkle", x: 53, y: 49, size: 12, delay: 0.4, duration: 6 },
      { kind: "cloud", x: 32, y: 21, size: 56, delay: 0.7, duration: 13, opacity: 0.38 },
      { kind: "flower", x: 69, y: 78, size: 22, delay: 1, duration: 7 },
    ]),
  },
  {
    id: 3,
    name: "Bunny Forest",
    icon: "TreePine",
    scene: "forest",
    palette: {
      skyTop: "#cce9b8",
      skyBottom: "#fff3c4",
      horizon: "#f6d791",
      groundTop: "#85c37a",
      groundBottom: "#44633a",
      accent: "#fff0ca",
      gateGlow: "rgba(255, 240, 198, 0.72)",
      panel: "rgba(255, 250, 235, 0.74)",
    },
    decorations: fill([
      { kind: "leaf", x: 12, y: 18, size: 22, delay: 0.5, duration: 9 },
      { kind: "leaf", x: 82, y: 19, size: 24, delay: 1, duration: 9.5 },
      { kind: "sparkle", x: 31, y: 31, size: 12, delay: 0.2, duration: 5 },
      { kind: "sparkle", x: 57, y: 23, size: 13, delay: 1.2, duration: 6 },
      { kind: "flower", x: 24, y: 87, size: 20, delay: 0.7, duration: 7 },
      { kind: "flower", x: 74, y: 85, size: 20, delay: 1.1, duration: 8 },
      { kind: "firefly", x: 66, y: 47, size: 10, delay: 0.8, duration: 5 },
      { kind: "cloud", x: 44, y: 16, size: 48, delay: 0.3, duration: 14, opacity: 0.25 },
    ]),
  },
  {
    id: 4,
    name: "Windy Flower Field",
    icon: "Wind",
    scene: "field",
    palette: {
      skyTop: "#dbf2ff",
      skyBottom: "#fff7e7",
      horizon: "#fff4c9",
      groundTop: "#bee68d",
      groundBottom: "#8fc56b",
      accent: "#fffefa",
      gateGlow: "rgba(255, 255, 255, 0.72)",
      panel: "rgba(255, 252, 244, 0.74)",
    },
    decorations: fill([
      { kind: "cloud", x: 18, y: 18, size: 64, delay: 0.4, duration: 15, opacity: 0.52 },
      { kind: "cloud", x: 71, y: 20, size: 58, delay: 1.4, duration: 13, opacity: 0.42 },
      { kind: "petal", x: 26, y: 35, size: 18, delay: 0.6, duration: 8 },
      { kind: "petal", x: 58, y: 28, size: 15, delay: 1.3, duration: 9 },
      { kind: "petal", x: 77, y: 40, size: 20, delay: 0.1, duration: 7.5 },
      { kind: "flower", x: 11, y: 87, size: 28, delay: 0.4, duration: 7 },
      { kind: "flower", x: 51, y: 89, size: 22, delay: 1.2, duration: 8 },
      { kind: "sparkle", x: 43, y: 17, size: 11, delay: 1, duration: 4.5 },
    ]),
  },
  {
    id: 5,
    name: "Picnic Memory",
    icon: "UtensilsCrossed",
    scene: "picnic",
    palette: {
      skyTop: "#ffe8d5",
      skyBottom: "#fff6da",
      horizon: "#ffd6c4",
      groundTop: "#f2d18a",
      groundBottom: "#cb9559",
      accent: "#ffdca8",
      gateGlow: "rgba(255, 219, 161, 0.78)",
      panel: "rgba(255, 248, 238, 0.78)",
    },
    decorations: fill([
      { kind: "sparkle", x: 18, y: 18, size: 12, delay: 0.7, duration: 4.5 },
      { kind: "sparkle", x: 82, y: 24, size: 11, delay: 1.4, duration: 5.4 },
      { kind: "firefly", x: 25, y: 47, size: 10, delay: 0.5, duration: 6 },
      { kind: "firefly", x: 73, y: 44, size: 11, delay: 0.9, duration: 6.5 },
      { kind: "flower", x: 14, y: 83, size: 22, delay: 0.2, duration: 7 },
      { kind: "flower", x: 82, y: 86, size: 26, delay: 1.1, duration: 8 },
      { kind: "petal", x: 49, y: 31, size: 18, delay: 1.5, duration: 8.5 },
      { kind: "cloud", x: 50, y: 18, size: 54, delay: 0.8, duration: 13, opacity: 0.35 },
    ]),
  },
  {
    id: 6,
    name: "Seaside Night",
    icon: "Waves",
    scene: "seaside",
    palette: {
      skyTop: "#1b2759",
      skyBottom: "#54489a",
      horizon: "#6da3d9",
      groundTop: "#1c6ba8",
      groundBottom: "#113459",
      accent: "#b9dcff",
      gateGlow: "rgba(167, 221, 255, 0.76)",
      panel: "rgba(238, 247, 255, 0.66)",
    },
    decorations: fill([
      { kind: "star", x: 14, y: 16, size: 11, delay: 0.5, duration: 4.1 },
      { kind: "star", x: 61, y: 13, size: 13, delay: 1, duration: 4.8 },
      { kind: "wave", x: 23, y: 78, size: 60, delay: 0.4, duration: 6.4 },
      { kind: "wave", x: 66, y: 82, size: 62, delay: 1.2, duration: 6.8 },
      { kind: "shell", x: 11, y: 90, size: 18, delay: 0.8, duration: 7 },
      { kind: "shell", x: 79, y: 88, size: 18, delay: 1.5, duration: 7.3 },
      { kind: "sparkle", x: 45, y: 52, size: 14, delay: 0.2, duration: 5.4 },
      { kind: "cloud", x: 36, y: 21, size: 48, delay: 0.7, duration: 13, opacity: 0.2 },
    ]),
  },
  {
    id: 7,
    name: "Lantern Garden",
    icon: "Lamp",
    scene: "lantern",
    palette: {
      skyTop: "#452865",
      skyBottom: "#8e4b83",
      horizon: "#f1a96d",
      groundTop: "#77528b",
      groundBottom: "#432345",
      accent: "#ffd38f",
      gateGlow: "rgba(255, 207, 135, 0.86)",
      panel: "rgba(255, 244, 225, 0.7)",
    },
    decorations: fill([
      { kind: "lantern", x: 19, y: 19, size: 24, delay: 0.3, duration: 7.4 },
      { kind: "lantern", x: 41, y: 14, size: 28, delay: 1.1, duration: 8.2 },
      { kind: "lantern", x: 76, y: 22, size: 24, delay: 0.7, duration: 7.8 },
      { kind: "sparkle", x: 28, y: 43, size: 11, delay: 1, duration: 5 },
      { kind: "sparkle", x: 70, y: 39, size: 13, delay: 1.6, duration: 5.5 },
      { kind: "flower", x: 15, y: 85, size: 20, delay: 0.2, duration: 6.5 },
      { kind: "flower", x: 81, y: 88, size: 24, delay: 0.9, duration: 7.3 },
      { kind: "firefly", x: 57, y: 58, size: 10, delay: 0.5, duration: 5.4 },
    ]),
  },
  {
    id: 8,
    name: "Cloud Dream",
    icon: "Cloud",
    scene: "cloud",
    palette: {
      skyTop: "#e4f4ff",
      skyBottom: "#ffeaf8",
      horizon: "#f3d6ff",
      groundTop: "#ffffff",
      groundBottom: "#d8e8ff",
      accent: "#ffffff",
      gateGlow: "rgba(255, 255, 255, 0.82)",
      panel: "rgba(255, 255, 255, 0.76)",
    },
    decorations: fill([
      { kind: "cloud", x: 16, y: 26, size: 72, delay: 0.4, duration: 14, opacity: 0.7 },
      { kind: "cloud", x: 52, y: 18, size: 82, delay: 1.2, duration: 15, opacity: 0.78 },
      { kind: "cloud", x: 78, y: 31, size: 60, delay: 0.8, duration: 12.8, opacity: 0.68 },
      { kind: "star", x: 26, y: 13, size: 11, delay: 1.3, duration: 4.5 },
      { kind: "star", x: 63, y: 12, size: 12, delay: 0.7, duration: 4.8 },
      { kind: "sparkle", x: 42, y: 42, size: 12, delay: 0.5, duration: 5.3 },
      { kind: "sparkle", x: 74, y: 53, size: 12, delay: 1.6, duration: 5.9 },
      { kind: "petal", x: 55, y: 31, size: 18, delay: 0.2, duration: 8.2 },
    ]),
  },
  {
    id: 9,
    name: "Star Path",
    icon: "Sparkles",
    scene: "starpath",
    palette: {
      skyTop: "#0b173e",
      skyBottom: "#40276d",
      horizon: "#7457af",
      groundTop: "#2e2d68",
      groundBottom: "#0d0f2e",
      accent: "#ffd783",
      gateGlow: "rgba(255, 223, 132, 0.82)",
      panel: "rgba(247, 241, 255, 0.68)",
    },
    decorations: fill([
      { kind: "star", x: 11, y: 15, size: 12, delay: 0.6, duration: 4.5 },
      { kind: "star", x: 29, y: 11, size: 10, delay: 1.1, duration: 4.1 },
      { kind: "star", x: 59, y: 18, size: 14, delay: 1.4, duration: 5.1 },
      { kind: "star", x: 82, y: 12, size: 12, delay: 0.2, duration: 4.2 },
      { kind: "sparkle", x: 21, y: 62, size: 14, delay: 0.3, duration: 5.4 },
      { kind: "sparkle", x: 76, y: 57, size: 16, delay: 0.9, duration: 5.6 },
      { kind: "cloud", x: 46, y: 27, size: 54, delay: 0.5, duration: 13, opacity: 0.14 },
      { kind: "petal", x: 51, y: 44, size: 16, delay: 1.7, duration: 8.2 },
    ]),
  },
  {
    id: 10,
    name: "Birthday Stage",
    icon: "Gift",
    scene: "stage",
    palette: {
      skyTop: "#2d1e56",
      skyBottom: "#f06f92",
      horizon: "#ffcf8c",
      groundTop: "#ffd59c",
      groundBottom: "#b45f72",
      accent: "#fff4d6",
      gateGlow: "rgba(255, 231, 176, 0.86)",
      panel: "rgba(255, 246, 230, 0.78)",
    },
    decorations: fill([
      { kind: "balloon", x: 18, y: 24, size: 28, delay: 0.5, duration: 9 },
      { kind: "balloon", x: 82, y: 28, size: 32, delay: 1.2, duration: 10 },
      { kind: "sparkle", x: 31, y: 16, size: 13, delay: 0.4, duration: 5.2 },
      { kind: "sparkle", x: 66, y: 19, size: 12, delay: 1.6, duration: 5.5 },
      { kind: "star", x: 53, y: 10, size: 12, delay: 0.8, duration: 4.5 },
      { kind: "flower", x: 15, y: 87, size: 24, delay: 0.2, duration: 6.7 },
      { kind: "flower", x: 85, y: 89, size: 24, delay: 1.4, duration: 7.1 },
      { kind: "petal", x: 50, y: 37, size: 18, delay: 0.9, duration: 8.1 },
    ]),
  },
];

export function getBackgroundByGate(gateId: number) {
  return gateBackgrounds.find((item) => item.id === gateId) ?? gateBackgrounds[0];
}
