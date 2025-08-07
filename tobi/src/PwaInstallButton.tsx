import React, { useEffect, useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { toaster } from "./components/ui/toaster";

const isIos = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);
const isInStandaloneMode = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in window.navigator && (window.navigator as any).standalone);

export const PwaInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosInstall, setShowIosInstall] = useState(false);
  //   const [deferredPrompt, setDeferredPrompt] = useState<any>({
  //     prompt: () => Promise.resolve(),
  //     userChoice: Promise.resolve({ outcome: "accepted" }),
  //   });
  //   const [showIosInstall, setShowIosInstall] = useState(true);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) setShowIosInstall(true);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAndroidInstall = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
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
      setDeferredPrompt(null);
    });
  };

  return (
    <VStack gap={4}>
      {deferredPrompt && (
        <Button colorScheme="teal" onClick={handleAndroidInstall}>
          Android에 PWA 설치하기
        </Button>
      )}

      {showIosInstall && (
        <>
          <Text>
            iOS Safari에서 공유 버튼 → '홈 화면에 추가'를 눌러 설치하세요.
          </Text>
          <Button
            colorScheme="teal"
            onClick={() =>
              toaster.create({
                title: "설치 안내",
                description: "Safari 공유 버튼 → 홈 화면에 추가 선택",
              })
            }
          >
            iOS 설치 방법 보기
          </Button>
        </>
      )}
    </VStack>
  );
};
