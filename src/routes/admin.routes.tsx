import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddCar from "../pages/Admin/AddCar";
import ManageCar from "../pages/Admin/ManageCar";
import ManageOrders from "../pages/Admin/ManageOrders";
import ManageAccounts from "../pages/Admin/ManageAccounts";

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
    name: "Manage Users Accounts",
    path: "manage-users",
    element: <ManageAccounts />,
  },
  {
    name: "Manage Cars",
    path: "manage-car",
    element: <ManageCar />,
  },
  {
    name: "Management Orders",
    path: "order-management",
    element: <ManageOrders />,
  },
];
