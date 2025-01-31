/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Form,
  message,
  Row,
  Col,
  Typography,
  Space,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../redux/features/productApi";
import { useOrderCarMutation } from "../../redux/features/User/orderManagement.api";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const { Title, Text } = Typography;

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const { data } = useGetSingleCarQuery(id);
  const product = data?.data[0];
  const [quantity, setQuantity] = useState(1);
  const basePrice = product?.price;
  const totalPrice = basePrice * quantity;
  const [orderCar] = useOrderCarMutation();
  const user = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(user?.email || "");

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    // Get the card element and confirm payment
    if (!stripe || !elements) {
      setError("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are not properly loaded.");
      setLoading(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    console.log(error);

    try {
      const orderData = {
        car: product._id,
        quantity,
        totalPrice,
        email,
        address: values.address,
        city: values.city,
        phone: values.phone,
        id: paymentMethod?.id,
      };

      const result = await orderCar(orderData);

      if (result.data.data.status) {
        message.success("Order created successfully.");
        // window.location.assign(
        //   "https://assignment-two-one-omega.vercel.app/seller/track-order"
        // );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Row
      gutter={[32, 32]}
      style={{ maxWidth: 1200, margin: "90px auto", padding: "0 20px" }}
    >
      <Col xs={24} md={12}>
        <Card
          hoverable
          style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          cover={
            <img
              alt="product"
              src={product?.image}
              style={{ height: 280, objectFit: "cover" }}
            />
          }
        >
          <Title level={3}>
            {product?.brand} {product?.model}
          </Title>
          <Title level={5}>Year: {product?.year}</Title>
          <Space align="center" style={{ justifyContent: "space-between" }}>
            <Title level={4}>${basePrice}/unit</Title>
            <Space>
              <Button
                shape="circle"
                icon={<MinusOutlined />}
                onClick={handleDecrease}
              />
              <Text strong>{quantity}</Text>
              <Button
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleIncrease}
              />
            </Space>
          </Space>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card
          title={<Title level={3}>Payment Details</Title>}
          style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input size="large" placeholder="+880 18 0000 0000" />
            </Form.Item>

            <Form.Item
              label="Billing Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="123 Main Street, Chittagong 5B"
              />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input size="large" placeholder="Chittagong" />
            </Form.Item>

            <Form.Item
              rules={[{ required: true, message: "Please enter your city" }]}
              label="Email"
              name="email"
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item label="Card Details">
              <div
                style={{
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              >
                <CardElement options={{ hidePostalCode: true }} />
              </div>
            </Form.Item>

            {error && <Text type="danger">{error}</Text>}

            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                margin: "24px 0",
              }}
            >
              <Text strong style={{ fontSize: 16 }}>
                Total:
              </Text>
              <Title level={3}>${totalPrice.toFixed(2)}</Title>
            </Space>

            <Button
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                height: 48,
                fontSize: 16,
                backgroundColor: "#f2c8a7",
                color: "black",
                border: "none",
              }}
            >
              {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckOut;
