// src/pages/LevelUpPage.tsx (수정)

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import PointDisplay from "@/components/PointDisplay";
import PetCharacterDisplay from "@/components/PetDisplay";

// 레벨업 정보 (대사, 보상)
const levelUpData = {
  1: {
    dialogue: "처음 만나서 반가워~!\n나는 토미야! 앞으로 잘 부탁해!",
    reward: "+ 식사 공간 생성!\n+ 맨바닥 식객 칭호 획득!",
  },
  2: {
    dialogue: "Lv.2면 아직 애기일까...?\n그래도 밥은 많이 줘!",
    reward: "+ 반티스누피 아이콘 업그레이드! \n+ 신문지 위의 미식가 칭호 획득!",
  },
  3: {
    dialogue: "레벨업시켜줘서 고마워~!\n나 좀 더 멋있어졌지?",
    reward: "+ 은은한 빛의 반상 챌린저 업그레이드!\n+ 반상 챌린저 칭호 획득!",
  },
  4: {
    dialogue: "우와~ Lv.4!\n이제 나 진짜 밥 잘 먹는 토미야!",
    reward: "+ 고급진 나무 식탁 업그레이드!\n+ 가정식 정복자 칭호 획득!",
  },
  5: {
    dialogue: "마지막 레벨이라니~! 감동이야! \n끝까지 와줘서 너무 고마워!",
    reward: "+ 명예의 황금 식탁 업그레이드! \n+ 황금수저 계승자 칭호 획득!",
  },
};

const LevelUpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level || 2;
  const data = levelUpData[level as keyof typeof levelUpData];

  if (!data) {
    navigate("/");
    return null;
  }

  return (
    <div
      className="flex flex-col flex-grow items-center p-4 font-dotum relative bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF4E7_25%,#F4EDDC_50%,#FDC63D_100%)]"
    >
      {/* 상단 섹션 */}
      <div className="w-full flex justify-between items-center px-2 py-4">
        <button onClick={() => navigate("/")} className="text-gray-700">
          <FaChevronLeft className="text-lg" />
        </button>
        <PointDisplay />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center">
        {/* 레벨업 타이틀 */}
        <h1 className="text-4xl font-Romance font text-[#FDC63D] tracking-wide">
          <span className="drop-shadow-sm">Lv.{level} 달성</span>
        </h1>

        {/* 토미 캐릭터 */}
        <div>
          <PetCharacterDisplay actionType="hi" />
        </div>

        {/* 대사 말풍선 */}
        <div className="w-full max-w-sm relative bg-[#F4EDDC] p-4 rounded-xl shadow-md">
          {/* ✨ whitespace-pre-line 클래스를 추가했습니다. */}
          <p className="text-sm text-[#5C4B3B] text-center whitespace-pre-line">
            "{data.dialogue}"
          </p>
        </div>

        {/* 보상 정보 */}
        <div className="w-full max-w-sm text-gray-700 mt-2">
          <p className="font-Romance text-lg">
            <span className="text-[#FDC63D]">보상</span>
          </p>
          <p className="text-sm text-center whitespace-pre-line">
            {data.reward}
          </p>
        </div>
      </div>

      {/* 다시 메인으로 돌아가는 버튼 */}
      <div className="w-full mt-auto mb-8">
        <button
          onClick={() => navigate("/")}
          className="w-full py-4 bg-[#FDC63D] rounded-lg shadow-md hover:bg-tobi-yellow-400 text-white text-xl font-bold transition duration-300 ease-in-out"
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default LevelUpPage;
