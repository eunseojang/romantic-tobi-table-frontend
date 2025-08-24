// src/pages/PasswordChangePage.tsx
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { toaster } from "@/components/ui/toaster";

const PasswordChangePage: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // ID 인증 핸들러 (실제 API는 없으므로 더미 로직으로 구현)

  // 비밀번호 변경 최종 제출 핸들러
  const handlePasswordChange = async () => {
    if (!password || !passwordConfirm) {
      toaster.create({
        title: "변경 실패",
        description: "비밀번호를 모두 입력해주세요.",
        type: "error",
      });
      return;
    }

    if (password !== passwordConfirm) {
      toaster.create({
        title: "변경 실패",
        description: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const requestBody = { userId, password, pass_check: passwordConfirm };
      await api.post("/api/auth/info/update", requestBody);

      toaster.create({
        title: "변경 완료",
        description: "비밀번호가 성공적으로 변경되었습니다.",
        type: "success",
      });
      navigate("/mypage"); // 변경 완료 후 마이페이지로 이동
    } catch (error) {
      console.log(error);
      const errorMessage = "비밀번호 변경에 실패했습니다.";
      toaster.create({
        title: "변경 실패",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white font-dotum relative">
      {/* 상단 헤더 */}
      <div className="w-full flex items-center p-4">
        <button onClick={() => navigate(-1)} className="cursor-pointer text-gray-700">
          <FaChevronLeft className="text-lg" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">비밀번호 변경</h1>
      </div>

      <div className="p-4 flex-grow overflow-y-auto">
        {/* 설명 문구 */}
        <p className="text-sm text-gray-500 mb-6">
          사용하던 아이디를 인증하면 비밀번호 변경을 할 수 있어요!
        </p>

        {/* 1단계: 아이디 인증 */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="현재 사용하는 아이디를 입력해주세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-grow p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDC63D] disabled:bg-gray-200"
            />
          </div>
        </div>

        {/* 2단계: 비밀번호 입력 (인증 완료 시에만 표시) */}
        {
          <div className="space-y-4">
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border  border-[#F7A400] bg-[#FFF8E7] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDC63D]"
              />
              <p className="text-sm text-gray-500 mt-1">
                새로운 비밀번호를 입력해주세요 (8자 이상, 영문+숫자 조합)
              </p>
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-3 rounded-lg border  border-[#F7A400] bg-[#FFF8E7]  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDC63D]"
              />
              <p className="text-sm text-gray-500 mt-1">
                위와 동일하게 입력해주세요
              </p>
            </div>
          </div>
        }
      </div>

      {
        <div className="w-full p-4 ">
          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className="cursor-pointer w-full py-4 bg-[#FDC63D] text-[#5C4B3B] rounded-lg shadow-md font-bold text-xl transition-colors disabled:opacity-50"
          >
            {loading ? "변경 중..." : "비밀번호 변경 완료"}
          </button>
        </div>
      }
    </div>
  );
};

export default PasswordChangePage;
