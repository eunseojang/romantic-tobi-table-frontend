// src/pages/HomePage.tsx
import { PwaInstallButton } from "@/PwaInstallButton";
import { Box, Text, Button } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">
        홈 화면
      </Text>
      <Button mt={4} colorScheme="yellow">
        테스트 버튼
      </Button>
      <PwaInstallButton />
    </Box>
  );
}
