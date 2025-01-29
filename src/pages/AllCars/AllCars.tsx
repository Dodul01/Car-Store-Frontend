// import { useState } from "react";
// import { Input, Select, Row, Col, Card, Button, Typography } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { useGetAllCarsQuery } from "../../redux/features/productApi";
// import { useNavigate } from "react-router-dom";

// const { Title } = Typography;
// const { Option } = Select;

// const AllCars = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [priceRange, setPriceRange] = useState([5000, 100000]);
//   const navigate = useNavigate();

//   const handlePriceRangeChange = (value: string) => {
//     if (value) {
//       const [minPrice, maxPrice] = value
//         .split("-")
//         .map((price: string) =>
//           parseInt(price.replace("$", "").replace(",", ""), 10)
//         );
//       setPriceRange([minPrice, maxPrice]);
//     } else {
//       setPriceRange([5000, 100000]); // Default range
//     }
//   };

//   const { data } = useGetAllCarsQuery({
//     searchTerm,
//     selectedBrand,
//     selectedCategory,
//     priceRange,
//   });

//   return (
//     <div
//       style={{
//         padding: "40px",
//         backgroundColor: "#f4f4f4",
//         minHeight: "100vh",
//         margin: '40px 0px'
//       }}
//     >
//       <Title style={{ textAlign: "center", color: "#333" }}>All Cars</Title>

//       {/* Search and Filters */}
//       <Row gutter={[16, 16]} style={{ marginBottom: "30px" }}>
//         <Col xs={24} sm={12} md={8}>
//           <Input
//             placeholder="Search by brand, name, or category"
//             prefix={<SearchOutlined />}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ width: "100%", borderRadius: "8px" }}
//           />
//         </Col>

//         {/* Brand Filter */}
//         <Col xs={24} sm={12} md={8}>
//           <Select
//             placeholder="Select Brand"
//             value={selectedBrand}
//             onChange={setSelectedBrand}
//             style={{ width: "100%", borderRadius: "8px" }}
//           >
//             <Option value="">All Brands</Option>
//             {/* find brand from data and show here */}
//             <Option value="Toyota">Toyota</Option>
//             <Option value="Honda">Honda</Option>
//             <Option value="BMW">BMW</Option>
//           </Select>
//         </Col>

//         {/* Category Filter */}
//         <Col xs={24} sm={12} md={8}>
//           <Select
//             placeholder="Select Category"
//             value={selectedCategory}
//             onChange={setSelectedCategory}
//             style={{ width: "100%", borderRadius: "8px" }}
//           >
//             <Option value="">All Categories</Option>
//           {/* find data from data and show here */}
//             <Option value="SUV">SUV</Option>
//             <Option value="Sedan">Sedan</Option>
//             <Option value="Truck">Truck</Option>
//           </Select>
//         </Col>
//       </Row>

//       {/* Price Range Filter */}
//       <Row gutter={[16, 16]} style={{ marginBottom: "30px" }}>
//         <Col xs={24} sm={12} md={8}>
//           <Select
//             placeholder="Select Price Range"
//             value={priceRange.join("-")}
//             onChange={handlePriceRangeChange}
//             style={{ width: "100%", borderRadius: "8px" }}
//           >
//             <Option value="0-100000">All</Option>
//             <Option value="5000-10000">$5000-$10000</Option>
//             <Option value="10000-20000">$10000-$20000</Option>
//             <Option value="20000-30000">$20000-$30000</Option>
//             <Option value="30000-40000">$30000-$40000</Option>
//             <Option value="40000-50000">$40000-$50000</Option>
//             <Option value="50000-60000">$50000-$60000</Option>
//             <Option value="60000-70000">$60000-$70000</Option>
//             <Option value="70000-80000">$70000-$80000</Option>
//             <Option value="80000-90000">$80000-$90000</Option>
//             <Option value="90000-100000">$90000-$100000</Option>
//           </Select>
//         </Col>
//       </Row>

//       {/* Car Listings */}
//       <Row gutter={[24, 24]}>
//         {data?.data?.length > 0 ? (
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           data?.data.map((car: any) => (
//             <Col xs={24} sm={12} md={8} key={car.id}>
//               <Card
//                 hoverable
//                 cover={
//                   <img
//                     alt={car.name}
//                     src={car.image}
//                     style={{
//                       borderRadius: "8px",
//                       height: "150px",
//                       objectFit: "cover",
//                     }}
//                   />
//                 }
//                 style={{
//                   borderRadius: "10px",
//                   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <Title level={4}>
//                   {car.brand} {car.name}
//                 </Title>
//                 <p>
//                   <strong>Model:</strong> {car.model}
//                 </p>
//                 <p>
//                   <strong>Price:</strong> ${car.price}
//                 </p>
//                 <p>
//                   <strong>Category:</strong> {car.category}
//                 </p>
//                 <Button
//                   type="primary"
//                   style={{
//                     width: "100%",
//                     backgroundColor: "#f3c6a4",
//                     color: "black",
//                     border: "none",
//                   }}
//                   onClick={() => navigate(`/${car._id}`)}
//                 >
//                   View Details
//                 </Button>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <Col span={24}>
//             <p style={{ textAlign: "center", color: "#999", fontSize: "18px" }}>
//               No cars found matching your criteria.
//             </p>
//           </Col>
//         )}
//       </Row>
//     </div>
//   );
// };

// export default AllCars;
import { useState } from "react";
import { Input, Select, Row, Col, Card, Button, Typography } from "antd";
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

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        margin: "40px 0px",
      }}
    >
      <Title
        style={{ textAlign: "center", color: "#333", marginBottom: "40px" }}
      >
        Explore Our Car Collection
      </Title>

      {/* Search and Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: "30px" }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by brand, name, or category"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Col>

        {/* Brand Filter */}
        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Select Brand"
            value={selectedBrand}
            onChange={setSelectedBrand}
            style={{ width: "100%", borderRadius: "8px" }}
            showSearch
            optionFilterProp="children"
          >
            <Option value="">All Brands</Option>
            {brands.map((brand) => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Col>

        {/* Category Filter */}
        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Select Category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: "100%", borderRadius: "8px" }}
            showSearch
            optionFilterProp="children"
          >
            <Option value="">All Categories</Option>
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* Price Range Filter */}
      <Row gutter={[16, 16]} style={{ marginBottom: "30px" }}>
        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Select Price Range"
            value={priceRange.join("-")}
            onChange={handlePriceRangeChange}
            style={{ width: "100%", borderRadius: "8px" }}
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
        </Col>
      </Row>

      {/* Car Listings */}
      <Row gutter={[24, 24]}>
        {data?.data?.length > 0 ? (
          data?.data.map((car: any) => (
            <Col xs={24} sm={12} md={8} lg={6} key={car.id}>
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
                    backgroundColor: "#f3c6a4",
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
    </div>
  );
};

export default AllCars;
