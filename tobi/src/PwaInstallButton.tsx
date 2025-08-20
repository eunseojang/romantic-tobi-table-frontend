import { useEffect, useState } from "react";
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
  // `useState(true)`로 임시 설정되어 있어 항상 iOS 안내가 보이는 상태
  // 실제 사용 시에는 주석 처리된 원래의 `useState(false)`로 복원해야 합니다.
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosInstall, setShowIosInstall] = useState(false); // 이 부분을 실제 사용 시에는 `false`로 변경하세요.

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isIos() && !isInStandaloneMode()) {
        setShowIosInstall(true);
      }

      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };
      window.addEventListener("beforeinstallprompt", handler);

      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  const handleAndroidInstall = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        toaster.create({
          title: "PWA 설치 성공",
          description: "앱이 설치되었습니다.",
          type: "success", // Success type added
        });
      } else {
        toaster.create({
          title: "PWA 설치 취소됨",
          description: "설치를 취소하셨습니다.",
          type: "warning", // Warning type added
        });
      }
      setDeferredPrompt(null);
    });
  };

  return (
    // ✨ 부모 div에 w-full, px-4, gap-4를 추가하고 justify-center 수정
    <div className="flex flex-col items-center justify-center w-full px-4 gap-2 font-dotum">
      {" "}
      {/* text-Dotum -> font-dotum */}
      {/* Android 설치 버튼 */}
      {deferredPrompt && (
        <button
          onClick={handleAndroidInstall}
          className="w-full bg-black hover:bg-tobi-yellow-400 text-[#fff] py-3 rounded-lg shadow-md transition duration-300 ease-in-out font-bold"
        >
          Android에 PWA 설치하기
        </button>
      )}
      {/* iOS 설치 안내 */}
      {showIosInstall && (
        <>
          <p className="text-center text-gray-700 text-[10px]">
            iOS Safari에서 공유 버튼 → '홈 화면에 추가'를 눌러 설치하세요.
          </p>
          <button
            onClick={() =>
              toaster.create({
                title: "설치 안내",
                description: "Safari 공유 버튼 → 홈 화면에 추가 선택",
              })
            }
            className="w-full bg-black hover:bg-tobi-yellow-400 text-[#fff] py-3 rounded-lg shadow-md transition duration-300 ease-in-out font-bold"
          >
            iOS 설치 방법 보기
          </button>
        </>
      )}
    </div>
  );
};
