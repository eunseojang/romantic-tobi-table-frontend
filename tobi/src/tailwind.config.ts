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
      }, // tailwind.config.js 또는 tailwind.config.ts

      backgroundImage: {
        "tobi-gradient":
          "linear-gradient(180deg, #FFFFFF 0%, #FAF4E7 25%, #F4EDDC 50%, #FDC63D 100%)",
      },
    },
  },
  plugins: [formsPlugin],
};

export default config;
