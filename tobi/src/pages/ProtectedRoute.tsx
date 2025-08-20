import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const token = localStorage.getItem("accessToken"); // 토큰 확인 로직

  if (!token) {
    return <Navigate to={redirectPath} replace />; // 로그인되어 있지 않으면 리다이렉트
  }

  return <Outlet />; // 로그인되어 있다면 자식 라우트 렌더링
};

export default ProtectedRoute;
