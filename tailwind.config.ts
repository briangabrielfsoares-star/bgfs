import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        deep: "#071a3d",
        ocean: "#0b2a61",
        gold: "#d9b46a",
        mist: "#f5f7fb"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(7, 26, 61, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
