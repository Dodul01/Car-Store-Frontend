import Title from "antd/es/typography/Title";
import AdminDashboard from "../pages/Admin/AdminDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Add Car",
    path: "add-car",
    element: <div>
        <Title>Add Car page</Title>
    </div>,
  },
  {
    name: "Update Car",
    path: "update-car",
    element: <div>
        <Title>Update Car page</Title>
    </div>,
  },
  {
    name: "Delete Car",
    path: "add-car",
    element: <div>
        <Title>Delete Car page</Title>
    </div>,
  },
  {
    name: "Order Management",
    path: "order-management",
    element: <div>
        <Title>Order management page.</Title>
    </div>,
  },
];
