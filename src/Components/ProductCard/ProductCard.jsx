import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/useCart";
export const ProductCard = ({ id, title, price, imagePath }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart({ id, title, price, thumbnail: imagePath });
  };

  return (
    <>
      <div
        className="col-12 col-md-6 col-lg-4 mb-3"
        onClick={() => navigate(`/product/${id}`)}
      >
        <div
          className="product-card card shadow rounded-4 h-100"
          style={{ overflow: "hidden" }}
        >
          <img
            src={imagePath}
            className="card-img-top card-img-top object-fit-cover"
            alt=""
            style={{ height: "250px" }}
          />
          <div className="card-body">
            <p className="card-title mb-0 mt-2">{title}</p>
            <p className="card-text fw-bold">${price}</p>
            <button
              className="btn w-100 p-1 fw-bold rounded-pill"
              onClick={handleAddToCart}
              style={{
                fontSize: "14px",
                backgroundColor: "var(--primary-color)",
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
