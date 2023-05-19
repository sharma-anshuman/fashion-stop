import React from "react";
import './cartcard.css'

const CartCard = ({ item, quantity }) => {
  const {
    id,
    productName,
    category,
    size,
    imageLink,
    rating,
    price,
    discount,
    priceAfterDiscount,
    isTrending,
    outOfStock,
    reviewCount,
    deliveryTime,
  } = item;

  return (<div className="cartCard">
    <div className="cartCard-left">
        <img className="cartCard-img" src={imageLink} />
    </div>
    <div className="cartCard-right">
        <h2 className="cartCard-heading">{productName}</h2>
    <h3>&#8377;{price} <span>&#8377;{priceAfterDiscount}</span></h3>
    <h3 className="cartCard-discount">{discount}% OFF</h3>
    <div className="cartCard-qty">
        Quantity:
        <button className="qty-btn">+</button>
        <div className="qty">{1}</div>
        <button className="qty-btn">-</button>
    </div>
    <div className="cartCard-bottom">
        <button>Remove</button>
        <button>Move to Wishlist</button>
    </div>
    </div>
  </div>)
};

export default CartCard;
