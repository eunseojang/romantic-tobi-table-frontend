import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react"
import App from './App'
import { system } from './theme'
import { Toaster } from '@/components/ui/toaster' // 경로는 환경에 맞게 조절

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
      <Toaster />
    </ChakraProvider>
  </React.StrictMode>,
)
