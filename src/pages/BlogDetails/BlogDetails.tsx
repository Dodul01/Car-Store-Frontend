import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../../components/BlogSection/blogs";
import { Row, Col, Typography, Card, Button } from "antd";

const { Title, Paragraph } = Typography;

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === id);

  // Exclude current blog and pick 4 random
  const recommended = blogs
    .filter((b) => b.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (!blog)
    return (
      <div style={{ padding: "80px", textAlign: "center" }}>Blog not found</div>
    );

  return (
    <div style={{ padding: "48px 24px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Blog Details */}
      <Title level={2} style={{ marginBottom: "24px" }}>
        {blog.title}
      </Title>
      <img
        src={blog.image}
        alt={blog.title}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      />
      <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
        {blog.summary}
      </Paragraph>

      {/* You May Also Like */}
      <Title level={3} style={{ marginTop: "64px", marginBottom: "24px" }}>
        You May Also Like
      </Title>
      <Row gutter={[24, 24]}>
        {recommended.map((item) => (
          <Col xs={24} sm={12} md={12} lg={6} key={item.id}>
            <Card
              hoverable
              cover={
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ height: "160px", objectFit: "cover" }}
                />
              }
              style={{ borderRadius: "8px", height: "100%" }}
            >
              <Title level={5}>{item.title}</Title>
              <Paragraph ellipsis={{ rows: 2 }}>{item.summary}</Paragraph>
              <Button
                type="dashed"
                onClick={() => navigate(`/blogs/${item.id}`)}
              >
                Read More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogDetails;
