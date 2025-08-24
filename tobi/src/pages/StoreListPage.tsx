// src/pages/StoreListPage.tsx

import React, { useEffect, useState } from "react";
import api from "@/api"; // Axios 인스턴스
import { FaChevronLeft } from "react-icons/fa"; // 뒤로가기 아이콘
import { useNavigate } from "react-router-dom";
import PointDisplay from "@/components/PointDisplay";
import BottomHandleBar from "@/components/BottomNavBar";

// API 응답 타입 정의
interface Store {
  id: number;
  name: string;
  address: string;
  category: string;
}

interface StoreListResponse {
  content: Store[];
  totalPages: number;
  totalElements: number;
  // ... 기타 pagination 정보
}

const StoreListPage: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 가게 목록을 불러오는 함수
  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await api.get<StoreListResponse>("/api/stores", {
        params: {
          page: 0,
          size: 20,
          sort: "id",
        },
      });
      setStores(response.data.content);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
      setError("가게 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 가게 검색 함수
  const searchStores = async () => {
    try {
      setLoading(true);
      const response = await api.get<StoreListResponse>(
        "/api/stores/search",
        {
          params: {
            name: searchTerm,
          },
        }
      );
      setStores(response.data.content);
    } catch (err) {
      console.error("Failed to search stores:", err);
      setError("검색 결과를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchStores();
    } else {
      fetchStores(); // 검색어가 없으면 전체 목록을 다시 불러옴
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white font-dotum relative">
      {/* 상단 헤더 */}
      <div className="w-full flex items-center justify-between p-4 pb-0">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <FaChevronLeft className="text-lg" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">소상공인 리스트</h1>
        </div>
        <PointDisplay />
      </div>

      {/* 안내 텍스트 */}
      <p className="text-xs text-gray-500 px-4 mt-2">
        소상공인 가게에서 얻은 영수증을 인증하고 포인트를 얻어서
        <br />
        토미에게 밥을 주거나 경험치를 줄 수 있어요!
      </p>

      {/* 검색 바 */}
      <form
        onSubmit={handleSearchSubmit}
        className="w-full p-4 flex items-center space-x-2 mb-2"
      >
        <input
          type="text"
          placeholder="키워드로 검색하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-[#F7A400] bg-[#FFF8E7] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-tobi-yellow-500"
        />
        <button
          type="submit"
          className="bg-[#FDC63D] w-15 hover:bg-tobi-yellow-400 text-[#5C4B3B] py-3.5 px-3 rounded-lg shadow-sm transition duration-300 ease-in-out text-sm whitespace-nowrap"
        >
          검색
        </button>
      </form>

      {/* 가게 목록 */}
      <div className="flex flex-col flex-grow overflow-y-auto px-4 pb-20 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">목록을 불러오는 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="w-full p-4 bg-[#fff] rounded-lg shadow-md border text-[#F7A400]"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-[#5C4B3B]">
                    {store.name}
                  </h3>
                  <p className="text-sm text-[#5C4B3B] mt-1">{store.address}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomHandleBar />
    </div>
  );
};

export default StoreListPage;
