// src/pages/UserWithdrawalPage.tsx

import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { toaster } from "@/components/ui/toaster";
import PointDisplay from "@/components/PointDisplay";

const withdrawalReasons = [
  { value: "사용 빈도가 낮아요", label: "사용 빈도가 낮아요" },
  { value: "원하는 서비스가 없어요", label: "원하는 서비스가 없어요" },
  { value: "이용하기 불편해요", label: "이용하기 불편해요" },
  { value: "기타", label: "기타" },
];

const UserWithdrawalPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState("사용 빈도가 낮아요");
  const [detailReason, setDetailReason] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = async () => {
    if (!agreed) {
      toaster.create({
        title: "동의 필요",
        description: "탈퇴 동의 체크박스에 동의해야 합니다.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const withdrawalData = {
        reason: selectedReason,
        detail: detailReason,
      };
      await api.delete("/api/auth/withdraw", { data: withdrawalData });

      localStorage.removeItem("accessToken");
      toaster.create({
        title: "회원 탈퇴 완료",
        description: "성공적으로 회원 탈퇴되었습니다.",
        type: "success",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      const errorMessage = "회원 탈퇴 중 오류가 발생했습니다.";
      toaster.create({
        title: "회원 탈퇴 실패",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white font-dotum relative">
      {/* 상단 헤더 */}
      <div className="w-full flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 cursor-pointer">
          <button onClick={() => navigate(-1)} className="text-gray-700 cursor-pointer">
            <FaChevronLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">회원 탈퇴</h1>
        </div>
        <PointDisplay />
      </div>

      {/* 안내 문구 */}
      <div className="p-4 bg-gray-50 text-gray-600 border-b border-gray-200">
        <p className="text-sm">
          탈퇴하시면 지금까지 모은 포인트와 기록 등 모든 회원 정보가
          <br />
          영구적으로 삭제됩니다.
        </p>
      </div>

      {/* 탈퇴 사유 */}
      <div className="p-4 flex-grow overflow-y-auto">
        <p className="font-bold mb-4 text-gray-800">
          탈퇴하는 이유를 알려주세요
        </p>
        <div className="space-y-4">
          {withdrawalReasons.map((reason) => (
            <label
              key={reason.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="withdrawalReason"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="form-radio h-5 w-5 text-[#FDC63D] border-gray-300 focus:ring-[#FDC63D]"
              />
              <span className="text-gray-700">{reason.label}</span>
            </label>
          ))}
        </div>

        {/* 상세 사유 */}
        <p className="font-bold mt-8 mb-2 text-gray-800">
          기타 사유 입력 (선택)
        </p>
        <textarea
          value={detailReason}
          onChange={(e) => setDetailReason(e.target.value)}
          className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDC63D] resize-none h-24"
          placeholder="기타"
        />

        {/* 최종 동의 체크박스 */}
        <div className="mt-8 flex items-center space-x-3">
          <input
            type="checkbox"
            id="agreement"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="form-checkbox h-5 w-5 text-[#FDC63D] rounded border-gray-300 focus:ring-[#FDC63D]"
          />
          <label
            htmlFor="agreement"
            className="text-gray-700 text-sm leading-tight"
          >
            위 내용을 모두 확인했으며, 탈퇴 시 계정 복구가 불가능함에
            동의합니다.
          </label>
        </div>
      </div>

      {/* 탈퇴 버튼 */}
      <div className="w-full p-4">
        <button
          onClick={handleWithdrawal}
          disabled={!agreed || loading}
          className="w-full py-4 bg-[#FDC63D] text-[#5C4B3B] rounded-lg shadow-md font-bold text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "탈퇴 처리 중..." : "회원 탈퇴 완료"}
        </button>
      </div>
    </div>
  );
};

export default UserWithdrawalPage;
