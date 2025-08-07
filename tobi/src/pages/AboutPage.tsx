// src/pages/AboutPage.tsx
import { Box, Text, Button } from "@chakra-ui/react"

export default function AboutPage() {
  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">about 화면</Text>
      <Button mt={4} colorScheme="yellow">테스트 버튼</Button>
    </Box>
  )
}
