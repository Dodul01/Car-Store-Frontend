import Title from "antd/es/typography/Title";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddCar from "../pages/Admin/AddCar";
import ManageCar from "../pages/Admin/ManageCar";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Add Car",
    path: "add-car",
    element: <AddCar />,
  },
  {
    name: "Manage Cars",
    path: "manage-car",
    element: <ManageCar />,
  },
  {
    name: "Management Orders",
    path: "order-management",
    element: (
      <div>
        <Title>Order management page.</Title>
      </div>
    ),
  },
];
