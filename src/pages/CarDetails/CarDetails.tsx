/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useNavigate } from "react-router-dom";
import {
  useGetFeaturndCarsQuery,
  useGetSingleCarQuery,
} from "../../redux/features/productApi";
import {
  Card,
  Row,
  Col,
  Typography,
  List,
  Image,
  Button,
  Spin,
  Tag,
} from "antd";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { useState } from "react";

const { Title, Text } = Typography;

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetSingleCarQuery(id);
  const { data: allCar } = useGetFeaturndCarsQuery(undefined);
  const user = useAppSelector(selectCurrentUser);
  const [showFullDesc, setShowFullDesc] = useState(false);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
        Error loading car details.
      </p>
    );
  }

  const car = data?.data[0];
  if (!car) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px" }}>Car not found.</p>
    );
  }

  // Get related cars (same category, excluding current car)
  const relatedCars =
    allCar?.data
      ?.filter((c: any) => c.category === car.category && c._id !== car._id)
      .slice(0, 4) || [];

  const handleBuyNow = async () => {
    if (user) {
      navigate(`/checkout/${car._id}`);
    } else {
      navigate("/signIn");
    }
  };

  return (
    <div style={{ margin: "60px auto", padding: "20px", maxWidth: "1400px" }}>
      <Row gutter={[32, 32]}>
        {/* Image Column */}
        <Col lg={12} md={24} sm={24}>
          <Image
            width="100%"
            height={480}
            alt={car.model}
            src={
              car.image || "https://via.placeholder.com/800x400?text=Car+Image"
            }
            style={{
              borderRadius: "12px",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </Col>

        {/* Details Column */}
        <Col lg={12} md={24} sm={24}>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }}>
              <Tag
                color="#F2C8A7"
                style={{ fontSize: 14, padding: "4px 12px", color: "black" }}
              >
                {car.category}
              </Tag>
              <Title level={2} style={{ margin: "16px 0 8px" }}>
                {car.brand} {car.model}
              </Title>
              <Text type="secondary" style={{ fontSize: 18 }}>
                {car.year} Model
              </Text>

              <List
                itemLayout="horizontal"
                size="large"
                style={{ margin: "24px 0" }}
              >
                {[
                  {
                    label: "Price",
                    value: `$${car.price}`,
                    icon: "fas fa-dollar-sign",
                  },
                  {
                    label: "Availability",
                    value: car.inStock ? "Available Now" : "Out of Stock",
                    icon: car.inStock
                      ? "fas fa-check-circle"
                      : "fas fa-times-circle",
                    status: car.inStock ? "success" : "error",
                  },
                  { label: "Stock", value: car.quantity, icon: "fas fa-car" },
                ].map((item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={
                        <i className={item.icon} style={{ fontSize: 20 }} />
                      }
                      title={<Text strong>{item.label}</Text>}
                    />
                    <Tag
                      color={item.status || "default"}
                      style={{ fontSize: 16 }}
                    >
                      {item.value}
                    </Tag>
                  </List.Item>
                ))}
              </List>

              {/* Description Section */}
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 24 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Key Features
                </Title>
                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    display: "block",
                    maxHeight: showFullDesc ? "none" : 90,
                    overflowY: "auto",
                    paddingRight: 8,
                  }}
                >
                  {car.description}
                </Text>
                <Button
                  type="link"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  style={{ paddingLeft: 0, marginTop: 8, color: "black" }}
                >
                  {showFullDesc ? "Show Less" : "Read More"}
                </Button>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              block
              disabled={!car.inStock}
              style={{
                height: 48,
                fontSize: 18,
                borderRadius: 8,
                backgroundColor: "#F2C8A7",
                borderColor: "#F2C8A7",
                color: "black",
                marginTop: 24,
              }}
              onClick={handleBuyNow}
            >
              {car.inStock ? "Purchase Now" : "Notify When Available"}
            </Button>
          </Card>
        </Col>

        {/* You May Also Like Section */}
        <Col span={24} style={{ marginTop: 20 }}>
          <Title level={3} style={{ marginBottom: 32 }}>
            You May Also Like This {car.category}
          </Title>
          <Row gutter={[24, 24]}>
            {relatedCars.map((vehicle: any) => (
              <Col xl={6} lg={8} md={12} sm={24} key={vehicle._id}>
                <Card
                  hoverable
                  cover={
                    <Image
                      alt={vehicle.model}
                      src={vehicle.image}
                      height={200}
                      style={{ objectFit: "cover" }}
                      preview={false}
                    />
                  }
                  onClick={() => navigate(`/${vehicle._id}`)}
                  style={{ borderRadius: 8 }}
                >
                  <div style={{ padding: 12 }}>
                    <Text strong style={{ fontSize: 16 }}>
                      {vehicle.brand} {vehicle.model}
                    </Text>
                    <div style={{ margin: "8px 0" }}>
                      <Tag color="#F2C8A7" style={{ color: "black" }}>
                        ${vehicle.price}
                      </Tag>
                      <Tag>{vehicle.category}</Tag>
                    </div>
                    <Button
                      type="dashed"
                      block
                      onClick={() => navigate(`/${vehicle._id}`)}
                    >
                      Quick View
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CarDetails;
