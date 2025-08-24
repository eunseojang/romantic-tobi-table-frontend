// src/pages/signup/SignUpStep1Form.tsx
import React, { useState } from "react";
import axios from "axios";
import { toaster } from "src/components/ui/toaster";
import ProgressBar from "src/components/ui/ProgressBar";
import { API_BASE_URL } from "@/Env";
import { FaChevronRight } from "react-icons/fa";

// SignUpFormData에서 필요한 필드만 가져옵니다.
interface SignUpStep1FormProps {
  formData: {
    userId: string;
    password: string;
  };
  updateFormData: (fields: Partial<SignUpStep1FormProps["formData"]>) => void;
  onNext: () => void;
}

const SignUpStep1Form: React.FC<SignUpStep1FormProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [isUserIdDuplicated, setIsUserIdDuplicated] = useState<boolean | null>(
    null
  );
  const [password, setPassword] = useState(formData.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ userId: e.target.value });
    setIsUserIdDuplicated(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    updateFormData({ password: newPassword });
    validatePassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const validatePassword = (pw: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    setPasswordValid(regex.test(pw) || pw === "");
  };

  const handleCheckUserIdDuplication = async () => {
    if (!formData.userId) {
      toaster.create({
        title: "입력 오류",
        description: "아이디를 입력해주세요.",
        type: "error",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/auth/check?userId=${formData.userId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.isTaken) {
        setIsUserIdDuplicated(true);
        toaster.create({
          title: "중복 확인",
          description: "이미 사용 중인 아이디입니다.",
          type: "warning",
        });
      } else {
        setIsUserIdDuplicated(false);
        toaster.create({
          title: "중복 확인",
          description: "사용 가능한 아이디입니다.",
          type: "success",
        });
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
      setIsUserIdDuplicated(null);
      toaster.create({
        title: "오류 발생",
        description: "중복 확인 중 오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId || !password) {
      toaster.create({
        title: "유효성 검사 실패",
        description: "아이디와 비밀번호를 모두 입력해주세요.",
        type: "error",
      });
      return;
    }
    if (isUserIdDuplicated === null || isUserIdDuplicated === true) {
      toaster.create({
        title: "유효성 검사 실패",
        description: "아이디 중복 확인 및 유효성 검사를 완료해주세요.",
        type: "error",
      });
      return;
    }
    if (!passwordValid || password !== confirmPassword) {
      toaster.create({
        title: "유효성 검사 실패",
        description: "비밀번호를 올바르게 입력했는지 확인해주세요.",
        type: "error",
      });
      return;
    }

    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col flex-grow px-4 pb-4 font-dotum"
    >
      <div className="space-y-4 flex-grow">
        {/* 아이디 입력 필드 */}
        <div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="아이디"
              value={formData.userId}
              onChange={handleUserIdChange}
              className="w-[70%] p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#FDC63D] text-sm"
            />
            <button
              type="button"
              onClick={handleCheckUserIdDuplication}
              className="bg-[#FDC63D] w-[30%] hover:bg-tobi-yellow-400 text-[#5C4B3B] py-3.5 px-3 rounded-lg shadow-sm transition duration-300 ease-in-out text-sm whitespace-nowrap"
            >
              중복 확인
            </button>
          </div>
          {isUserIdDuplicated !== null && (
            <p
              className={`text-xs mt-2 ${
                isUserIdDuplicated ? "text-red-500" : "text-green-600"
              }`}
            >
              {isUserIdDuplicated
                ? "이미 사용 중인 아이디입니다."
                : "사용 가능한 아이디입니다."}
            </p>
          )}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#FDC63D] text-sm"
          />
          <p className="text-xs text-[#999] mt-1">
            비밀번호 (영문, 숫자, 특수문자 조합)
          </p>
          {!passwordValid && password.length > 0 && (
            <p className="text-xs text-red-500 mt-1">
              비밀번호는 8자 이상, 영문, 숫자, 특수문자 조합이어야 합니다.
            </p>
          )}
        </div>

        {/* 비밀번호 확인 입력 필드 (확인용) */}
        <div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#FDC63D] text-sm"
          />
          <p className="text-xs text-[#999] mt-1">
            한번 더 동일하게 입력해주세요
          </p>
          {!passwordsMatch && confirmPassword.length > 0 && (
            <p className="text-xs text-red-500 mt-1">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>
      </div>

      <ProgressBar currentStep={1} totalSteps={3} />

      {/* 다음으로 버튼 */}
      <div className="w-full pt-4 pb-4">
        <button
          type="submit"
          className="w-full bg-[#FDC63D] hover:bg-tobi-yellow-400 text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center space-x-2 font-bold text-lg"
        >
          <span>다음으로</span>
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SignUpStep1Form;
