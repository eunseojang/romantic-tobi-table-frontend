// src/pages/signup/SignUpStep2Form.tsx

import React from "react";
import { toaster } from "src/components/ui/toaster";
import ProgressBar from "src/components/ui/ProgressBar";
import DatePicker from "react-datepicker"; // ✨ DatePicker 임포트
import "react-datepicker/dist/react-datepicker.css"; // ✨ DatePicker CSS 임포트
import { format } from "date-fns";

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
      className="w-full flex flex-col flex-grow px-4 pb-4 font-dotum"
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
        <DatePicker
          selected={formData.birthday ? new Date(formData.birthday) : null}
          onChange={(date) =>
            updateFormData({ birthday: date ? format(date, "yyyy-MM-dd") : "" })
          }
          placeholderText="생년월일 (YYYY-MM-DD)"
          dateFormat="yyyy-MM-dd"
          className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FDC63D]"
          wrapperClassName="w-full"
        />
        {/* 성별 선택 */}
        <div className="pt-2">
          <p className="text-gray-700 mb-1">성별을 선택해주세요</p>
          <div className="flex justify-between items-center text-gray-700">
            <label className="flex items-center space-x-2 cursor-pointer">
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
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={formData.gender === "FEMALE"}
                onChange={(e) =>
                  updateFormData({ gender: e.target.value as "FEMALE" })
                }
                className="form-radio h-5 w-5 text-[#FDC63D] border-[#F7A400] focus:ring-[#F7A400]"
              />
              <span>여성</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="OTHER"
                checked={formData.gender === "OTHER"}
                onChange={(e) =>
                  updateFormData({ gender: e.target.value as "OTHER" })
                }
                className="form-radio h-5 w-5 text-[#FDC63D] border-[#F7A400] focus:ring-[#F7A400]"
              />
              <span>선택 안 함</span>
            </label>
          </div>
        </div>
      </div>

      <ProgressBar currentStep={2} totalSteps={3} />

      <div className="w-full pt-4 pb-4">
        <button
          type="submit"
          className="w-full bg-[#FDC63D] hover:bg-tobi-yellow-400 text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center space-x-2 font-bold"
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
