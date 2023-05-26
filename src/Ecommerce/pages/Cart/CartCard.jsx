import React from "react";
import "./cartcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as love } from "@fortawesome/free-solid-svg-icons";
import { UseData } from "../../contexts/DataContext";
import { useLocation } from "react-router-dom";
import { UseCartContext } from "../../contexts/CartContext";

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
  const { cart, wishlist, WishlistHandler } = UseData();
  const {CartHandler} = UseCartContext();
  const inCart = cart[id] >= 0,
    inWish = wishlist.includes(id),
    loc = useLocation().pathname.slice(1);
  console.log("Location of CartCard.jsx: ", loc);

  return (
    <div className="cartCard">
      <div className="cartCard-left">
        <img className="cartCard-img" src={imageLink} />
      </div>
      <div className="cartCard-right">
        <div className="cartRight-head">
          <h2 className="cartCard-heading">{productName}</h2>
          <div onClick={() => WishlistHandler(id, "add")}>
            {!inWish && <FontAwesomeIcon className="wishit" icon={faHeart} />}
            {inWish && <FontAwesomeIcon className="wishit-red" icon={love} />}
          </div>
        </div>
        <h3 className="cartCard-price">
          &#8377;{priceAfterDiscount}{" "}
          <span className="discount-span">&#8377;{price}</span>
        </h3>
        <h3 className="cartCard-discount">{discount}% OFF</h3>
        {loc === "cart" && (
          <div className="cartCard-qty">
            Quantity:
            <button
              onClick={() => CartHandler(id, "remove")}
              className="qty-btn"
            >
              –
            </button>
            <div className="qty">{cart[id]}</div>
            <button onClick={() => CartHandler(id, "add")} className="qty-btn">
              +
            </button>
          </div>
        )}
        <div className="cartCard-bottom">
          {loc === "cart" && (
            <button onClick={() => CartHandler(id, "delete")}>Remove</button>
          )}
          {loc === "wishlist" && (
            <button onClick={() => WishlistHandler(id, "delete")}>
              Remove
            </button>
          )}
          {loc === "cart" && (
            <button
              id={inWish ? "inTheWishlist" : "none"}
              onClick={() => (inWish ? "" : CartHandler(id, "moveToWish"))}
            >
              {inWish ? "In The Wishlist" : "Move To Wishlist"}
            </button>
          )}
          {loc === "wishlist" && (
            <button onClick={() => WishlistHandler(id, "moveToCart")}>
              Move To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
