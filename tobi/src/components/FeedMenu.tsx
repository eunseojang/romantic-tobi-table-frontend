// src/components/common/FeedMenu.tsx

import React, { useRef, useState, useEffect } from "react";
import api from "@/api";
import { toaster } from "./ui/toaster";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 스크롤 버튼 아이콘 임포트

// 이미지 임포트 (예시)
import cookieImage from "@/assets/food/cookie.png";
import riceBallImage from "@/assets/food/rice-ball.png";
import hamburgerImage from "@/assets/food/hamburger.png";
import chickenImage from "@/assets/food/chicken.png";
import pizzaImage from "@/assets/food/pizza.png";

interface FeedItem {
  name: string;
  points: number;
  image: string;
}

const feedItems: FeedItem[] = [
  { name: "쿠키", points: 10, image: cookieImage },
  { name: "주먹밥", points: 50, image: riceBallImage },
  { name: "햄버거", points: 100, image: hamburgerImage },
  { name: "치킨", points: 200, image: chickenImage },
  { name: "스테이크", points: 500, image: pizzaImage },
];

const FeedMenu: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleFeedPet = async (points: number) => {
    try {
      await api.post("/api/pet/feed", { point: points });
      toaster.create({
        title: "밥 먹이기 성공",
        description: `토미에게 ${points} 포인트를 사용하여 밥을 주었습니다!`,
        type: "success",
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3000ms = 3초
    } catch (error) {
      console.error("밥 먹이기 실패:", error);
      toaster.create({
        title: "밥 먹이기 실패",
        description:
          "포인트가 부족하거나 오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 후 스크롤 상태 초기화
    handleScroll();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="w-full font-dotum py-2 relative flex items-center mb-10">
      {/* 왼쪽 스크롤 버튼 */}
      {canScrollLeft && (
        <button
          onClick={() => scroll(-200)}
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 focus:outline-none transition-opacity"
        > 
          <FaChevronLeft />
        </button>
      )}

      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto p-2 space-x-2 custom-scrollbar"
        onScroll={handleScroll}
      >
        {feedItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleFeedPet(item.points)}
            className="flex flex-col items-center p-1 min-w-[120px] rounded-lg shadow-md border border-[#FDC63D] bg-[#FFF8E7] hover:bg-tobi-yellow-200 transition-colors duration-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-contain"
            />
            <p className="mt-1 text-base font-bold text-[#5C4B3B]">
              {item.name}
            </p>
            <p className="text-sm text-[#F7A400]">{item.points} 포인트</p>
          </button>
        ))}
      </div>

      {/* 오른쪽 스크롤 버튼 */}
      {canScrollRight && (
        <button
          onClick={() => scroll(200)}
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 focus:outline-none transition-opacity"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default FeedMenu;
