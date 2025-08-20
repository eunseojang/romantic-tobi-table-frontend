// src/App.tsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MobileLayout } from "./MobileLayout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import "./styles/font.css";
import LoginPage from "./pages/login/LoginPage";
import ToasterContainer from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MobileLayout>
        <HomePage />
      </MobileLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <MobileLayout>
        <SignUpPage />
      </MobileLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <MobileLayout>
        <LoginPage />
      </MobileLayout>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToasterContainer />
    </>
  );
}

export default App;
