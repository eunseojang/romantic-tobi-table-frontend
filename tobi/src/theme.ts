// src/system.ts 또는 theme 설정 파일
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          "500": { value: "tomato" },
        },
      },
      fonts: {
        body: { value: "Dotum, sans-serif" },
        heading: { value: "Romance, sans-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
