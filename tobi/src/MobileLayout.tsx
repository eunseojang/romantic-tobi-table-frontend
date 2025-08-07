// src/layouts/MobileLayout.tsx
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const MobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box maxW="390px" w="100%" mx="auto" minH="100vh" bg="red" boxShadow="md">
      {children}
    </Box>
  );
};
