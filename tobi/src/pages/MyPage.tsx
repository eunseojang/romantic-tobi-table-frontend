// src/pages/MyPage.tsx
import React, { useEffect, useState } from "react";
import { FaCrown, FaUtensils } from "react-icons/fa";
import PointDisplay from "@/components/PointDisplay";
import BottomHandleBar from "@/components/BottomNavBar";
import birthdayIcon from "@/assets/birthday.png"; // ✨ 이미지 파일을 임포트
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/components/useLogout";
import PetCharacterDisplay from "@/components/PetDisplayProfile";

// 사용자 정보 타입 정의 (API 응답을 가정)
interface UserInfo {
  nickname: string;
  birthday: string;
  petLevel: number; // 뱃지 텍스트
  latestAchievementName: string; // 업적 텍스트
}
export type BadgeType = {
  [key: number]: string;
};
const badge: BadgeType = {
  1: "맨바닥 식객",
  2: "신문지 위의 미식가",
  3: "반상 챌린저",
  4: "가정식 정복자",
  5: "황금수저 계승자",
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useLogout(); // ✨ useLogout 훅 사용

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get<UserInfo>("/api/auth/mypage");
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  if (loading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (!userInfo) {
    return (
      <div className="text-center p-4">사용자 정보를 찾을 수 없습니다.</div>
    );
  }

  return (
    <div>
      <div className="flex flex-col flex-grow bg-white font-dotum relative px-7">
        {/* 상단 헤더 */}
        <div className="w-full flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-800">마이페이지</h1>
          <PointDisplay />
        </div>

        {/* 사용자 정보 카드 */}
        <div className="w-full p-4 mt-4 bg-[#fff] rounded-lg shadow-sm border-2 border-[#FDC63D]">
          <div className="flex items-center space-x-4">
            {/* 프로필 이미지 (원) */}
            <PetCharacterDisplay actionType="basic" />

            <div className="flex flex-col flex-grow space-y-1">
              {/* 레벨 및 뱃지 */}
              <div className="flex items-center justify-start">
                <span className="text-md font-bold text-[#FDC63D] font-Romance pr-2 flex items-center">
                  <FaCrown className="text-[#FDC63D] mr-1" /> Lv.{" "}
                  {userInfo.petLevel}
                </span>
                <span className="text-xs font-Romance text-[#5C4B3B] font-Romance flex items-center">
                  {badge[userInfo.petLevel]}
                </span>
              </div>

              {/* 닉네임 및 생일 */}
              <h2 className="text-xl font-bold text-gray-800 mt-[-3px]">
                {userInfo.nickname}{" "}
                <p className="text-sm text-[#5C4B3B] flex items-center ">
                  <img
                    src={birthdayIcon}
                    className="mr-1 mb-1"
                    alt="생일 아이콘"
                  />{" "}
                  {userInfo.birthday}
                </p>
              </h2>
            </div>
          </div>

          {/* 업적 버튼 */}
          <div
            className="w-full mt-4 p-3 bg-[#FFF8E7] cursor-pointer rounded-lg shadow-inner border-2 border-[#FDC63D] flex items-center space-x-2"
            onClick={() => navigate("/achievements")}
          >
            <FaUtensils className="text-[#FDC63D] text-lg" />
            <p className="text-sm text-[#5C4B3B] font-bold">
              {userInfo.latestAchievementName}
            </p>
          </div>
        </div>

        {/* 기능 버튼 목록 */}
        <div className="w-full mt-4 space-y-3 mb-10">
          <button
            onClick={() => navigate("/changePassword")}
            className="cursor-pointer w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400"
          >
            비밀번호 변경
          </button>
          <button
            onClick={() => navigate("/receipt")}
            className="cursor-pointer w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400"
          >
            영수증 목록
          </button>
          <button
            onClick={() => navigate("/rewards")}
            className="w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400 cursor-pointer"
          >
            리워드 목록
          </button>
          <button
            onClick={() => navigate("/withdraw")}
            className="cursor-pointer w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400"
          >
            회원 탈퇴
          </button>
          <button
            onClick={logout}
            className="w-full cursor-pointer p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400"
          >
            로그아웃
          </button>
        </div>
      </div>
      <BottomHandleBar />
    </div>
  );
};

export default MyPage;
