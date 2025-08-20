// src/pages/signup/SignUpPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // API 요청을 위해 axios 임포트
import SignUpStep1Form from "./SignUpStep1Form";
import SignUpStep2Form from "./SignUpStep2Form";
import SignUpStep3Form from "./SignUpStep3Form";
import { API_BASE_URL } from "src/assets/Env";
import { toaster } from "src/components/ui/toaster";

// 회원가입 폼 데이터 타입 정의
interface SignUpFormData {
  userId: string;
  password: string;
  birthday: string; // YYYY-MM-DD 형식으로 가정
  nickname: string;
  gender: "MALE" | "FEMALE" | "OTHER" | ""; // 실제 API 스키마에 맞게 조정
  allowNotification: boolean | null;
}

const SignUpPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  // 모든 폼 데이터를 이곳에서 관리합니다.
  const [formData, setFormData] = useState<SignUpFormData>({
    userId: "",
    password: "",
    birthday: "",
    nickname: "",
    gender: "",
    allowNotification: null,
  });

  // 폼 데이터 업데이트 함수
  const updateFormData = (fields: Partial<SignUpFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  // 다음 스텝으로 이동하는 함수
  const goToNextStep = () => {
    // 각 스텝에서 다음 버튼을 누르기 전, 해당 스텝의 유효성 검사를 수행할 수 있습니다.
    // 예: if (currentStep === 1 && (!formData.userId || !formData.password)) { /* 에러 처리 */ return; }
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      // 마지막 스텝: 회원가입 API 호출
      handleSignUpSubmit();
    }
  };

  // 이전 스텝으로 이동하는 함수
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    } else {
      navigate("/login"); // 첫 스텝에서 뒤로가면 로그인 페이지로
    }
  };

  // 회원가입 최종 제출 핸들러
  const handleSignUpSubmit = async () => {
    try {
      // 여기서는 모든 필드가 유효하다고 가정하고 API를 호출합니다.
      // 실제로는 여기에 모든 폼 데이터에 대한 최종 유효성 검사 로직을 추가해야 합니다.

      const dataToSend = {
        ...formData,
        // 필요에 따라 데이터 가공
      };

      await axios.post(`${API_BASE_URL}/api/auth/signup`, dataToSend);
      toaster.create({
        title: "회원가입 성공",
        description: "로그인 페이지로 이동합니다.",
        type: "success",
      });
      navigate("/login"); // 성공 시 로그인 페이지로 이동
    } catch (error: any) {
      console.error("회원가입 실패:", error.response?.data || error.message);
      toaster.create({
        title: "회원가입 실패",
        description: error.response?.data?.message || "다시 시도해주세요.",
        type: "error", // toaster에 type이 있다면
      });
    }
  };

  // 현재 스텝에 따라 렌더링할 폼 컴포넌트 결정
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUpStep1Form
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        );
      case 2:
        return (
          <SignUpStep2Form
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        );
      case 3:
        return (
          <SignUpStep3Form
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleSignUpSubmit}
          />
        );
      default:
        return (
          <SignUpStep1Form
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        );
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-[#FFFDF9]  font-dotum relative p-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={goToPreviousStep} // goToPreviousStep 호출
        className="absolute top-4 left-4 mt-2 text-black hover:text-gray-900 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* 헤더 섹션 */}
      <div className="mt-16 mb-16 text-left px-4">
        <p className="text-3xl font-Romance  text-black">STEP {currentStep}</p>
        <h2 className="text-3xl font-Dotum text-black">
          {currentStep === 1 && "아이디/비밀번호"}
          {currentStep === 2 && "간단한 개인정보 입력"}
          {currentStep === 3 && "알림 받기"}
        </h2>
      </div>

      {/* 현재 스텝 폼 */}
      {renderStepComponent()}
    </div>
  );
};

export default SignUpPage;
