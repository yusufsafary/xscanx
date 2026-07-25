import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f4ede0",
        "cream-dark": "#ece4d2",
        "cream-border": "#d9cdb8",
        "green-ink": "#2a5e2a",
        "green-mid": "#3d7a3d",
        "green-light": "#a8d4a8",
        "green-pale": "#c8e6c8",
        "green-btn": "#5a9e5a",
        "ink": "#1a1a1a",
        "ink-muted": "#5a5248",
      },
      fontFamily: {
        heading: ["var(--font-archivo-black)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        body: ["var(--font-archivo)", "sans-serif"],
      },
      backgroundImage: {
        "noise": "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
