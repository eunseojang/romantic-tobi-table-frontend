// tailwind.config.ts
import type { Config } from "tailwindcss";
import { colors } from "./theme";
import formsPlugin from "@tailwindcss/forms"; // ✨ 임포트 확인

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        dotum: ["Dotum", "sans-serif"],
        romance: ["Romance", "sans-serif"],
      },
    },
  },
  plugins: [formsPlugin],
};

export default config;
