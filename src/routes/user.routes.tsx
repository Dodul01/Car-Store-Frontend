import UserDashboard from "../pages/User/UserDashboard";
import MyCart from "../pages/User/MyCart";
import TrackMyOrderPage from "../pages/User/TrackMyOrderPage";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My cart",
    path: "cart",
    element: <MyCart />,
  },
  {
    name: "Track My Order",
    path: "track-order",
    element: <TrackMyOrderPage />,
  },
];
