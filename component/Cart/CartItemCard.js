import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  console.log(
    Math.round((1 - item.discount / 100) * item.price) * item.quantity,
    item
  );
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="product image" />
      <div className="itemProps">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`price: $${item.price}`}</span>
        <span>{`discounted price: $${Math.round(
          (1 - item.discount / 100) * item.price
        )}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
