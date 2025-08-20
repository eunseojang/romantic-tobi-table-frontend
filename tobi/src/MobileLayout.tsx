// src/layouts/MobileLayout.tsx
import React, { ReactNode } from "react";

/**
 * 모바일 뷰포트 크기를 시뮬레이션하고 자식 컴포넌트가 높이를 채우도록 하는 레이아웃 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 props.
 * @param {ReactNode} props.children - 레이아웃 안에 렌더링될 자식 컴포넌트.
 * @returns {JSX.Element} 모바일 레이아웃 div.
 */
export const MobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="
        max-w-[390px]   
        w-full          
        mx-auto         
        min-h-screen   
        bg-white        
        flex             
        flex-col         
      "
    >
      {children}
    </div>
  );
};
