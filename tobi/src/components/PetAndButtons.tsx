// src/components/common/PetAndButtons.tsx
import React, { useState, useEffect } from "react";

// ✨ petMessage prop을 제거합니다.
interface PetAndButtonsProps {}

type ActiveComponent = "none" | "feed" | "receipt";

type MentType = {
  feed: string[];
  receipt: string[];
  none: string[];
};

const Ment: MentType = {
  feed: [
    "기대된다~ 오늘 메뉴는 뭐야?",
    "밥 주기! 밥 주기!",
    "배고파! 밥 주세요!",
    "밥 먹고 힘내자!",
    "오늘도 왔구나~ 오늘도 밥주러 왔어?",
  ],
  receipt: [
    "영수증 인증! 시작해볼까?",
    "영수증 인증! 준비됐어?",
    "영수증 인증! 도전!",
    "영수증 인증! 화이팅!",
  ],
  none: [
    "안녕! 오늘은 뭐할까?",
    "토미가 기다리고 있어요!",
    "오늘도 함께 놀아요!",
    "토미와 함께하는 즐거운 하루!",
  ],
};

const PetAndButtons: React.FC<PetAndButtonsProps> = () => {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("none");
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const messages = Ment[activeComponent];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);
  }, [activeComponent]);

  // ✨ 이 함수를 수정합니다.
  const handleButtonClick = (componentName: ActiveComponent) => {
    setActiveComponent((prevComponent) =>
      prevComponent === componentName ? "none" : componentName
    );
  };

  const renderPlaceholder = () => {
    switch (activeComponent) {
      case "feed":
        return (
          <div className="bg-gray-200 p-4 rounded-lg mt-4 mb-20 w-full h-32 flex items-center justify-center">
            밥 주기 컴포넌트
          </div>
        );
      case "receipt":
        return (
          <div className="bg-gray-200 p-4 rounded-lg mt-4 mb-20 w-full h-32 flex items-center justify-center">
            영수증 인증 컴포넌트
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-8 font-dotum mt-3">
      {/* 액션 버튼들 */}
      <div className="w-full flex justify-center space-x-4">
        {/* '밥 주기' 버튼 */}
        {activeComponent === "feed" ? (
          <button
            onClick={() => handleButtonClick("feed")}
            className="relative px-6 py-3 rounded-full bg-[#F7A400] border-3 text-[#F7A400] shadow-md hover:bg-tobi-yellow-400 font-bold text-lg before:content-[''] before:absolute before:bottom-[-10px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[10px] before:border-r-[10px] before:border-t-[10px] before:border-l-transparent before:border-r-transparent before:border-t-[#F7A400] active:translate-y-1"
          >
            <p className="text-[#5C4B3B]">밥 주기</p>
          </button>
        ) : (
          <button
            onClick={() => handleButtonClick("feed")}
            className="relative px-6 py-3 rounded-full bg-[#FFF8E7] border-3 text-[#F7A400] shadow-md hover:bg-tobi-yellow-400 font-bold text-lg before:content-[''] before:absolute before:bottom-[-10px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[10px] before:border-r-[10px] before:border-t-[10px] before:border-l-transparent before:border-r-transparent before:border-t-[#F7A400] active:translate-y-1"
          >
            <p className="text-[#5C4B3B]">밥 주기</p>
          </button>
        )}

        {activeComponent === "receipt" ? (
          <button
            onClick={() => handleButtonClick("receipt")}
            className="relative px-6 py-3 rounded-full bg-[#F7A400] border-3 text-[#F7A400] shadow-md hover:bg-tobi-yellow-400 font-bold text-lg before:content-[''] before:absolute before:bottom-[-10px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[10px] before:border-r-[10px] before:border-t-[10px] before:border-l-transparent before:border-r-transparent before:border-t-[#F7A400] active:translate-y-1"
          >
            <p className="text-[#5C4B3B]">영수증 인증</p>
          </button>
        ) : (
          <button
            onClick={() => handleButtonClick("receipt")}
            className="relative px-6 py-3 rounded-full bg-[#FFF8E7] border-3 text-[#F7A400] shadow-md hover:bg-tobi-yellow-400 font-bold text-lg before:content-[''] before:absolute before:bottom-[-10px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[10px] before:border-r-[10px] before:border-t-[10px] before:border-l-transparent before:border-r-transparent before:border-t-[#F7A400] active:translate-y-1"
          >
            <p className="text-[#5C4B3B]">영수증 인증</p>
          </button>
        )}
      </div>

      {/* 토미 캐릭터 이미지 */}
      <div className="flex-grow flex items-center justify-center my-8">
        <div className="w-48 h-48 bg-[#FDC63D] rounded-full flex items-center justify-center relative shadow-lg">
          {/* 눈 */}
          <div className="absolute w-24 flex justify-between top-1/3">
            <div className="w-4 h-4 bg-black rounded-full"></div>
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
          {/* 입 */}
          <div className="absolute w-6 h-2 bg-black top-1/2 mt-2 rounded-full"></div>
        </div>
      </div>

      {/* 토미의 말풍선 */}
      <div className="w-full p-2 py-3 text-[#F7A400] border-3 rounded-2xl">
        <p className="text-sm text-black text-center font-bold">
          "{currentMessage}"
        </p>
      </div>

      <div className="border-1 w-full mt-4 text-[#ADADAD]" />

      {renderPlaceholder()}
    </div>
  );
};

export default PetAndButtons;
