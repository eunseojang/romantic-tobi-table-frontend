// src/App.tsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MobileLayout } from "./MobileLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

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
    path: "/about",
    element: (
      <MobileLayout>
        <AboutPage />
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
