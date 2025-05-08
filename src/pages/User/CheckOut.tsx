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
  Alert,
  Divider,
  Image,
  Spin,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState(user?.email || "");

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are not properly loaded.");
      setLoading(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) throw error;

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
        message.success("Order created successfully!");
      }
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product)
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

  return (
    <Row
      gutter={[32, 32]}
      style={{ maxWidth: 1400, margin: "60px auto", padding: "0 20px" }}
    >
      {/* Page Heading */}
      <Col span={24}>
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ marginBottom: 16 }}>
            Secure Checkout
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Complete your purchase - Just a few more steps to own your dream car
          </Text>
        </div>
      </Col>

      {/* Product Details Column */}
      <Col xs={24} md={12}>
        <Card
          bordered={false}
          style={{
            borderRadius: 12,
            overflow: "hidden",
          }}
          cover={
            <Image
              alt="product"
              src={product?.image}
              style={{ height: 300, objectFit: "cover" }}
              preview={false}
            />
          }
        >
          <div style={{ padding: 16 }}>
            <Title level={3} style={{ marginBottom: 8 }}>
              {product?.brand} {product?.model}
            </Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 16 }}
            >
              {product?.year} Model • {product?.category}
            </Text>

            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                ${basePrice}/unit
              </Title>
              <Space>
                <Button
                  shape="circle"
                  icon={<MinusOutlined />}
                  onClick={handleDecrease}
                  disabled={quantity === 1}
                />
                <Text strong style={{ width: 40, textAlign: "center" }}>
                  {quantity}
                </Text>
                <Button
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={handleIncrease}
                />
              </Space>
            </Space>

            <Divider style={{ margin: "16px 0" }} />

            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text strong style={{ fontSize: 16 }}>
                Total Amount:
              </Text>
              <Title level={3} style={{ margin: 0 }}>
                ${totalPrice.toFixed(2)}
              </Title>
            </Space>
          </div>
        </Card>
      </Col>

      {/* Payment Form Column */}
      <Col xs={24} md={12}>
        <Card
          bordered={false}
          style={{
            borderRadius: 12,
          }}
        >
          <Title level={4} style={{ marginBottom: 24 }}>
            Payment Information
          </Title>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Invalid email format" },
                  ]}
                  initialValue={user?.email}
                >
                  <Input size="large" placeholder="your@email.com" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input size="large" placeholder="+880 18 0000 0000" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Billing Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input.TextArea
                rows={2}
                placeholder="123 Main Street, Chittagong 5B"
                style={{ resize: "none" }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please enter your city" },
                  ]}
                >
                  <Input size="large" placeholder="Chittagong" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Card Details"
              help="We use Stripe for secure payments. Your card information is never stored."
            >
              <div
                style={{
                  padding: 12,
                  border: "1px solid #d9d9d9",
                  borderRadius: 6,
                  backgroundColor: "#fafafa",
                }}
              >
                <CardElement
                  options={{
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: "16px",
                        fontFamily: "inherit",
                      },
                    },
                  }}
                />
              </div>
            </Form.Item>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
              />
            )}

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              disabled={!stripe}
              style={{
                height: 48,
                fontSize: 16,
                borderRadius: 6,
                marginTop: 16,
                color: "black",
              }}
            >
              {loading
                ? "Processing Payment..."
                : `Pay $${totalPrice.toFixed(2)}`}
            </Button>

            <Text
              type="secondary"
              style={{ display: "block", marginTop: 16, textAlign: "center" }}
            >
              Secure payment processing powered by Stripe
            </Text>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckOut;
