// src/components/common/ReceiptUploadButton.tsx

import React, { useRef, useState } from "react";
import api from "@/api";
import { FaSpinner } from "react-icons/fa";
import { toaster } from "./ui/toaster";
import axios from "axios";

// API 응답 타입 정의 (성공 및 실패 케이스 모두 포함)
interface ReceiptUploadResponse {
  store_name: string;
  paid_at: string;
  address: string;
  amount: string;
  pointsEarned: number;
  currentPoint: number;
  message: string;
}

const ReceiptUploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // 파일 선택 버튼 클릭 핸들러
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 입력 변경 및 즉시 업로드 핸들러
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await handleUpload(file);
    }
  };

  // 파일 업로드 로직
  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post<ReceiptUploadResponse>(
        "/api/receipt/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toaster.create({
        title: "영수증 인증 완료",
        description: `${response.data.pointsEarned} 포인트를 획득했습니다!`,
        type: "success",
      });
    } catch (error: unknown) {
      // ✨ any 대신 unknown 사용
      console.error("영수증 업로드 실패:", error);

      let errorMessage = "다시 시도해주세요.";

      // ✨ Axios 에러인지 타입 가드로 확인
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "error" in error.response.data
      ) {
        errorMessage = (error.response.data as { error: string }).error;
        console.log(error.response.data);
      } else if (error instanceof Error) {
        // 일반적인 JavaScript Error 객체인 경우
        errorMessage = error.message;
      }

      toaster.create({
        title: "영수증 인증 실패",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
        disabled={loading}
      />
      <button
        onClick={handleFileSelect}
        disabled={loading}
        className="w-full p-3 bg-[#FFF8E7] text-[#5C4B3B] border-2 border-[#FDC63D] rounded-lg shadow-md text-sm hover:bg-tobi-yellow-400 font-dotum disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <FaSpinner className="animate-spin inline-block mr-2" />
        ) : (
          "업로드할 이미지 갤러리에서 선택하기"
        )}
      </button>
    </div>
  );
};

export default ReceiptUploadButton;
