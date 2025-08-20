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
        max-w-[390px]    /* 👈 핵심: 최대 너비를 390px로 제한 */
        w-full           /* 👈 핵심: 부모 요소의 전체 너비를 차지 */
        mx-auto          /* 👈 핵심: 가로 중앙 정렬 */
        min-h-screen     /* 최소 높이를 뷰포트 높이의 100%로 설정 (세로 스크롤 대비) */
        bg-white         /* 레이아웃의 배경색 (원하는 색상으로 변경 가능) */
        flex             /* Flex 컨테이너로 설정 (자식 요소 배치 위함) */
        flex-col         /* Flex 아이템들을 수직으로 정렬 (자식 요소가 세로로 쌓이게 함) */
      "
    >
      {children}
    </div>
  );
};
