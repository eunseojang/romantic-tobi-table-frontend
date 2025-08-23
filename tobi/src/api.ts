// src/api/index.ts
import axios from "axios";

// 환경 변수에서 백엔드 URL 가져오기
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// 환경 변수가 설정되지 않았다면 에러를 발생시켜 개발자가 문제를 알 수 있도록 함
if (!BACKEND_URL) {
  throw new Error("환경 변수 VITE_BACKEND_URL이 설정되지 않았습니다.");
}

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    // ngrok 경고를 건너뛰기 위한 헤더 (개발 시 유용)
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10초 타임아웃
});

// 요청 인터셉터: 모든 API 요청이 보내지기 전에 실행
api.interceptors.request.use(
  (config) => {
    // 1. localStorage에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");

    // 2. 토큰이 존재하면 Authorization 헤더에 추가
    if (accessToken) {
      // API 규격에 따라 "Bearer "를 포함시키거나 제거할 수 있습니다.
      // 여기서는 "Bearer "를 사용합니다.
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 모든 API 응답이 도착한 후에 실행
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized 에러 발생 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      // 토큰 만료 등 인증 실패 시 로그인 페이지로 이동
      console.log("인증 실패. 로그인 페이지로 이동합니다.");
      // window.location.href = '/login'; // 페이지 새로고침과 함께 리다이렉트
    }
    return Promise.reject(error);
  }
);

export default api;
