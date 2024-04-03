import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "purple-text": "#424286",
        "purple-primary": "#6161D6",
        "purple-secondary": "#EBEBFC",
        "purple-hover": "#CCCCFA",
        "purple-secondary-dark": "#181825",
        "bg-light": "#f3f5f9",
        "bg-dark": "#13121a",
        "purple-hover-dark": "#3c3d7e"
      },
    },
  },
  plugins: [],
};
export default config;
