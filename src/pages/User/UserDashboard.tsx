// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Card, Col, Row, Statistic, Typography } from "antd";
// import { useAppSelector } from "../../redux/hook";
// import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
// import { useGetOrdersQuery } from "../../redux/features/User/orderManagement.api";

// const { Title } = Typography;

// const UserDashboard = () => {
//   const user = useAppSelector(selectCurrentUser);
//   const { data } = useGetOrdersQuery(user?.email);

//   const totalSpending =
//     data?.data.orders.reduce(
//       (acc: any, order: any) => acc + order.totalPrice,
//       0
//     ) || 0;

//   return (
//     <div style={{ padding: "24px" }}>
//       <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
//         User Dashboard
//       </Title>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} lg={8}>
//           <Card style={{ borderRadius: "8px" }}>
//             <Statistic
//               title="Total Spending"
//               value={totalSpending}
//               prefix="$"
//               valueStyle={{ color: "#3f8600" }}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={8}>
//           <Card style={{ borderRadius: "8px" }}>
//             <Statistic
//               title="Total Orders"
//               value={data?.data.length || 0}
//               valueStyle={{ color: "#1890ff" }}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} sm={24} lg={8}>
//           <Card style={{ borderRadius: "8px" }}>
//             <Statistic
//               title="Pending Orders"
//               value={
//                 data?.data.orders.filter(
//                   (order: any) => order.status === "Pending"
//                 ).length || 0
//               }
//               valueStyle={{ color: "#cf1322" }}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default UserDashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Statistic, Typography, Table } from "antd";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { useGetOrdersQuery } from "../../redux/features/User/orderManagement.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Breakpoint } from "antd/es/_util/responsiveObserver";
const { Title } = Typography;

const UserDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetOrdersQuery(user?.email);

  const orders = data?.data?.orders || [];

  const totalSpending = orders.reduce(
    (acc: number, order: any) => acc + order.totalPrice,
    0
  );
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order: any) => order.status === "Pending"
  ).length;

  const chartData = [
    {
      name: "Pending",
      count: orders.filter((o: any) => o.status === "Pending").length,
    },
    {
      name: "Processing",
      count: orders.filter((o: any) => o.status === "Processing").length,
    },
    {
      name: "Delivered",
      count: orders.filter((o: any) => o.status === "Delivered").length,
    },
    {
      name: "Cancelled",
      count: orders.filter((o: any) => o.status === "Cancelled").length,
    },
  ];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      responsive: ["sm" as Breakpoint],
    },
    { title: "Meal", dataIndex: "mealName", key: "mealName" },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (v: number) => `$${v}`,
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["md" as Breakpoint],
    },
  ];

  const tableData = orders.map((order: any) => ({
    key: order.id,
    id: order.id,
    mealName: order.mealName || "Meal",
    totalPrice: order.totalPrice,
    status: order.status,
    createdAt: new Date(order.createdAt).toLocaleDateString(),
  }));

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        Welcome, {user?.name}
      </Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Spending"
              prefix="$"
              value={totalSpending}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={totalOrders}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <Card>
            <Statistic
              title="Pending Orders"
              value={pendingOrders}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card style={{ marginTop: 32 }}>
        <Title level={4}>Order Status Overview</Title>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1890ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Table */}
      <Card style={{ marginTop: 32 }}>
        <Title level={4}>Recent Orders</Title>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "100%" }}
        />
      </Card>
    </div>
  );
};

export default UserDashboard;
