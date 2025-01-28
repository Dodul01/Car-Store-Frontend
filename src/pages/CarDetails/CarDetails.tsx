import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleCarQuery } from "../../redux/features/productApi";
import { Card, Row, Col, Typography, List, Image, Button, Spin, message } from "antd";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { useOrderCarMutation } from "../../redux/features/User/orderManagement.api";

const { Title, Text } = Typography;

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetSingleCarQuery(id);
  const user = useAppSelector(selectCurrentUser);
  const [orderCar] = useOrderCarMutation();

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", textAlign: "center", marginTop: "50px" }}
      />
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

  const handleBuyNow = async () => {
    if(user){
      const orderInfo = {
        email: user.email,
        car: car._id,
        quantity: 1,
        totalPrice: car.price
      }
      const order = await orderCar(orderInfo).unwrap();

      if(order.success){
        message.success("Car Ordered Successfully.")
      }

      // TODO: I will use checkout page after paymet methods implementation
      // navigate(`/checkout/${car._id}`);
    }
  };

  return (
    <div style={{ margin: "60px auto", padding: "20px", maxWidth: "1400px" }}>
      <Row gutter={16}>
        <Col lg={12} md={24} sm={24}>
          <Image
            width={"100%"}
            height={300}
            alt={car.model}
            src={
              car.image || "https://via.placeholder.com/800x400?text=Car+Image"
            }
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
          <Title level={4} style={{ marginTop: "20px" }}>
            Description
          </Title>
          <Text>{car.description}</Text>
        </Col>
        <Col lg={12} md={24} sm={24}>
          <Card bordered={false}>
            <Title level={2}>
              {car.brand} {car.model}
            </Title>
            <List itemLayout="horizontal" size="large">
              <List.Item>
                <List.Item.Meta
                  title="Category"
                  avatar={<i className="far fa-folder-open"></i>}
                />
                <Text>{car.category}</Text>
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Price"
                  avatar={<i className="fas fa-dollar-sign"></i>}
                />
                <Text>${car.price}</Text>
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Year"
                  avatar={<i className="far fa-calendar-alt"></i>}
                />
                <Text>{car.year}</Text>
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Availability"
                  avatar={<i className="fas fa-check"></i>}
                />
                <Text>{car.inStock ? "In Stock" : "Out of Stock"}</Text>
              </List.Item>
            </List>

            <Button
              type="primary"
              size="large"
              disabled={!car.inStock}
              style={{
                width: "100%",
                backgroundColor: "#f3c6a4",
                color: "black",
                borderRadius: "8px",
                border: "none",
                marginTop: "20px",
              }}
              onClick={handleBuyNow}
            >
              {car.inStock ? "Buy Now" : "Out of Stock"}
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarDetails;
