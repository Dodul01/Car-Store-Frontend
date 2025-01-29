import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { useGetOrdersQuery } from "../../redux/features/User/orderManagement.api";
import { useAppSelector } from "../../redux/hook";
import {
  Card,
  Grid,
  Spin,
  Typography,
  Tag,
  Empty,
  Alert,
  Row,
  Col,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
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

  const cardSpacing = screens.md ? 24 : 12;
  const cardWidth = screens.lg ? "80%" : "100%";

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

  return (
    <div
      style={{
        padding: screens.xs ? "16px" : "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Title level={2} style={{ marginBottom: "32px", textAlign: "center" }}>
        Your Orders
      </Title>

      <Row gutter={[cardSpacing, cardSpacing]} justify="center">
        {orders.map((order) => {
          const car = cars.find((c) => c._id === order.car);
          const status = order.status || "Pending";

          return (
            <Col key={order._id} xs={24} md={18} lg={16}>
              <Card
                bordered
                hoverable
                style={{
                  width: cardWidth,
                  marginBottom: screens.xs ? "16px" : 0,
                }}
                title={
                  <Text strong ellipsis>
                    {car ? `${car.brand} ${car.model}` : "Unknown Vehicle"}
                  </Text>
                }
                extra={
                  <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
                }
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Text type="secondary">Order ID:</Text>
                    <Text strong block>
                      {order._id}
                    </Text>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Text type="secondary">Quantity:</Text>
                    <Text strong block>
                      {order.quantity}
                    </Text>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Text type="secondary">Total Price:</Text>
                    <Text strong block>
                      ${order.totalPrice?.toLocaleString()}
                    </Text>
                  </Col>

                  <Col xs={24}>
                    <Text type="secondary">Order Date:</Text>
                    <Text strong block>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TrackMyOrderPage;
