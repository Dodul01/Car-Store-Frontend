import { Card, Row, Col, Typography, Button } from "antd";
import { blogs } from "./blogs";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const BlogSection = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff", padding: "60px 20px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Title level={2}>From Our Blog</Title>
            <Paragraph style={{ color: "#666", marginBottom: 40 }}>
              Insights, tips, and guides to make your car rental experience
              better.
            </Paragraph>
          </div>

          <div>
            <Button type="default" onClick={() => navigate("/all-blogs")}>
              View All
            </Button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Row gutter={[24, 24]} justify="center">
          {blogs.slice(0, 4).map((blog, idx) => (
            <Col xs={24} sm={12} md={6} key={idx}>
              <Card
                hoverable
                cover={
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ height: 180, objectFit: "cover" }}
                  />
                }
              >
                <Title level={4}>{blog.title}</Title>
                <Paragraph ellipsis={{ rows: 2 }}>{blog.summary}</Paragraph>
                <Button
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  style={{ width: "100%" }}
                  variant="link"
                >
                  Read More
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BlogSection;
