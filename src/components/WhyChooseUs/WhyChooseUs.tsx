import { Row, Col, Card, Typography } from "antd";
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  DollarCircleOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import "./WhyChooseUs.css";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 36, color: "#1890ff" }} />,
    title: "Trusted Quality",
    description: "We only offer certified vehicles with complete inspection history.",
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: 36, color: "#52c41a" }} />,
    title: "Fast Process",
    description: "Smooth and quick rental or purchase process from start to finish.",
  },
  {
    icon: <DollarCircleOutlined style={{ fontSize: 36, color: "#faad14" }} />,
    title: "Affordable Pricing",
    description: "Get the best value with transparent pricing and no hidden fees.",
  },
  {
    icon: <CustomerServiceOutlined style={{ fontSize: 36, color: "#eb2f96" }} />,
    title: "24/7 Support",
    description: "Our support team is here for you anytime, anywhere.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us-section">
      <div className="why-choose-us-container">
        <Title level={2} className="why-title">Why Choose Us</Title>
        <Paragraph className="why-subtitle">
          Discover what sets us apart from the competition.
        </Paragraph>
        <Row gutter={[24, 24]}>
          {features.map((item, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <Card bordered={false} className="why-card" hoverable>
                {item.icon}
                <Title level={4}>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default WhyChooseUs;
