import { Row, Col, Typography, Image, Divider } from "antd";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  const imageURL =
    "https://img.freepik.com/premium-photo/team-portrait-business-people-with-arms-crossed-city-corporate-teamwork-diversity-smile-together-group-employees-with-pride-trust-professional-solidarity-work_590464-212993.jpg";
  return (
    <div
      style={{
        margin: "60px 20px",
        padding: "50px 0",
        color: "#425a4f",
      }}
    >
      <Row justify="center" align="middle">
        <Col lg={12} md={24}>
          <Image src={imageURL} preview={false} style={{ borderRadius: 8 }} />
        </Col>
        <Col lg={12} md={24}>
          <Title level={2} style={{ color: "#425a4f" }}>
            About Us
          </Title>
          <Paragraph style={{ color: "#425a4f" }}>
            We are passionate about providing top-quality cars and exceptional
            customer service. Our mission is to make your car-buying experience
            seamless and enjoyable.
          </Paragraph>
          <Paragraph style={{ color: "#425a4f" }}>
            [Add more details about your shop here, e.g., * Our story: How did
            you start your shop? * Our team: Introduce the people behind the
            brand. * Our commitment: Any social or environmental initiatives you
            support.]
          </Paragraph>
          <Divider style={{ margin: "20px 0", borderColor: "#425a4f" }} />
          <Paragraph style={{ color: "#425a4f" }}>
            Visit our showroom today and experience the difference!
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
