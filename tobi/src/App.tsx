// src/App.tsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MobileLayout } from "./MobileLayout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";

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
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
