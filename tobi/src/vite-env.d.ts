// src/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string; // ✨ 이 줄을 추가합니다.
  // 만약 다른 VITE_ 접두사 환경 변수가 있다면 여기에 추가할 수 있습니다.
  // readonly VITE_ANOTHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}