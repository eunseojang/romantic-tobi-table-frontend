// src/pages/AchievementPage.tsx
import api from "@/api";
import PointDisplay from "@/components/PointDisplay";
import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaCalendarAlt,
  FaUtensils,
  FaReceipt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 업적 데이터 타입 정의 (임시)
interface Achievement {
  id: number;
  category: "연속 출석" | "밥 주기" | "영수증 인증";
  title: string;
  isAchieved: boolean;
}

// ✨ API 응답 데이터 타입 정의
interface AchievementApiResponse {
  attendancesequence: number;
  feeding: number;
  receipt: number;
  attendedAt: string;
}

const allPossibleAchievements: Achievement[] = [
  {
    id: 1,
    category: "연속 출석",
    title: "연속 3일 출석 성공!",
    isAchieved: false,
  },
  {
    id: 2,
    category: "연속 출석",
    title: "연속 7일 출석 성공!",
    isAchieved: false,
  },
  {
    id: 3,
    category: "연속 출석",
    title: "연속 15일 출석 성공!",
    isAchieved: false,
  },
  {
    id: 4,
    category: "연속 출석",
    title: "연속 30일 출석 성공!",
    isAchieved: false,
  },
  {
    id: 5,
    category: "밥 주기",
    title: "토미 밥 5번 주기 성공!",
    isAchieved: false,
  },
  {
    id: 6,
    category: "밥 주기",
    title: "토미 밥 10번 주기 성공!",
    isAchieved: false,
  },
  {
    id: 7,
    category: "밥 주기",
    title: "토미 밥 15번 주기 성공!",
    isAchieved: false,
  },
  {
    id: 8,
    category: "영수증 인증",
    title: "영수증 인증 5번 성공!",
    isAchieved: false,
  },
  {
    id: 9,
    category: "영수증 인증",
    title: "영수증 인증 10번 성공!",
    isAchieved: false,
  },
  {
    id: 10,
    category: "영수증 인증",
    title: "영수증 인증 15번 성공!",
    isAchieved: false,
  },
];

const AchievementPage: React.FC = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // ✨ API 응답 타입 변경
        const response = await api.get<AchievementApiResponse>(
          "/api/achievements"
        );
        const apiData = response.data;

        // ✨ API 데이터를 기반으로 isAchieved 상태를 판별하는 로직
        const updatedAchievements = allPossibleAchievements.map(
          (allAchieve) => {
            let isAchieved = false;

            // 카테고리 및 ID에 따라 isAchieved 판별
            switch (allAchieve.category) {
              case "연속 출석":
                if (
                  (allAchieve.id === 1 && apiData.attendancesequence >= 3) ||
                  (allAchieve.id === 2 && apiData.attendancesequence >= 7) ||
                  (allAchieve.id === 3 && apiData.attendancesequence >= 15) ||
                  (allAchieve.id === 4 && apiData.attendancesequence >= 30)
                ) {
                  isAchieved = true;
                }
                break;
              case "밥 주기":
                if (
                  (allAchieve.id === 5 && apiData.feeding >= 5) ||
                  (allAchieve.id === 6 && apiData.feeding >= 10) ||
                  (allAchieve.id === 7 && apiData.feeding >= 15)
                ) {
                  isAchieved = true;
                }
                break;
              case "영수증 인증":
                if (
                  (allAchieve.id === 8 && apiData.receipt >= 5) ||
                  (allAchieve.id === 9 && apiData.receipt >= 10) ||
                  (allAchieve.id === 10 && apiData.receipt >= 15)
                ) {
                  isAchieved = true;
                }
                break;
            }

            return {
              ...allAchieve,
              isAchieved: isAchieved,
            };
          }
        );

        setAchievements(updatedAchievements);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
        // API 실패 시 모든 업적을 false로 표시
        setAchievements(allPossibleAchievements);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [navigate]); // 의존성 배열에 navigate 추가

  // 업적 카테고리별로 아이콘을 매핑합니다.
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "연속 출석":
        return <FaCalendarAlt className="text-xl text-[#FDC63D]" />;
      case "밥 주기":
        return <FaUtensils className="text-xl text-[#FDC63D]" />;
      case "영수증 인증":
        return <FaReceipt className="text-xl text-[#FDC63D]" />;
      default:
        return null;
    }
  };

  const getAchievedCount = () => {
    return achievements.filter((a) => a.isAchieved).length;
  };

  if (loading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  // 업적을 카테고리별로 묶기
  const achievementsByCategory = achievements.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, Achievement[]>);

  return (
    <div className="flex flex-col flex-grow bg-white font-dotum relative">
      {/* 상단 헤더 */}
      <div className="w-full flex items-center justify-between p-4 pb-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 cursor-pointer"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">업적 확인</h1>
        </div>
        <PointDisplay />
      </div>

      <p className="text-xs text-gray-500 px-4 mt-2">
        전체 업적 수 {getAchievedCount()}/{allPossibleAchievements.length}
      </p>

      {/* 업적 목록 */}
      <div className="flex flex-col flex-grow overflow-y-auto p-4 pb-20 space-y-4">
        {Object.keys(achievementsByCategory).map((category) => (
          <div key={category}>
            <h2 className="text-lg font-bold text-gray-800 mb-2">{category}</h2>
            <div className="space-y-2">
              {achievementsByCategory[category].map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center p-4 rounded-lg border shadow-sm transition-colors duration-200 border-[#F7A400]
                    ${achievement.isAchieved ? "bg-[#FFF8E7]" : "bg-[#fff]"}`}
                >
                  <div className="w-8 flex-shrink-0 flex justify-center">
                    {getCategoryIcon(category)}
                  </div>
                  <p
                    className={`text-base font-bold ml-4 ${
                      achievement.isAchieved
                        ? "text-[#F7A400]"
                        : "text-[#F7A400]"
                    }`}
                  >
                    {achievement.isAchieved ? achievement.title : "???"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPage;
