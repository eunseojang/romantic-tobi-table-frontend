import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import { MobileLayout } from "./MobileLayout";
import LoginPage from "./pages/login/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import ToasterContainer from "./components/ui/toaster";
import StoreListPage from "./pages/StoreListPage";
import MyPage from "./pages/MyPage";
import StartPage from "./pages/StartPage";
import AchievementPage from "./pages/AchivementPage";
import UserWithdrawalPage from "./pages/UserWithdrawPage";
import PasswordChangePage from "./pages/PasswordChangePage";
import ReceiptListPage from "./pages/RecieptPage";
import RewardListPage from "./pages/RewardListPage";
import PointShopPage from "./pages/PointShopPage";
import LevelUpPage from "./pages/LevelupPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <MobileLayout>
        <LoginPage />
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
    // ✨ 보호된 라우트 추가
    element: (
      <MobileLayout>
        <ProtectedRoute />
      </MobileLayout>
    ), // 모든 보호된 라우트를 감싸는 레이아웃
    children: [
      {
        path: "/",
        element: <HomePage />, // 이 경로는 이제 ProtectedRoute의 보호를 받습니다.
      },
      {
        path: "/point",
        element: <PointShopPage />, // 이 경로는 이제 ProtectedRoute의 보호를 받습니다.
      },
      {
        path: "/store-list",
        element: <StoreListPage />, // 이 경로는 이제 ProtectedRoute의 보호를 받습니다.
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/start",
        element: <StartPage />,
      },
      {
        path: "/achievements",
        element: <AchievementPage />,
      },
      {
        path: "/withdraw",
        element: <UserWithdrawalPage />,
      },
      {
        path: "/changePassword",
        element: <PasswordChangePage />,
      },
      {
        path: "/receipt",
        element: <ReceiptListPage />,
      },
      {
        path: "/rewards",
        element: <RewardListPage />,
      },
      {
        path: "/levelup",
        element: <LevelUpPage />,
      },
    ],
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
