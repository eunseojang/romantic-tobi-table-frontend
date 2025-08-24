// src/components/common/LevelProgressBar.tsx
import api from "@/api";
import React, { useEffect, useState } from "react";
import { PetData } from "./PointDisplay";

const LevelProgressBar: React.FC = () => {
  const [exp, setExp] = React.useState<number>(0);
  const [level, setLevel] = React.useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const progressPercentage = exp / (level * 300);
  console.log(progressPercentage)
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await api.get<PetData>("/api/pet");
        setExp(response.data.exp);
        setLevel(response.data.level);
      } catch (err) {
        console.error("Failed to fetch pet data:", err);
        setError("포인트 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPetData();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center py-2 px-8 font-Dotum">
        {/* 경험치 바 컨테이너 */}
        <div className="relative w-12 h-12 bg-[#fff] rounded-full flex items-center justify-center font-bold text-lg text-[#FDC63D] shadow-xl ring-2 ring-tobi-yellow-200"></div>
        <div className="flex-1 h-[10px] border text-[#FDC63D] relative overflow-hidden bg-tobi-yellow-200 items-center">
          {/* 노란색 경험치 바 */}
          <div className="h-[5px] my-0.5 bg-[#FDC63D] transition-all duration-500 ease-out absolute left-0 top-0"></div>
        </div>
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
    <>
      <div>
        <div className="flex items-center py-2 px-6 font-Dotum">
          {/* 레벨 원 */}
          <div className="relative w-12 h-12 bg-[#fff] rounded-full flex items-center justify-center font-bold text-lg text-[#FDC63D] shadow-xl ring-2 ring-tobi-yellow-200">
            <span className=" text-black">Lv. {level}</span>
          </div>
          {/* 경험치 바 컨테이너 */}
          <div className="relatvie flex-1 w-[10px] h-[10px] border text-[#FDC63D] relative overflow-hidden bg-tobi-yellow-200 items-center">
            {/* 노란색 경험치 바 */}
            <div
              className="h-[5px] my-0.5 bg-[#FDC63D] transition-all duration-500 ease-out absolute left-0 top-0"
              style={{ width: `${progressPercentage* 100}%` }}
            ></div>
          </div>
        </div>
        <div className=" font-Dotum font-bold text-sm text-[#777471] text-right mr-8 mt-[-25px]">
          {exp}/{level * 300}
        </div>
      </div>
    </>
  );
};

export default LevelProgressBar;
