// src/pages/PointShopPage.tsx

import React, { useEffect, useState } from "react";
import api from "@/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import PointDisplay from "@/components/PointDisplay";

import hatImage from "@/assets/acc/hat.png";
import ribbonImage from "@/assets/acc/ribbon.png";
import noseImage from "@/assets/acc/nose.png";
import glassImage from "@/assets/acc/glass.png";
import PetCharacterDisplay from "@/components/PetDisplay";

// API 응답 데이터 타입 정의
interface Accessory {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description: string;
  status: "OWNED" | "EQUIPPED" | "NOT_OWNED";
}
interface AccessoryImageMap {
  [key: number]: string;
}
const image: AccessoryImageMap = {
  4001: hatImage,
  4002: glassImage, //선글라스
  4003: noseImage, //턱수염
  4004: ribbonImage, //리본
};

const PointShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // ✨ 현재 선택된 아이템의 인덱스

  const selectedAccessory = accessories[selectedIndex] || null;

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        const response = await api.get<Accessory[]>("/api/clothes");
        setAccessories(response.data);
      } catch (err) {
        console.error("Failed to fetch accessories:", err);
        setError("악세서리 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
  }, []);

  const handleAction = async () => {
    if (!selectedAccessory) return;

    try {
      setLoading(true);
      if (selectedAccessory.status === "NOT_OWNED") {
        await api.post(`/api/clothes/pet/dress/${selectedAccessory.id}`);
        toaster.create({
          title: "구매 완료!",
          description: `${selectedAccessory.name}을(를) 구매했습니다.`,
          type: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000); // 3000ms = 3초
      } else if (selectedAccessory.status === "EQUIPPED") {
        await api.post(`/api/clothes/pet/undress/${selectedAccessory.id}`);
        toaster.create({
          title: "해제 완료!",
          description: `${selectedAccessory.name}을(를) 해제했습니다.`,
          type: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000); // 3000ms = 3초
      } else {
        await api.post(`/api/clothes/pet/dress/${selectedAccessory.id}`);
        toaster.create({
          title: "착용 완료!",
          description: `${selectedAccessory.name}을(를) 착용했습니다.`,
          type: "success",
        });
        window.location.reload();
      }
    } catch (err) {
      console.error("액션 실패:", err);
      toaster.create({
        title: "액션 실패",
        description: "다시 시도해주세요.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (!selectedAccessory) return "로딩 중...";
    if (selectedAccessory.status === "NOT_OWNED")
      return `${selectedAccessory.price} 포인트로 구매하기`;
    if (selectedAccessory.status === "OWNED") return "착용하기";
    if (selectedAccessory.status === "EQUIPPED") return "해제하기";
  };

  // ✨ 다음/이전 아이템으로 이동하는 핸들러
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % accessories.length);
  };
  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? accessories.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col flex-grow bg-white font-dotum relative">
      {/* 상단 헤더 */}
      <div className="w-full flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <FaChevronLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">포인트 샵</h1>
        </div>
        <PointDisplay />
      </div>

      {/* 설명 문구 */}
      <p className="text-sm text-gray-600 px-4 mt-2 mb-4">
        모아놓은 포인트를 이용해서 토미에게 어울리는 악세서리를 구매할 수
        있어요!
      </p>

      <PetCharacterDisplay actionType="basic" />

      {/* 악세서리 목록 (1개씩 넘기는 캐러셀) */}
      <div className="relative w-full py-4 flex items-center justify-center">
        {accessories.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 z-10 p-2 text-gray-600 hover:text-gray-900"
          >
            <FaChevronLeft />
          </button>
        )}

        {selectedAccessory && (
          <div
            className={`
            w-[300px] p-4 rounded-lg shadow-md border 
            bg-[#FFF8E7] border-[#FDC63D]
          `}
          >
            <div className="flex">
              <img
                src={image[selectedAccessory.id]}
                alt={selectedAccessory.name}
                className="w-24 h-24 bg-gray-300 rounded-md flex-shrink-0"
              />
              <div className="ml-4 flex-grow">
                <p className="mt-2 text-base font-bold text-gray-800">
                  {selectedAccessory.name}
                </p>
                <p className="text-sm text-[#FDC63D] mt-1">
                  {selectedAccessory.price} 포인트
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedAccessory.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {accessories.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 z-10 p-2 text-gray-600 hover:text-gray-900"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* 구매/착용/해제 버튼 */}
      <div className="w-full p-4">
        <button
          onClick={handleAction}
          disabled={!selectedAccessory || loading}
          className="cursor-pointer w-full py-4 bg-[#FDC63D] text-[#5C4B3B] rounded-lg shadow-md font-bold text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "처리 중..." : getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default PointShopPage;
