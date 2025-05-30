/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useGetFeaturndCarsQuery } from "../../redux/features/productApi";
import { Button, Card } from "antd";
import "./BestSelling.css";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const { Meta } = Card;

const BestSelling = () => {
  const { data } = useGetFeaturndCarsQuery(undefined);
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "1400px", margin: "auto", padding: "3rem 1rem" }}>
      <div className="section-header">
        <div>
          <Title level={2}>Best Selling Cars</Title>
          <Paragraph style={{ color: "#666", marginBottom: 40 }}>
            Our most popular cars chosen by drivers like you.
          </Paragraph>
        </div>
      </div>
      {/* cars container */}
      <div className="card-grid">
        {data?.data?.slice(4, 8).map((product: any) => (
          <Card
            hoverable
            key={product.id}
            cover={
              <img
                alt={product.brand}
                src={product.image}
                style={{ height: 180, objectFit: "cover" }}
              />
            }
            className="car-card"
          >
            <Meta
              title={
                <div className="card-title">
                  {product.brand} {product.model}
                  <span className="price">${product.price}</span>
                </div>
              }
              description={
                <p className="card-description">{product.description}</p>
              }
            />
            <Button
              onClick={() => navigate(`/${product._id}`)}
              type="primary"
              block
              style={{ marginTop: 12, color: "black" }}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
