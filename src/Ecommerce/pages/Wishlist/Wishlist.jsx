import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import CartCard from "../Cart/CartCard";
import { ToastContainer } from "react-toastify";
import "./wishlist.css";
import WishlistCard from "./WishlistCard";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const Wishlist = () => {
  const { data, wishlist, WishlistHandler } = UseData();
  const dispWishlist = data?.filter(({ id: i }) => wishlist.includes(i));
  return (
    <React.Fragment>
      <div className="cart">
        {dispWishlist.length === 0 && (
          <div>
            <h2>Your Wishlist is empty  <FontAwesomeIcon icon={faHeartBroken} /></h2>
            <h4><NavLink to='/products'>Explore <FontAwesomeIcon icon={faCompass} /></NavLink></h4>
          </div>
        )}
        {dispWishlist.length !== 0 && (
          <div>
            <h2>Wishlist ({dispWishlist.length})</h2>
            <div className="wishlistProducts">
              {dispWishlist.map((item) => (
                <WishlistCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Wishlist;
