// src/pages/LoginPage.tsx
import { PwaInstallButton } from "@/PwaInstallButton";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/Env";
import { toaster } from "src/components/ui/toaster";

interface LoginFormData {
  userId: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = React.useState<LoginFormData>({
    userId: "",
    password: "",
  });
  const navigate = useNavigate();
  const updateFormData = (fields: Partial<LoginFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleLogin = async () => {
    // 로그인 로직을 여기에 추가합니다.
    if (!formData.userId) {
      toaster.create({
        title: "입력 오류",
        description: "아이디를 입력해주세요.",
        type: "error",
      });
      return;
    }
    if (!formData.password) {
      toaster.create({
        title: "입력 오류",
        description: "비밀번호를 입력해주세요.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
        }
        toaster.create({
          title: "로그인 성공",
          description: "메인페이지로 이동합니다.",
          type: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);

      toaster.create({
        title: "오류 발생",
        description: "아이디와 비밀번호가 맞는지 확인해보세요.",
        type: "error",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#FFFDF9] font-Dotum">
      <h1 className="font-Romance text-4xl text-[#F7A400] mb-12 mt-16">
        낭만 토미의 밥상
      </h1>
      {/* 로그인 폼 */}
      <div className="w-full max-w-xs space-y-4">
        {/* 아이디 입력 필드 */}
        <input
          type="text"
          placeholder="아이디"
          value={formData.userId}
          onChange={(e) => updateFormData({ userId: e.target.value })}
          className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-tobi-yellow-500"
        />
        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-tobi-yellow-500"
        />
        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#FDC63D] hover:bg-tobi-yellow-400 text-[#5C4B3B]  py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          로그인
        </button>
      </div>
      {/* 하단 링크 영역 (비밀번호 찾기, 회원가입) */}
      <div className="flex justify-center w-full mt-2 space-x-4 text-sm text-[#999]">
        {/* <a href="#" className="hover:underline">
          비밀번호 찾기
        </a> */}
        <div
          onClick={() => navigate("/signup")}
          className="hover:underline text-[#F7A400] cursor-pointer"
        >
          회원가입
        </div>
      </div>
      {/* 하단 여백 (모바일 하단 바 등을 위한) */}
      <div className="flex-grow"></div> <PwaInstallButton />
      {/* 남은 공간을 채워서 콘텐츠를 상단에 배치 */}
      <div className="h-10"></div> {/* 하단 여백 */}
    </div>
  );
};

export default LoginPage;
