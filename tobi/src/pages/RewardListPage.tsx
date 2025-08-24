// src/pages/RewardListPage.tsx

import React, { useEffect, useState } from "react";
import api from "@/api";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import PointDisplay from "@/components/PointDisplay";

// API 응답 데이터 타입 정의
interface Reward {
  id: number;
  rewardName: string;
  point: number;
  used: boolean;
}

const RewardListPage: React.FC = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const response = await api.get<Reward[]>("/api/rewards");
        setRewards(response.data);
      } catch (err) {
        console.error("Failed to fetch rewards:", err);
        setError("리워드 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  // 리워드 사용 핸들러
  const handleRedeemReward = async (rewardId: number) => {
    try {
      const response = await api.post(`/api/rewards/${rewardId}/redeem`);
      toaster.create({
        title: "리워드 사용 완료",
        description: `${response.data.rewardName}을(를) 사용했습니다!`,
        type: "success",
      });
      // UI를 즉시 업데이트
      setRewards((prevRewards) =>
        prevRewards.map((reward) =>
          reward.id === rewardId ? { ...reward, used: true } : reward
        )
      );
    } catch (err) {
      console.log(err);
      const errorMessage = "리워드 사용에 실패했습니다.";
      toaster.create({
        title: "리워드 사용 실패",
        description: errorMessage,
        type: "error",
      });
    }
  };

  if (loading) {
    return <div className="text-center p-4">리워드 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col flex-grow bg-white font-dotum relative">
      {/* 상단 헤더 */}
      <div className="w-full flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 cursor-pointer"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">리워드 목록</h1>
        </div>
        <PointDisplay />
      </div>

      {/* 안내 문구 */}
      <p className="text-sm text-gray-600 px-4 mt-2 mb-4 border-b border-gray-200 pb-2">
        모아온 포인트들을 보상으로 바꿔보세요!
      </p>

      {/* 리워드 목록 */}
      <div className="flex flex-col flex-grow overflow-y-auto p-4 pb-20 space-y-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            onClick={() => setSelectedReward(reward)}
            className={`
              w-full p-4 rounded-lg shadow-md border cursor-pointer transition-all duration-200
              ${
                selectedReward?.id === reward.id
                  ? "bg-[#FFF8E7] border-[#FDC63D] scale-[1.02]"
                  : "bg-white border-gray-300"
              }
            `}
          >
            <p
              className={`text-lg font-bold ${
                reward.used ? "text-gray-400" : "text-gray-800"
              }`}
            >
              {reward.rewardName}
              {reward.used && (
                <span className="text-xs text-red-500 ml-2">(사용완료!)</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* 리워드 상세 및 기프티콘 코드 섹션 */}
      {selectedReward && (
        <div className="fixed bottom-0 left-0 w-full max-w-[390px] mx-auto bg-white p-4 rounded-t-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-y-0">
          <div className="flex flex-col items-center">
            {/* 핸들러 (슬라이드 바) */}
            <div
              onClick={() => setSelectedReward(null)}
              className="w-10 h-1 bg-gray-300 rounded-full mb-4 cursor-pointer"
            ></div>

            {/* 이미지 컨테이너 (임시) */}
            <div className="w-48 h-32 bg-gray-200 rounded-lg"></div>

            <p className="mt-4 text-xl font-bold text-gray-800">
              {selectedReward.rewardName}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              기프티콘 설명 어쩌구저쩌구~
            </p>

            {/* 기프티콘 코드 버튼 */}
            <button
              onClick={() => handleRedeemReward(selectedReward.id)}
              disabled={selectedReward.used}
              className={`
                w-full mt-4 py-3 rounded-lg shadow-md font-bold text-lg transition-colors
                ${
                  selectedReward.used
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#FDC63D] text-white hover:bg-tobi-yellow-400"
                }
              `}
            >
              {selectedReward.used ? "사용 완료" : "기프티콘 코드"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardListPage;
