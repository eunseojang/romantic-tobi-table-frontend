// src/components/common/PointDisplay.tsx
import api from "@/api";
import React, { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface PetData {
  level: number;
  currentPoint: number;
  exp: number;
}

const PointDisplay: React.FC = () => {
  const navigate = useNavigate();
  const [currentPoints, setCurrentPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ✨ 초기 로딩 후 레벨업 감지를 위한 상태
  const [initialLevel, setInitialLevel] = useState<number | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await api.get<PetData>("/api/pet");
        const newLevel = response.data.level;
        setCurrentPoints(response.data.currentPoint);

        // ✨ 최초 로드 시 레벨을 저장하고, 이후 레벨업을 감지합니다.
        if (initialLevel === null) {
          // 컴포넌트의 첫 로딩
          setInitialLevel(newLevel);
          localStorage.setItem("petLevel", newLevel.toString());
        } else if (newLevel > initialLevel) {
          // 레벨업 감지
          localStorage.setItem("petLevel", newLevel.toString());
          navigate("/levelup", { state: { level: newLevel } });
        }
      } catch (err) {
        console.error("Failed to fetch pet data:", err);
        setError("포인트 정보를 불러오지 못했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPetData();
  }, [navigate, initialLevel]);

  if (loading) {
    return (
      <div className="flex items-center bg-[#F7A400] text-white py-1 px-1 rounded-full font-dotum shadow-lg w-30">
        <div className="bg-white p-2 rounded-full mr-2 ">
          <FaCoins className=" text-[#F7A400]" />{" "}
        </div>
        <span className="text-xl font-bold text-right w-full mr-2"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center bg-red-500 text-white py-2 px-4 rounded-full font-dotum shadow-lg">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-[#F7A400] text-white py-1 px-1 rounded-full font-dotum shadow-lg w-30">
      <div className="bg-white p-2 rounded-full mr-2 ">
        <FaCoins className=" text-[#F7A400]" />{" "}
      </div>
      <span className="text-xl font-bold text-right w-full mr-2">
        {currentPoints}
      </span>
    </div>
  );
};

export default PointDisplay;
