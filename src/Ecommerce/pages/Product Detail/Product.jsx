import React from "react";
import "./product.css";
import { useNavigate, useParams } from "react-router-dom";
import { UseData } from "../../contexts/DataContext";
import ProductCard from "../Products/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartFlatbed, faCartFlatbedSuitcase, faCartPlus, faCartShopping, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import { UseCartContext } from "../../contexts/CartContext";
import { UseWishlistContext } from "../../contexts/WishlistContext";
import { ToastContainer } from "react-toastify";

const Product = () => {
  const { ID } = useParams();
  const { data, cart, wishlist } = UseData();
  const {CartHandler} = UseCartContext();
  const {WishlistHandler} = UseWishlistContext();
  const product = data.find(({ id }) => id == ID);
  const navigate = useNavigate();
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
  } = product;

  return (
    <div>
      {/* <Navbar /> */}
      <div className="singleProduct">
        <div className="singleProduct-left">
          <img src={imageLink} alt="" />
          {isTrending && (
            <p className="onPicAttributes singleProduct-trending">Trending</p>
          )}
          <div
            onClick={() => WishlistHandler(id, "add")}
            className={`onPicAttributes singleProduct-like ${
              wishlist.includes(id) ? "alreadyLiked" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="onPicAttributes singleProduct-rating">
            {rating} <FontAwesomeIcon className="starIcon" icon={faStar} />
          </div>
          <p className="onPicAttributes singleProduct-size">{size}</p>
        </div>

        <div className="singleProduct-right">
          <div className="singleProduct-rightTop">
            <h2 className="singleProduct-name">{productName}</h2>
            <h3 className="singleProduct-reviews">{reviewCount} reviews</h3>
            <div className="singleProduct-priceNoff">
              <h2>
                &#8377;{priceAfterDiscount} <span>&#8377;{price}</span>
              </h2>
              <p>{discount}% OFF</p>
            </div>
            <hr />
          </div>

          <div className="singleProduct-rightBottom">
            <p>
              <strong>Availability: </strong>
              {outOfStock ? "Out Of Stock" : "In Stock"}
            </p>
            <p>
              <strong>Description: </strong>Made with finest fabric in the world
              and woven with love
            </p>
            <p>
              <strong>Size: </strong>
              {size}
            </p>
            <p>
              <strong>Category: </strong>
              {category.toUpperCase()}
            </p>
            <p>
              <strong>Delivery: </strong>in {deliveryTime} days
            </p>
          </div>
          <button
            className="singleProduct-btn"
            onClick={() =>
              cart[id] ? navigate("/cart") : CartHandler(id, "add")
            }
          >
            {cart[id] ? "Go to cart " : "Add to cart "}
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
