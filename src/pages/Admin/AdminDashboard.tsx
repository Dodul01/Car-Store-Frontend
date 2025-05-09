/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Skeleton, Statistic, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useGetRevinueQuery } from "../../redux/features/Admin/revinueManagement.api";
import { useGetFeaturndCarsQuery } from "../../redux/features/productApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

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

  const totalCars =
    carsData?.data?.filter((car: any) => car.inStock).length || 0;

  const carBrandStats =
    carsData?.data?.reduce((acc: any, car: any) => {
      const brand = car.brand || "Unknown";
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {}) || {};

  const brandData = Object.entries(carBrandStats).map(([brand, count]) => ({
    brand,
    count,
  }));

  const COLORS = ["#2c3d34", "#3e8e7e", "#92b6a9", "#cfc5c0", "#e1d7d2"];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  if (revenueError || carsError) {
    return (
      <Typography.Text type="danger">
        Error loading dashboard data
      </Typography.Text>
    );
  }

  return (
    <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "24px" }}>
      <Title level={3} style={{ color: "#2c3d34", marginBottom: "24px" }}>
        Admin Dashboard Overview
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card
            style={{ background: "#e1d7d2", borderRadius: "8px" }}
            hoverable
          >
            {isCarsLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <Statistic
                title="Cars In Stock"
                value={totalCars}
                prefix="🚗"
                valueStyle={{
                  color: "#2c3d34",
                  fontSize: "32px",
                  fontWeight: 600,
                }}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card
            style={{ background: "#e1d7d2", borderRadius: "8px" }}
            hoverable
          >
            {isRevenueLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <Statistic
                title="Total Revenue"
                value={revenueData?.data?.totalRevenue}
                formatter={(value) => formatter.format(Number(value))}
                prefix="💰"
                valueStyle={{
                  color: "#2c3d34",
                  fontSize: "32px",
                  fontWeight: 600,
                }}
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
        <Col xs={24} lg={12}>
          <Card title="Cars by Brand">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brandData}>
                <XAxis dataKey="brand" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2c3d34" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Car Stock Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={brandData}
                  dataKey="count"
                  nameKey="brand"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {brandData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
