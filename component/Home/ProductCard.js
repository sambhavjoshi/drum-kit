import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./Home.css";

const ProductCard = ({ product }) => {
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.25,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <div className="discount">
        <span className="discountSpan">
          <b>{`${product.discount}%`}</b>
        </span>
        <span>off</span>
      </div>
      <p className="name">{product.name}</p>
      <p className="description">{product.description}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {`(${product.numOfReviews} reviews)`}
        </span>
      </div>
      <span className="originalPrice">{`$${product.price}`}</span>
      <span className="discountedPriceSpan">{`$${Math.round(
        (1 - product.discount / 100) * product.price
      )}`}</span>
    </Link>
  );
};
export default ProductCard;
