// src/pages/StartPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LevelupIcon from "@/assets/levelup.png"; // ✨ 이미지 파일을 임포트

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 시작 페이지를 본 적이 있는지 확인
    const hasSeenStartPage = localStorage.getItem("hasSeenStartPage");
    if (hasSeenStartPage) {
      navigate("/"); // 'home'은 예시 경로입니다. 실제 홈 페이지 경로로 변경하세요.
    }
  }, [navigate]);

  const handleNextClick = () => {
    // 시작 페이지를 봤다는 플래그를 localStorage에 저장
    localStorage.setItem("hasSeenStartPage", "true");
    navigate("/"); // 'home'은 예시 경로입니다. 실제 홈 페이지 경로로 변경하세요.
  };

  return (
    <div className="flex flex-col flex-grow items-center p-4 bg-white font-dotum relative">
      {/* 상단 섹션: "포인트를 더 모으고 싶다면?" 메시지 및 공유 버튼 */}
      <div className="w-full flex justify-between items-center px-2 py-4">
        <div className="flex items-center space-x-2">
          {/* 포인트 디스플레이 */}
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center">
        {/* 설명 텍스트 */}
        <p className="text-sm text-gray-800 font-bold max-w-xs mb-4">
          '낭만토미의 밥상'은 구미시의 관광 캐릭터인 토미에게 밥을 주며 토미를
          성장시키는 앱 서비스입니다!
        </p>

        {/* 토미 캐릭터 이미지 */}
        <div className="w-48 h-48 bg-[#FDC63D] rounded-full flex items-center justify-center relative shadow-lg my-8">
          {/* 눈 */}
          <div className="absolute w-24 flex justify-between top-1/3">
            <div className="w-4 h-4 bg-black rounded-full"></div>
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
          {/* 입 */}
          <div className="absolute w-6 h-2 bg-black top-1/2 mt-2 rounded-full"></div>
        </div>

        {/* 하단 설명 */}
        <div className="max-w-xs mb-5">
          <p className="text-gray-800 mb-2 text-[10px]">
            구미시의 소상공인 가게에서 받은 영수증을 인증하면 포인트를 받을 수
            있어요!
          </p>
          <div>
            <img src={LevelupIcon} className="mb-1" alt="래밸업" />
          </div>
          <p className="text-md text-[#F7A400]">
            포인트를 모아서 토미에게 밥을 주거나
            <br />
            경험치를 올려 레벨업시켜보세요!
          </p>
        </div>
      </div>

      {/* 다음으로 버튼 */}
      <div className="w-full mt-auto mb-8">
        <button
          onClick={handleNextClick}
          className="w-full py-4 bg-[#FDC63D] rounded-lg shadow-md hover:bg-tobi-yellow-400 text-white text-xl font-bold transition duration-300 ease-in-out"
        >
          다음으로 →
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          이 화면은 처음 한 번만 보여드려요
        </p>
      </div>
    </div>
  );
};

export default StartPage;
