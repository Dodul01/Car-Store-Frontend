/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Input,
  Select,
  Row,
  Col,
  Card,
  Button,
  Typography,
  Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllCarsQuery } from "../../redux/features/productApi";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

const AllCars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([5000, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;
  const navigate = useNavigate();

  const handlePriceRangeChange = (value: string) => {
    if (value) {
      const [minPrice, maxPrice] = value
        .split("-")
        .map((price: string) =>
          parseInt(price.replace("$", "").replace(",", ""), 10)
        );
      setPriceRange([minPrice, maxPrice]);
    } else {
      setPriceRange([5000, 100000]);
    }
  };

  const { data } = useGetAllCarsQuery({
    searchTerm,
    selectedBrand,
    selectedCategory,
    priceRange,
  });

  // Get unique brands and categories from data
  const brands = Array.from(
    new Set(data?.data?.map((car: any) => car.brand))
  ) as string[];
  const categories = Array.from(
    new Set(data?.data?.map((car: any) => car.category))
  ) as string[];

  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = data?.data?.slice(startIndex, startIndex + carsPerPage);

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        maxWidth: "1400px",
        margin: "60px auto",
      }}
    >
      <Row gutter={[24, 24]}>
        {/* Sticky Sidebar */}
        <Col xs={24} sm={24} md={8} lg={6} style={{ marginBottom: "24px" }}>
          <div
            style={{
              position: "sticky",
              top: "80px",
              height: "fit-content",
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={4} style={{ marginBottom: "24px" }}>
              Filters
            </Title>

            {/* Brand Filter */}
            <div style={{ marginBottom: "24px" }}>
              <Text strong>Brand</Text>
              <Select
                placeholder="All Brands"
                value={selectedBrand}
                onChange={setSelectedBrand}
                style={{ width: "100%", marginTop: "8px" }}
                showSearch
                optionFilterProp="children"
                allowClear
              >
                {brands.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: "24px" }}>
              <Text strong>Category</Text>
              <Select
                placeholder="All Categories"
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: "100%", marginTop: "8px" }}
                showSearch
                optionFilterProp="children"
                allowClear
              >
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <Text strong>Price Range</Text>
              <Select
                placeholder="Select Price Range"
                value={priceRange.join("-")}
                onChange={handlePriceRangeChange}
                style={{ width: "100%", marginTop: "8px" }}
                allowClear
              >
                <Option value="0-100000">All</Option>
                <Option value="5000-10000">$5,000-$10,000</Option>
                <Option value="10000-20000">$10,000-$20,000</Option>
                <Option value="20000-30000">$20,000-$30,000</Option>
                <Option value="30000-40000">$30,000-$40,000</Option>
                <Option value="40000-50000">$40,000-$50,000</Option>
                <Option value="50000-60000">$50,000-$60,000</Option>
                <Option value="60000-70000">$60,000-$70,000</Option>
                <Option value="70000-80000">$70,000-$80,000</Option>
                <Option value="80000-90000">$80,000-$90,000</Option>
                <Option value="90000-100000">$90,000-$100,000</Option>
              </Select>
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={24} sm={24} md={16} lg={18}>
          {/* Search Bar */}
          <div style={{ marginBottom: "32px" }}>
            <Input
              placeholder="Search cars..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                display: "flex",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Car Listings */}
          <Row gutter={[24, 24]}>
            {paginatedCars?.length > 0 ? (
              paginatedCars?.map((car: any) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={car.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={car.name}
                        src={car.image}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                        }}
                      />
                    }
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    bodyStyle={{ flexGrow: 1 }}
                  >
                    <div style={{ marginBottom: "16px" }}>
                      <Title level={4} style={{ marginBottom: "8px" }}>
                        {car.brand} {car.name}
                      </Title>
                      <div style={{ marginBottom: "12px" }}>
                        <Text strong style={{ display: "block" }}>
                          Model: <Text type="secondary">{car.model}</Text>
                        </Text>
                        <Text strong style={{ display: "block" }}>
                          Price:{" "}
                          <Text type="secondary">
                            ${car.price.toLocaleString()}
                          </Text>
                        </Text>
                        <Text strong style={{ display: "block" }}>
                          Category: <Text type="secondary">{car.category}</Text>
                        </Text>
                      </div>
                    </div>
                    <Button
                      type="primary"
                      block
                      style={{
                        color: "#000",
                        marginTop: "auto",
                      }}
                      onClick={() => navigate(`/${car._id}`)}
                    >
                      View Details
                    </Button>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <Title level={4} style={{ color: "#666" }}>
                    No cars found matching your criteria
                  </Title>
                </div>
              </Col>
            )}
          </Row>
        </Col>

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
            pageSize={carsPerPage}
            total={data?.data?.length || 0}
            onChange={setCurrentPage}
            style={{ marginTop: 32, textAlign: "center" }}
          />
        </div>
      </Row>
    </div>
  );
};

export default AllCars;
