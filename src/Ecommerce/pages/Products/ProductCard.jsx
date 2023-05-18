import React from "react";
import "./productcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {db} from '../../../firebase-config';
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { UseData } from "../../contexts/DataContext";

const ProductCard = ({ item }) => {
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
  const {currUser} = UseSignupContext(); 
  const currId = currUser?.uid;
  const {CartHandler} = UseData();
  const navigate = useNavigate();
  return (
    <React.Fragment key={id}>
      <div className="productCard">
        <div className="product-top">
          <img
            onClick={() => {
              navigate(`/product/${id}`);
            }}
            className="ootd"
            src={imageLink}
          />
          <div className="heart">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="size">
            <p>{size}</p>
          </div>
          <div className="ratenreview">
            <label>
              <FontAwesomeIcon icon={faStar} />
              {rating}
            </label>{" "}
            | {reviewCount}
          </div>
          {isTrending === true && <p className="trending">Trending</p>}
        </div>

        <div className="product-mid">
          <div>
            <p>{productName}</p>
          </div>
          <div className="price-discount">
            <p>
              &#8377;{priceAfterDiscount} <span>&#8377;{price}</span>
            </p>
            <p>{discount}% Off</p>
          </div>
        </div>

        <div className="product-bottom">
          <button onClick={() => CartHandler(id, "add")}>
            <FontAwesomeIcon icon={faCartShopping} /> Add to cart{" "}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
