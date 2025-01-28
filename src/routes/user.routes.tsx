import Title from "antd/es/typography/Title";
import UserDashboard from "../pages/User/UserDashboard";
import MyCart from "../pages/User/MyCart";

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
    element: (
      <div>
        <Title>Track My Order page</Title>
      </div>
    ),
  },
];
