// src/pages/ReceiptListPage.tsx
import React, { useEffect, useState } from "react";
import api from "@/api";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PointDisplay from "@/components/PointDisplay";

// API 응답 데이터 타입 정의
interface Receipt {
  id: number;
  storeName: string;
  amount: number;
  menu: string | null;
}

const ReceiptListPage: React.FC = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setLoading(true);
        const response = await api.get<Receipt[]>("/api/receipt/check");
        setReceipts(response.data);
      } catch (err) {
        console.error("영수증 목록을 불러오지 못했습니다:", err);
        setError("영수증 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchReceipts();
  }, []);

  return (
    <div className="flex flex-col flex-grow bg-white font-dotum relative">
      {/* 상단 헤더 */}
      <div className="w-full flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <FaChevronLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">영수증 목록</h1>
        </div>
        <PointDisplay />
      </div>

      {/* 안내 문구 */}
      <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
        <p>지금까지 인증된 영수증들을 한눈에 모아봤어요!</p>
      </div>

      {/* 영수증 목록 */}
      <div className="flex flex-col flex-grow overflow-y-auto p-4 pb-20 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 mt-8">
            목록을 불러오는 중...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : receipts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            등록된 영수증이 없습니다.
          </p>
        ) : (
          receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="w-full p-4 bg-[#ff] rounded-lg shadow-md border border-[#FDC63D] font-dotum"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800">
                    {receipt.storeName}
                  </h3>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {receipt.amount}원
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReceiptListPage;
