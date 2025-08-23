// src/components/common/PointDisplay.tsx
import api from "@/api";
import React, { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa"; // React Icons에서 코인 아이콘 임포트

export interface PetData {
  level: number;
  currentPoint: number;
  exp: number;
}

const PointDisplay: React.FC = () => {
  const [currentPoints, setCurrentPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await api.get<PetData>("/api/pet");
        setCurrentPoints(response.data.currentPoint);
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
