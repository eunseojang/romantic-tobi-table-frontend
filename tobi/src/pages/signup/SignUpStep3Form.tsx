// src/pages/signup/SignUpStep3Form.tsx
import ProgressBar from "@/components/ui/ProgressBar";
import { toaster } from "@/components/ui/toaster";
import React from "react";

interface SignUpStep3FormProps {
  formData: {
    allowNotification: boolean | null; // null을 포함하여 초기 선택이 없을 수 있도록 타입 확장
  };
  updateFormData: (fields: Partial<SignUpStep3FormProps["formData"]>) => void;
  onNext: () => void; // onNext가 최종 제출을 트리거
}

const SignUpStep3Form: React.FC<SignUpStep3FormProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  // 알림 수신 상태를 formData에서 직접 관리하므로, 별도 useState는 필요 없거나,
  // formData.allowNotification이 초기값을 제공하도록 합니다.
  // 여기서는 formData.allowNotification을 직접 사용합니다.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 알림 선택 유효성 검사: (true 또는 false 중 하나가 선택되었는지 확인)
    if (formData.allowNotification === null) {
      // 초기값이 null이 될 수 있도록 SignUpPage의 formData도 업데이트해야 함
      toaster.create({
        title: "알림 설정 오류",
        description: "알림 수신 여부를 선택해야 합니다.",
        type: "error",
      });
      return;
    }

    // 모든 유효성 검사 통과 시 다음 스텝으로 (여기서는 최종 제출)
    onNext(); // SignUpPage의 handleSignUpSubmit 호출
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full font-Dotum flex flex-col flex-grow px-4 pb-4 font-dotum relative" /* font-Dotum -> font-dotum */
    >
      <p className="text-black text-sm mb-4">
        {" "}
        {/* text-[10px] -> text-sm, mb-1 -> mb-4 */}
        알림을 켜두면 토미가 보내는 귀여운 소식들을 놓치지 않을 수 있어요!
      </p>
      <div className="space-y-4 flex-grow">
        <div className="flex flex-col space-y-2 mt-4">
          {/* ✨ 알림 수신 라디오 버튼 */}
          {/* "토미의 소식알림을 받을게요!" */}
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 cursor-pointer text-gray-700">
              {" "}
              {/* text-gray-700 추가 */}
              <input
                type="radio"
                name="notification"
                value="true"
                checked={formData.allowNotification === true}
                onChange={(e) =>
                  updateFormData({
                    allowNotification: e.target.value === "true",
                  })
                }
                className="form-radio h-5 w-5 text-[#FDC63D] border-[#F7A400] focus:ring-[#FDC63D]"
              />
              <span>토미의 소식 알림을 받을래요!</span> {/* 텍스트 수정 */}
            </label>
          </div>
          {/* "알림은 다음에 받을게요!" */}
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 cursor-pointer text-gray-700">
              {" "}
              {/* text-gray-700 추가 */}
              <input
                type="radio"
                name="notification"
                value="false"
                checked={formData.allowNotification === false}
                onChange={(e) =>
                  updateFormData({
                    allowNotification: e.target.value === "true",
                  })
                }
                className="form-radio h-5 w-5 text-[#FDC63D] border-[#F7A400] focus:ring-[#FDC63D]"
              />
              <span>알림은 다음에 받을게요!</span>
            </label>
          </div>
        </div>

        {/* ✨ 말풍선과 토미 캐릭터 */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative bg-[#F4EDDC] p-4 rounded-xl shadow-md w-full max-w-sm before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[15px] before:border-r-[15px] before:border-t-[15px] before:border-l-transparent before:border-r-transparent before:border-t-[#F4EDDC] before:mb-[-15px]">
            <p className="text-sm text-[#5C4B3B] text-center">
              "안녕! 나는 구미시 관광 캐릭터{" "}
              <span className="font-bold text-[#F7A400]">토미</span>야!{" "}
              {/* 토미 글씨 강조 */}
              <br />
              자연과 도시를 누비며 낭만을 찾아다니는
              <br />
              느릿하고 귀여운 거북이야!"
            </p>
          </div>
          <div className="mt-4 w-20 h-20 rounded-full bg-[#FDC63D] text-[#5C4B3B] flex items-center justify-center font-bold text-lg">
            토미
          </div>
        </div>
      </div>

      <ProgressBar currentStep={3} totalSteps={3} />

      <div className="w-full pt-4 pb-4">
        <button
          type="submit"
          className="w-full bg-[#FDC63D] hover:bg-tobi-yellow-400 text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center space-x-2 "
        >
          <span>회원가입 완료</span>
        </button>
      </div>
    </form>
  );
};

export default SignUpStep3Form;
