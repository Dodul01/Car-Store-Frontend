import { Button } from "antd";
import "./FeaturedProducts.css";
import { useGetFeaturndCarsQuery } from "../../redux/features/productApi";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const { data } = useGetFeaturndCarsQuery(undefined);
  const navigate = useNavigate();

  return (
    <div className="vehicle-carousel-container">
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 className="title">Featured Products</h1>
            <p className="subtitle">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div>
            <Button>View All</Button>
          </div>
        </div>

        <div className="featured-products-container">
          {data?.data?.slice(0, 6).map((product) => (
            <div className="card" key={product.id}>
              <h2>
                {product.brand} {product.model}
              </h2>
              <p>
                ${product.price} <span></span>
              </p>
              <img src={product.image} alt={product.name} />
              <div
                onClick={() => navigate(`/${product._id}`)}
                className="arrow"
              >
                &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
