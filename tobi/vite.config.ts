// vite.config.ts
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,ttf}"],
        // ✨ 이 부분을 추가/수정합니다.
        navigateFallback: "/", // 모든 내비게이션 요청을 루트 경로(index.html)로 되돌립니다.
        navigateFallbackDenylist: [/^\/api\//], // API 요청은 제외합니다.
      },
      manifest: {
        /* ... */
      },
    }),
  ],
});
