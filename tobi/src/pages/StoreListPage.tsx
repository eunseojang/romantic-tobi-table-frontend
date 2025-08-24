// src/pages/StoreListPage.tsx

import React, { useEffect, useState } from "react";
import api from "@/api";
import { FaChevronLeft } from "react-icons/fa";
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
  pageable: {
    pageNumber: number;
  };
  last: boolean;
}

const StoreListPage: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState(""); // 실제 검색에 사용된 검색어
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const PAGE_SIZE = 10;

  // ✨ 데이터를 불러오는 핵심 함수 (검색, 더보기 모두 처리)
  const fetchData = async (
    page: number,
    term: string = "",
    isLoadMore: boolean = false
  ) => {
    try {
      setLoading(true);
      const endpoint = term ? "/api/stores/search" : "/api/stores";
      const params = {
        page: page,
        size: PAGE_SIZE,
        sort: "id",
        ...(term && { name: term }),
      };

      console.log("API 요청:", { endpoint, params, isLoadMore }); // 디버깅용

      const response = await api.get<StoreListResponse>(endpoint, { params });

      console.log("API 응답:", response.data); // 디버깅용

      setStores((prevStores) => {
        if (isLoadMore) {
          return [...prevStores, ...response.data.content];
        } else {
          return response.data.content;
        }
      });

      setCurrentPage(response.data.pageable.pageNumber);
      setIsLastPage(response.data.last);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
      setError("가게 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드 (검색어 변경과 분리)
  useEffect(() => {
    fetchData(0);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    setCurrentSearchTerm(trimmedTerm); // 현재 검색어 저장
    setStores([]);
    setCurrentPage(0);
    setIsLastPage(false);
    fetchData(0, trimmedTerm);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    console.log("더보기 클릭:", { currentPage, nextPage, currentSearchTerm }); // 디버깅용
    fetchData(nextPage, currentSearchTerm, true); // isLoadMore = true
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    setCurrentSearchTerm("");
    setStores([]);
    setCurrentPage(0);
    setIsLastPage(false);
    fetchData(0);
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
          className="bg-[#FDC63D] cursor-pointer hover:bg-tobi-yellow-400 text-[#5C4B3B] py-3.5 px-3 rounded-lg shadow-sm transition duration-300 ease-in-out text-sm whitespace-nowrap"
        >
          검색
        </button>
        {currentSearchTerm && (
          <button
            type="button"
            onClick={handleSearchClear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3.5 px-3 rounded-lg shadow-sm transition duration-300 ease-in-out text-sm whitespace-nowrap"
          >
            전체
          </button>
        )}
      </form>

      {/* 현재 검색어 표시 */}
      {currentSearchTerm && (
        <div className="px-4 mb-2">
          <p className="text-sm text-gray-600">
            검색 결과:{" "}
            <span className="font-semibold">"{currentSearchTerm}"</span>
          </p>
        </div>
      )}

      {/* 가게 목록 */}
      <div className="flex flex-col flex-grow overflow-y-auto px-4 pb-4 space-y-4">
        {loading && stores.length === 0 ? (
          <p className="text-center text-gray-500">목록을 불러오는 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : stores.length === 0 ? (
          <p className="text-center text-gray-500">가게가 없습니다.</p>
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

      {/* "더보기" 버튼 */}
      {!loading && !isLastPage && stores.length > 0 && (
        <div className="w-full px-4 mb-20 cursor-pointer" onClick={handleLoadMore}>
          <button
            disabled={loading}
            className="w-full cursor-pointer py-3 bg-[#FDC63D] rounded-lg shadow-md hover:bg-tobi-yellow-400 text-white font-bold transition-colors duration-200 disabled:opacity-50"
          >
            더보기
          </button>
        </div>
      )}

      {/* 로딩 상태 */}
      {loading && stores.length > 0 && (
        <div className="w-full px-4 mb-4">
          <p className="text-center text-gray-500">더 불러오는 중...</p>
        </div>
      )}

      <BottomHandleBar />
    </div>
  );
};

export default StoreListPage;
