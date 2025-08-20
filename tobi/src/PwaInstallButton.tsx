import React, { useEffect, useState } from "react";
// Chakra UI의 Button, VStack, Text 대신 일반 HTML 태그와 Tailwind CSS 클래스를 사용합니다.
// toaster는 그대로 사용한다고 가정합니다.
import { toaster } from "./components/ui/toaster"; // `toaster` 경로가 올바른지 확인해주세요.

// iOS 기기인지 확인하는 함수
const isIos = () => {
  if (typeof window === "undefined") return false; // SSR 환경 고려
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
};

// 독립 실행 모드(PWA로 설치된 상태)인지 확인하는 함수
const isInStandaloneMode = () => {
  if (typeof window === "undefined") return false; // SSR 환경 고려
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && (window.navigator as any).standalone)
  );
};

export const PwaInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosInstall, setShowIosInstall] = useState(false);

  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 window 객체 확인
    if (typeof window !== "undefined") {
      if (isIos() && !isInStandaloneMode()) {
        setShowIosInstall(true);
      }

      const handler = (e: Event) => {
        // 'any' 대신 'Event' 타입 사용
        e.preventDefault();
        setDeferredPrompt(e);
      };
      // 'beforeinstallprompt' 이벤트 리스너 추가
      window.addEventListener("beforeinstallprompt", handler);

      // 클린업 함수
      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
      };
    }
  }, []);

  const handleAndroidInstall = () => {
    if (!deferredPrompt) return;

    // PWA 설치 프롬프트 띄우기
    deferredPrompt.prompt();
    // 사용자 선택 결과 처리
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        toaster.create({
          title: "PWA 설치 성공",
          description: "앱이 설치되었습니다.",
        });
      } else {
        toaster.create({
          title: "PWA 설치 취소됨",
          description: "설치를 취소하셨습니다.",
        });
      }
      setDeferredPrompt(null); // 프롬프트 사용 후 상태 초기화
    });
  };

  return (
    // VStack -> div에 flex, flex-col, gap-4 클래스 적용
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      {/* Android 설치 버튼 */}
      {deferredPrompt && (
        <button
          onClick={handleAndroidInstall}
          // Chakra UI의 colorScheme="teal" 대신 Tailwind CSS 클래스 적용
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Android에 PWA 설치하기
        </button>
      )}

      {/* iOS 설치 안내 */}
      {showIosInstall && (
        <>
          {/* Text -> p 태그 사용 */}
          <p className="text-center text-gray-700">
            iOS Safari에서 공유 버튼 → '홈 화면에 추가'를 눌러 설치하세요.
          </p>
          <button
            onClick={() =>
              toaster.create({
                title: "설치 안내",
                description: "Safari 공유 버튼 → 홈 화면에 추가 선택",
              })
            }
            // Chakra UI의 colorScheme="teal" 대신 Tailwind CSS 클래스 적용
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            iOS 설치 방법 보기
          </button>
        </>
      )}
    </div>
  );
};
