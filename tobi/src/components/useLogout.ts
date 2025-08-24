// src/hooks/useLogout.ts (수정)
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { toaster } from "./ui/toaster";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    // ✨ 로그아웃 확인 창을 띄웁니다.
    const isConfirmed = window.confirm("정말 로그아웃하시겠어요?");

    if (isConfirmed) {
      try {
        await api.post("/api/auth/logout");
        localStorage.removeItem("accessToken");

        toaster.create({
          title: "로그아웃 성공",
          description: "안전하게 로그아웃되었습니다.",
          type: "success",
        });

        navigate("/login");
      } catch (error) {
        console.error("로그아웃 실패:", error);
        localStorage.removeItem("accessToken");
        toaster.create({
          title: "로그아웃 실패",
          description: "서버와 통신 오류가 발생했습니다. 다시 시도해 주세요.",
          type: "error",
        });
        navigate("/login");
      }
    }
  };

  return { logout };
};