import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f1f5f9",
        primary: "#3b82f6",
        secondary: "#1e293b",
        accent: "#06b6d4",
      },
    },
  },
  plugins: [],
};

export default config;
