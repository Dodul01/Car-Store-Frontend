/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import "./FeaturedProducts.css";
import { useGetFeaturndCarsQuery } from "../../redux/features/productApi";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const FeaturedProducts = () => {
  const { data } = useGetFeaturndCarsQuery(undefined);
  const navigate = useNavigate();

  return (
    <div className="vehicle-carousel-container">
      <div className="section-wrapper">
        <div className="section-header">
          <div>
            <Title level={2}>Featured Cars</Title>
            <Paragraph style={{ color: "#666", marginBottom: 40 }}>
              Best cars in our collection
            </Paragraph>
          </div>
          <Button type="default" onClick={() => navigate("/all-cars")}>
            View All
          </Button>
        </div>

        <div className="featured-products-container">
          {data?.data?.slice(0, 4).map((product: any) => (
            <div className="card" key={product.id}>
              <img
                className="card-image"
                src={product.image}
                alt={`${product.brand} ${product.model}`}
              />
              <div className="card-content">
                <h2>
                  {product.brand} {product.model}
                </h2>
                <p className="price">${product.price}</p>
                <div
                  onClick={() => navigate(`/${product._id}`)}
                  className="arrow"
                >
                  View Details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
