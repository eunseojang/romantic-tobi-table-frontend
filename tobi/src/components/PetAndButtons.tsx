// src/components/common/PetAndButtons.tsx
import React, { useState, useEffect } from "react";
import ReceiptUpload from "./RecieptUploadButton";
import api from "@/api";
import { toaster } from "./ui/toaster";
import FeedMenu from "./FeedMenu";
import { ActionType } from "@/Image";
import PetCharacterDisplay from "./PetDisplay";

type ActiveComponent = "none" | "feed" | "receipt";

type MentType = {
  feed: string[];
  receipt: string[];
  none: string[];
  greeting: string[];
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
  greeting: [
    "오늘도 찾아와줘서 고마워!",
    "어서 와! 기다렸어!",
    "안녕! 오늘도 즐거운 하루 보내~!",
    "오늘도 좋은 하루 보내!",
  ],
};

interface GreetingRewardResponse {
  message: string;
  remainingPoint: number;
}

const PetAndButtons: React.FC = () => {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("none");
  const [currentMessage, setCurrentMessage] = useState("");
  const [petAction, setPetAction] = useState<ActionType>("basic"); // ✨ 펫의 현재 동작 상태

  useEffect(() => {
    const messages = Ment[activeComponent];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);
  }, [activeComponent]);

  // ✨ 동작을 바꾸는 핸들러: duration 후에 기본 상태로 돌아옴
  const handleActionWithTimeout = (
    action: ActionType,
    duration: number = 3000
  ) => {
    setPetAction(action);
    setTimeout(() => {
      setPetAction("basic");
    }, duration);
  };

  const handleGreetingReward = async () => {
    try {
      await api.post<GreetingRewardResponse>("/api/rewards/greeting");

      const randomGreeting =
        Ment.greeting[Math.floor(Math.random() * Ment.greeting.length)];
      setCurrentMessage(randomGreeting);

      toaster.create({
        title: "출석 인증 완료",
        description: `포인트를 획득했습니다! 내일도 또 방문해 주실거죠?`,
        type: "success",
      });

      handleActionWithTimeout("up", 3000); // ✨ 인사 성공 시 3초간 "hi" 동작
    } catch (error) {
      console.error("출석 인증 실패:", error);
      const errorMessage = `내일 다시 방문해주세요~~`;
      toaster.create({
        title: "출석 인증 실패",
        description: errorMessage,
        type: "error",
      });
      handleActionWithTimeout("hi", 3000); // ✨ 실패 시 기본 동작 유지
    }
  };

  const handleButtonClick = (componentName: ActiveComponent) => {
    setActiveComponent((prevComponent) => {
      const newState = prevComponent === componentName ? "none" : componentName;
        handleActionWithTimeout("hi", 1000); // ✨ 버튼 클릭 시 1초간 "up" 동작
      return newState;
    });
  };

  const renderPlaceholder = () => {
    switch (activeComponent) {
      case "feed":
        return (
          <FeedMenu onSuccessAction={() => handleActionWithTimeout("up")} />
        );
      case "receipt":
        return (
          <ReceiptUpload
            onSuccessAction={() => handleActionWithTimeout("up")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 font-dotum mt-3">
      {/* 액션 버튼들 */}
      <div className="w-full flex justify-center space-x-4">
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
      <div
        className="flex-grow flex items-center justify-center my-2"
        onClick={handleGreetingReward}
      >
        <PetCharacterDisplay actionType={petAction} />
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
