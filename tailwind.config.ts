import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(spinner|table|popover|checkbox|spacer).js",
    "./node_modules/@nextui-org/theme/dist/components/popover.js",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "purple-text": "#424286",
        "purple-primary": "#6161D6",
        "purple-secondary": "#EBEBFC",
        "purple-hover": "#CCCCFA",
        "purple-secondary-dark": "#181825",
        "bg-light": "#f3f5f9",
        "bg-dark": "#13121a",
        "purple-hover-dark": "#3c3d7e",
        "purple-market": "#1e1932",
        "teal-positive": "#27d0d0",
        "red-negative": "#fe2364",
        "purple-border": "#7779f8",
        "dark-modal": "#13121a",
        "light-modal": "#D0CDFD",
        "dark-modal-container": "#191932",
        "light-modal-container": "#a2a4e899",
        "dark-modal-icon": "#2c2c4a",
        "light-modal-icon": "#7a7aab",
        "light-asset": "#a2a4e833",
        "sheer-purple": "#3c3d7d15",
        "purple-button": "#a2a4e8",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
