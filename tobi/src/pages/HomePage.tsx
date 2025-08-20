// src/pages/AboutPage.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="p-4">
      <p className="text-xl font-bold"> 홈 화면</p>
      <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
        테스트 버튼
      </button>
    </div>
  );
}
