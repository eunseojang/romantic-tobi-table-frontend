// src/pages/MyPage.tsx
import React, { useEffect, useState } from "react";
import { FaCrown, FaUtensils } from "react-icons/fa";
import api from "@/api"; // API 인스턴스 임포트
import PointDisplay from "@/components/PointDisplay";
import BottomHandleBar from "@/components/BottomNavBar";
import birthdayIcon from "@/assets/birthday.png"; // ✨ 이미지 파일을 임포트

// 사용자 정보 타입 정의 (API 응답을 가정)
interface UserInfo {
  level: number;
  nickname: string;
  birthday: string;
  badge: string; // 뱃지 텍스트
  achievement: string; // 업적 텍스트
}

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 임시 사용자 정보 (API 연동 전)
  const dummyUserInfo: UserInfo = {
    level: 3,
    nickname: "닉네임",
    birthday: "2025-01-01",
    badge: "반상 챌린저",
    achievement: "토미 밥 10번 주기 성공!",
  };

  // 실제 API 연동 로직
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await api.get<UserInfo>('/api/user/me'); // 예시 API 경로
  //       setUserInfo(response.data);
  //     } catch (err) {
  //       setError('사용자 정보를 불러오지 못했습니다.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUserInfo();
  // }, []);

  // API 연동 전에는 더미 데이터 사용
  useEffect(() => {
    setUserInfo(dummyUserInfo);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
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
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>

            <div className="flex flex-col flex-grow space-y-1">
              {/* 레벨 및 뱃지 */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#FDC63D] bg-[#FFF8E7] font-Romance rounded-full px-2 py-1 flex items-center shadow-sm">
                  <FaCrown className="text-[#FDC63D] mr-1" /> Lv.{" "}
                  {userInfo.level}
                </span>
                <span className="text-xs text-[#5C4B3B] font-Romance">
                  {userInfo.badge}
                </span>
              </div>

              {/* 닉네임 및 생일 */}
              <h2 className="text-xl font-bold text-gray-800">
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
          <div className="w-full mt-4 p-3 bg-[#FFF8E7]  rounded-lg shadow-inner border-2 border-[#FDC63D] flex items-center space-x-2">
            <FaUtensils className="text-[#FDC63D] text-lg" />
            <p className="text-sm text-[#5C4B3B] font-bold">
              {userInfo.achievement}
            </p>
          </div>
        </div>

        {/* 기능 버튼 목록 */}
        <div className="w-full mt-4 space-y-3 mb-10">
          <button className="w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400">
            비밀번호 변경
          </button>
          <button className="w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400">
            알림 설정
          </button>
          <button className="w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400">
            영수증 목록
          </button>
          <button className="w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400">
            리워드 목록
          </button>
          <button className="w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400">
            회원 탈퇴
          </button>
          <button className="w-full p-3  bg-[#FFF8E7]  text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md  text-md hover:bg-tobi-yellow-400">
            로그아웃
          </button>
        </div>
      </div>
      <BottomHandleBar />
    </div>
  );
};

export default MyPage;
