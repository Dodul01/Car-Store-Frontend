import { Card, Col, Row, Statistic, Typography } from "antd";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { useGetOrdersQuery } from "../../redux/features/User/orderManagement.api";

const { Title } = Typography;

const UserDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetOrdersQuery(user?.email);

  const totalSpending = data?.data.orders.reduce((acc, order) => acc + order.totalPrice, 0) || 0;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        User Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: "8px" }}>
            <Statistic
              title="Total Spending"
              value={totalSpending}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: "8px" }}>
            <Statistic
              title="Total Orders"
              value={data?.data.length || 0}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} lg={8}>
          <Card style={{ borderRadius: "8px" }}>
            <Statistic
              title="Pending Orders"
              value={data?.data.orders.filter((order) => order.status === "Pending").length || 0}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
