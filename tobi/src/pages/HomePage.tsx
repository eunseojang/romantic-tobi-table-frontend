// src/pages/AboutPage.tsx

import BottomNavBar from "@/components/BottomNavBar";
import LevelProgressBar from "@/components/LevelProgressBar";
import PetAndButtons from "@/components/PetAndButtons";
import PointDisplay from "@/components/PointDisplay";
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
    <div className="font-dotum mt-4">
      <div className="flex items-center justify-between px-7 ">
        <p
          className="text-[#8a725b] underline text-sm font-Romance cursor-pointer"
          onClick={() => navigate("/store-list")}
        >
          포인트를 더 모으고 싶다면?
        </p>
        <PointDisplay />
      </div>
      <LevelProgressBar />
      <PetAndButtons />
      <BottomNavBar />
    </div>
  );
}
