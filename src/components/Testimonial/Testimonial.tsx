import { Carousel, Card, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const testimonials = [
  {
    name: "John Doe",
    position: "Product Manager",
    feedback:
      "Amazing service! The car was clean and the booking process was smooth. I’ll definitely rent again.",
  },
  {
    name: "Jane Smith",
    position: "Freelancer",
    feedback:
      "The variety of cars is impressive and the support team was very helpful. Highly recommend!",
  },
  {
    name: "Ali Khan",
    position: "Entrepreneur",
    feedback:
      "Affordable pricing and great experience overall. It felt premium from start to end.",
  },
];

const TestimonialCarousel = () => {
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <Title level={2} style={{ marginBottom: 8 }}>
        What Our Customers Say
      </Title>
      <Paragraph style={{ color: "#666", marginBottom: 40 }}>
        Real feedback from happy clients across the globe.
      </Paragraph>

      <Carousel autoplay dots>
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 16px",
            }}
          >
            <Card
              style={{
                width: "100%",
                maxWidth: 600,
                margin: "auto",
                borderRadius: 12,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#fff",
                textAlign: "left",
              }}
            >
              <Paragraph style={{ fontStyle: "italic", color: "#333" }}>
                “{testimonial.feedback}”
              </Paragraph>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div>
                  <Avatar
                    size={54}
                    icon={<UserOutlined />}
                    style={{ flexShrink: 0 }}
                  />
                </div>
                <div>
                  <Paragraph style={{ fontWeight: "bold", marginTop: 16 }}>
                    {testimonial.name}
                  </Paragraph>
                  <Paragraph style={{ color: "#888", marginTop: -8 }}>
                    {testimonial.position}
                  </Paragraph>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
