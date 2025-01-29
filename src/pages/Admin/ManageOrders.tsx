import { useState } from "react";
import { Table, Tag, Select, Card, Spin, Button, Modal, message } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/Admin/orderManagement.api";

const { Option } = Select;
const { confirm } = Modal;

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered"];

const ManageOrders = () => {
  const { data, isLoading, refetch } = useGetAllOrdersQuery(null);
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isLoading) return <Spin size="large" />;

  const orders = data?.data?.allOrders || [];

  const totalAssetValue = orders.reduce(
    (sum: number, order: { totalPrice: number }) => sum + order.totalPrice,
    0
  );

  const filteredOrders = filteredStatus
    ? orders.filter(
        (order: { status: string }) => order.status === filteredStatus
      )
    : orders;

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const args = {
        id: orderId,
        status: newStatus,
      };
      console.log(args);

      const result = await updateOrderStatus(args).unwrap();

      if (result.status) {
        refetch();
        message.success("Order updated successfully");
      }
    } catch (error) {
      console.error("Update Error:", error);

      message.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    confirm({
      title: "Are you sure you want to delete this order?",
      content: "This action cannot be undone",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const result = await deleteOrder({ _id: id }).unwrap();
          if (result.status) {
            refetch();
            message.success("Order deleted successfully.");
          }
        } catch (error) {
          Modal.error({
            title: "Failed to delete order",
            content: "Please try again later",
          });
        }
      },
    });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => <strong>{text.slice(-6)}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Pending"
              ? "orange"
              : status === "Processing"
              ? "blue"
              : status === "Shipped"
              ? "purple"
              : "green"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Select
            defaultValue={record.status}
            onChange={(value) => handleStatusChange(record._id, value)}
            style={{ width: 120 }}
          >
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
          <Button
            danger
            onClick={() => handleDelete(record._id)}
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card style={{ marginBottom: 20, background: "#425a4f", color: "#fff" }}>
        <h2 style={{ color: "#fff" }}>
          Total Asset Value: ${totalAssetValue.toLocaleString()}
        </h2>
        <p style={{ color: "#fff" }}>Total Orders: {orders.length}</p>
      </Card>

      <Select
        placeholder="Filter by Status"
        allowClear
        onChange={(value) => setFilteredStatus(value)}
        style={{ width: 200, marginBottom: 20 }}
      >
        {statusOptions.map((status) => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </Select>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="_id"
        bordered
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ManageOrders;
