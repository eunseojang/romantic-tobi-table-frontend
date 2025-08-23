// src/components/ui/BottomHandleBar.tsx
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { name: "홈", href: "/" },
  { name: "포인트샵", href: "/point" },
  { name: "마이페이지", href: "/mypage" },
];

const BottomHandleBar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-0 w-full max-w-[390px] mx-auto z-50 font-Dotum">
      {/* 메뉴 컨테이너 - 열림/닫힘 상태에 따라 translateY를 조절 */}
      <div
        className={`
          w-full p-4 rounded-t-3xl bg-[#FDC63D] shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-y-0"
              : "translate-y-[calc(100%-2rem)]" /* 👈 핵심: 40px 만큼만 보임 */
          }
        `}
      >
        {/* 핸들러 바 (클릭 시 토글) */}
        <div
          onClick={toggleMenu}
          className="flex justify-center cursor-pointer mb-2"
        >
          <div className="w-30 h-1 bg-[#413529] rounded-full"></div>
        </div>

        {/* 메뉴 아이템 */}
        <div className="flex justify-around items-center text-[#5C4B3B] font-bold text-lg">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={toggleMenu}
                className={`
                  hover:underline hover:text-white transition-colors duration-200 w-[33%] text-center
                  ${isActive ? "text-white" : ""}
                `}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomHandleBar;
