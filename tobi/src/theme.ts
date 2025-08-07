// src/system.ts 또는 theme 설정 파일
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        "tobi-yellow": {
          100: { value: "#FFF8E7" }, // 아주 연한 배경
          200: { value: "#FAF4E7" }, // 25%
          300: { value: "#F4EDDC" }, // 50%
          400: { value: "#FFA336" }, // 서브 노랑
          500: { value: "#FDC63D" }, // 메인 노랑
        },
        "tobi-brown": {
          700: { value: "#5C4B3B" }, // 진한 브라운
        },
        "tobi-gray": {
          600: { value: "#999999" }, // 중간 회색
        },
        "tobi-white": {
          DEFAULT: { value: "#FFFFFF" }, // 흰색
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
