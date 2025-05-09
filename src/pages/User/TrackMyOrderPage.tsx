/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { useGetOrdersQuery } from "../../redux/features/User/orderManagement.api";
import { useAppSelector } from "../../redux/hook";
import { Grid, Spin, Typography, Tag, Empty, Alert, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { Breakpoint } from "antd/es/_util/responsiveObserver";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const statusColors: Record<string, string> = {
  Pending: "gold",
  Processing: "blue",
  Shipped: "geekblue",
  Delivered: "green",
  Canceled: "red",
};

const TrackMyOrderPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const screens = useBreakpoint();
  const { data, isLoading, isError, error } = useGetOrdersQuery(user?.email);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "25vh" }}>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48 }} />}
          tip="Loading your orders..."
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert
          message="Error Loading Orders"
          description={(error as any)?.message || "Please try again later"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const orders = data?.data?.orders || [];
  const cars = data?.data?.cars || [];

  if (orders.length === 0) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No orders found"
        />
      </div>
    );
  }

  // Table data
  const tableData = orders.map((order: any, index: number) => {
    const car = cars.find((c: any) => c._id === order.car);
    return {
      key: order._id,
      index: index + 1,
      car: car ? `${car.brand} ${car.model}` : "Unknown",
      status: order.status || "Pending",
      quantity: order.quantity,
      price: `$${order.totalPrice?.toLocaleString()}`,
      date: new Date(order.createdAt).toLocaleDateString(),
    };
  });
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 50,
      responsive: ["md" as Breakpoint],
    },
    {
      title: "Car",
      dataIndex: "car",
      key: "car",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["md" as Breakpoint],
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Order Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div
      style={{
        padding: screens.xs ? "16px" : "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Table View */}
      <div style={{ marginTop: "48px" }}>
        <Title level={4} style={{ marginBottom: "16px" }}>
          Orders Summary
        </Title>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
          bordered
        />
      </div>
    </div>
  );
};

export default TrackMyOrderPage;
