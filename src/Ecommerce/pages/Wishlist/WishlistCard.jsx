import React from "react";
import "./wishlistcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as love } from "@fortawesome/free-solid-svg-icons";
import { UseData } from "../../contexts/DataContext";
import { useLocation } from "react-router-dom";
import { UseCartContext } from "../../contexts/CartContext";
import { UseWishlistContext } from "../../contexts/WishlistContext";

const WishlistCard = ({ item, quantity }) => {
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
  const { cart, wishlist } = UseData();
  const { CartHandler } = UseCartContext();
  const { WishlistHandler } = UseWishlistContext();
  const inCart = cart[id] >= 0,
    inWish = wishlist.includes(id);

  return (
    <div className="wishlistCard">
      <div className="wishlistCard-left">
        <img className="wishlistCard-img" src={imageLink} />
      </div>
      <div className="wishlistCard-right">
        <div className="cartRight-head">
          <h2 className="wishlistCard-heading">{productName}</h2>
        </div>
        <h3 className="wishlistCard-price">
          &#8377;{priceAfterDiscount}{" "}
          <span className="discount-span">&#8377;{price}</span>
        </h3>
        <h3 className="wishlistCard-discount">{discount}% OFF</h3>
        <div className="wishlistCard-bottom">
          <button onClick={() => WishlistHandler(id, "delete")}>Remove</button>
          <button onClick={() => WishlistHandler(id, "moveToCart")}>
            Move To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
