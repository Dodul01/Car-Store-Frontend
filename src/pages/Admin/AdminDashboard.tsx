import { Card, Col, Row, Skeleton, Statistic, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useGetRevinueQuery } from "../../redux/features/Admin/revinueManagement.api";
import { useGetFeaturndCarsQuery } from "../../redux/features/productApi";

const AdminDashboard = () => {
  const {
    data: revenueData,
    error: revenueError,
    isLoading: isRevenueLoading,
  } = useGetRevinueQuery(null);

  const {
    data: carsData,
    error: carsError,
    isLoading: isCarsLoading,
  } = useGetFeaturndCarsQuery(undefined);

  console.log(carsData);
  console.log(revenueData);

  // Calculate total available cars (in stock)
  const totalCars = carsData?.data?.filter((car) => car.inStock).length || 0;

  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  if (revenueError || carsError)
    return (
      <Typography.Text type="danger">
        Error loading dashboard data
      </Typography.Text>
    );

  return (
    <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
      <Title level={3} style={{ color: "#2c3d34", marginBottom: "24px" }}>
        Dashboard Overview
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            style={{
              background: "#e1d7d2",
              borderRadius: "8px",
              border: "none",
              transition: "transform 0.3s",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            {isCarsLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <Statistic
                title="Total Available Cars In Stock"
                value={totalCars}
                valueStyle={{
                  color: "#2c3d34",
                  fontSize: "32px",
                  fontWeight: 600,
                }}
                prefix={<span style={{ marginRight: 8 }}>🚗</span>}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card
            hoverable
            style={{
              background: "#e1d7d2",
              borderRadius: "8px",
              border: "none",
              transition: "transform 0.3s",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            {isRevenueLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <Statistic
                title="Total Revenue"
                value={revenueData?.data?.totalRevenue}
                formatter={(value) => formatter.format(value)}
                valueStyle={{
                  color: "#2c3d34",
                  fontSize: "32px",
                  fontWeight: 600,
                }}
                prefix={<span style={{ marginRight: 8 }}>💰</span>}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
