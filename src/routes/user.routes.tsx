import Title from "antd/es/typography/Title";
import UserDashboard from "../pages/User/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My cart",
    path: "cart",
    element: (
      <div>
        <Title>My Cart page</Title>
      </div>
    ),
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
