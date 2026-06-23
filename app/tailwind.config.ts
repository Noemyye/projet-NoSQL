import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cl: {
          bg:           "#14181C",
          surface:      "#2C3440",
          surface2:     "#384554",
          border:       "#456",
          green:        "#00AB6C",
          "green-dim":  "#00804F",
          slate:        "#9AB",
          white:        "#FFFFFF",
          orange:       "#F90",
          red:          "#C00",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
