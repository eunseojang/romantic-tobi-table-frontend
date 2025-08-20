// src/components/ui/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex w-full px-2 space-x-2">
      {/* space-x-2: 각 바 사이의 간격 */}
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        // 현재 스텝은 tobi-yellow-500, 그 외는 tobi-gray-200 (밝은 회색)
        const barColorClass = isActive ? "bg-[#FDC63D]" : "bg-[#D9D9D9]";
        // 너비: 전체 너비를 단계 수로 나눔. flex-1은 공간을 균등하게 분배
        const barWidthClass = "flex-1";

        return (
          <div
            key={index}
            className={`${barWidthClass} h-2 rounded-full transition-colors duration-300 ${barColorClass}`}
          ></div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
