// src/components/common/PetCharacterDisplay.tsx

import React, { useEffect, useState } from "react";
import api from "@/api";
import { AccessoryType, ActionType, petImageMap } from "@/Image";

// 펫의 레벨 데이터 타입
interface PetData {
  level: number;
  currentPoint: number;
  exp: number;
}

// 착용 중인 악세사리 데이터 타입
interface EquippedAccessory {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
}

// API의 악세사리 ID와 컴포넌트의 악세사리 타입 매핑
const accessoryIdToType: { [key: number]: AccessoryType } = {
  4001: "hat",
  4002: "sunglasses",
  4003: "mustache",
  4004: "ribbon",
};

// ✨ 이 컴포넌트는 이제 actionType만 props로 받습니다.
interface PetCharacterDisplayProps {
  actionType: ActionType; // 'basic', 'hi', 'up', etc.
}

const PetCharacterDisplay: React.FC<PetCharacterDisplayProps> = ({
  actionType,
}) => {
  const [petLevel, setPetLevel] = useState(1); // 기본값 1
  const [petAccessory, setPetAccessory] = useState<AccessoryType>("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petResponse = await api.get<PetData>("/api/pet");
        setPetLevel(petResponse.data.level);

        const appearanceResponse = await api.get<EquippedAccessory>(
          "/api/clothes/pet/appearance"
        );
        const equipped = appearanceResponse.data;
        if (equipped) {
          setPetAccessory(accessoryIdToType[equipped.id] || "none");
        } else {
          setPetAccessory("none");
        }
      } catch (err) {
        console.error("펫 정보 로딩 실패:", err);
        setError("펫 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPetData();
  }, []); // ✨ 의존성 배열을 비워 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

  if (loading) {
    return <div className="text-center">펫 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // 펫 캐릭터 이미지 경로를 동적으로 가져옵니다.
  const petImageSrc =
    petImageMap[petLevel]?.[petAccessory]?.[actionType] ||
    petImageMap[1].none.basic;

  return (
    <div className="flex justify-center items-center">
      <img
        src={petImageSrc}
        alt="토미 캐릭터"
        className="w-16 h-16 border-2 border-[#FDC63D] rounded-full flex-shrink-0"
      />
    </div>
  );
};

export default PetCharacterDisplay;
