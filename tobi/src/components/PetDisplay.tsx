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

interface PetCharacterDisplayProps {
  actionType: ActionType; // 'basic', 'hi', 'up', etc.
}

const PetCharacterDisplay: React.FC<PetCharacterDisplayProps> = ({
  actionType,
}) => {
  const [petLevel, setPetLevel] = useState(1);
  const [petAccessory, setPetAccessory] = useState<AccessoryType>("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. 로컬 스토리지에서 캐시된 데이터 불러오기
    const cachedLevel = localStorage.getItem("petLevel");
    const cachedAccessory = localStorage.getItem(
      "petAccessory"
    ) as AccessoryType;

    if (cachedLevel && cachedAccessory) {
      setPetLevel(parseInt(cachedLevel, 10));
      setPetAccessory(cachedAccessory);
      setLoading(false); // 캐시된 데이터가 있으므로 로딩 상태 해제
    }

    // 2. API에서 최신 데이터 가져오기
    const fetchPetData = async () => {
      try {
        // 캐시된 데이터가 없으면 로딩 상태로 시작
        if (!cachedLevel || !cachedAccessory) {
          setLoading(true);
        }

        const petResponse = await api.get<PetData>("/api/pet");
        const newLevel = petResponse.data.level;

        const appearanceResponse = await api.get<EquippedAccessory>(
          "/api/clothes/pet/appearance"
        );
        const equipped = appearanceResponse.data;
        const newAccessory: AccessoryType = equipped
          ? accessoryIdToType[equipped.id] || "none"
          : "none";

        // 상태 및 로컬 스토리지 업데이트
        setPetLevel(newLevel);
        setPetAccessory(newAccessory);
        localStorage.setItem("petLevel", newLevel.toString());
        localStorage.setItem("petAccessory", newAccessory);
      } catch (err) {
        console.error("펫 정보 로딩 실패:", err);
        setError("펫 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false); // API 호출이 완료되면 로딩 상태 해제
      }
    };
    fetchPetData();
  }, []); // 의존성 배열을 비워 컴포넌트 마운트 시 한 번만 실행

  // 펫 캐릭터 이미지 경로를 동적으로 가져옵니다.
  const petImageSrc =
    petImageMap[petLevel]?.[petAccessory]?.[actionType] ||
    petImageMap[1].none.basic;

  // 로딩 중일 때는 기본 캐릭터 이미지를 보여줍니다.
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <img
          src={petImageMap[petLevel].none.basic}
          alt="토미 캐릭터"
          className="w-60"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <img src={petImageSrc} alt="토미 캐릭터" className="w-60" />
    </div>
  );
};

export default PetCharacterDisplay;
