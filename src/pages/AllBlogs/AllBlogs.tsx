import { useState } from "react";
import { Input, Row, Col, Card, Button, Typography, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { blogs } from "../../components/BlogSection/blogs";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  return (
    <div style={{ padding: "48px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        All Blogs
      </Title>

      <Input
        placeholder="Search blogs..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        size="large"
        style={{ maxWidth: "600px", margin: "0 auto 40px", display: "flex" }}
      />

      <Row gutter={[24, 24]}>
        {paginatedBlogs.map((blog, idx) => (
          <Col xs={24} sm={12} md={8} key={idx}>
            <Card
              hoverable
              cover={
                <img
                  alt={blog.title}
                  src={blog.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
              style={{ borderRadius: "8px", height: "100%" }}
            >
              <Title level={4}>{blog.title}</Title>
              <Paragraph ellipsis={{ rows: 2 }}>{blog.summary}</Paragraph>
              <Button
                type="primary"
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                Read More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={blogsPerPage}
          total={filteredBlogs.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 40, textAlign: "center" }}
        />
      </div>
    </div>
  );
};

export default AllBlogs;
