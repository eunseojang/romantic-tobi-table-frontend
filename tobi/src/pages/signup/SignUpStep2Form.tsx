// src/pages/signup/SignUpStep2Form.tsx
import { toaster } from "src/components/ui/toaster";
import React from "react";
import ProgressBar from "src/components/ui/ProgressBar";

interface SignUpStep2FormProps {
  formData: {
    birthday: string;
    nickname: string;
    gender: "MALE" | "FEMALE" | "OTHER" | "";
  };
  updateFormData: (fields: Partial<SignUpStep2FormProps["formData"]>) => void;
  onNext: () => void;
}

const SignUpStep2Form: React.FC<SignUpStep2FormProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // STEP 2 유효성 검사
    if (!formData.nickname || !formData.birthday || !formData.gender) {
      toaster.create({
        title: "유효성 검사 실패",
        description: "모든 필드를 입력해주세요.",
        type: "error",
      });
      return;
    }

    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col flex-grow px-4 pb-4 font-Dotum"
    >
      <div className="space-y-4 flex-grow">
        {/* 닉네임 */}
        <input
          type="text"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={(e) => updateFormData({ nickname: e.target.value })}
          className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#FDC63D]"
        />
        {/* 생년월일 */}
        <input
          type="date"
          placeholder="생년월일 (YYYY-MM-DD)"
          value={formData.birthday}
          onChange={(e) => updateFormData({ birthday: e.target.value })}
          className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FDC63D]"
        />
        {/* 성별 선택 */}
        <div className="pt-2">
          {" "}
          {/* 상단 패딩 */}
          <p className="text-[#999] mb-1">성별을 선택해주세요</p>{" "}
          {/* 안내 텍스트 */}
          <div className="flex items-center text-[#999]">
            {/* 각 라디오 버튼 정렬 */}
            {/* 남성 */}
            <label className="flex items-center space-x-2 cursor-pointer mr-4">
              <input
                type="radio"
                name="gender"
                value="MALE"
                checked={formData.gender === "MALE"}
                onChange={(e) =>
                  updateFormData({ gender: e.target.value as "MALE" })
                }
                className="form-radio h-5 w-5 text-[#FDC63D] border-[#F7A400] focus:ring-[#F7A400]"
              />
              <span>남성</span>
            </label>
            {/* 여성 */}
            <label className="flex items-center space-x-2 cursor-pointer mr-4">
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={formData.gender === "FEMALE"}
                onChange={(e) =>
                  updateFormData({ gender: e.target.value as "FEMALE" })
                }
                className="form-radio h-5 w-5 text-[#FDC63D] border-[#F7A400] focus:ring-[#FDC63D]"
              />
              <span>여성</span>
            </label>
            {/* 선택 안 함 */}
            <label className="flex items-center space-x-2 cursor-pointer mr-4">
              <input
                type="radio"
                name="gender"
                value="OTHER" // 또는 "NONE" 등 원하는 값으로 설정
                checked={formData.gender === "OTHER"}
                onChange={(e) =>
                  updateFormData({ gender: e.target.value as "OTHER" })
                }
                className="form-radio h-5 w-5 text-[#FDC63D] border-[#F7A400] focus:ring-[#FDC63D]"
              />
              <span>선택 안 함</span>
            </label>
          </div>
        </div>
        {/* ✨ 라디오 버튼 그룹 끝 */}
      </div>

      <ProgressBar currentStep={2} totalSteps={3} />

      <div className="w-full pt-4 pb-4">
        <button
          type="submit"
          className="w-full bg-[#FDC63D] hover:bg-tobi-yellow-400 text-white  py-3 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center space-x-2"
        >
          <span>다음으로</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SignUpStep2Form;
