import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import CartCard from "../Cart/CartCard";
import { ToastContainer } from "react-toastify";
import './wishlist.css'

const Wishlist = () => {
  const { data, wishlist, WishlistHandler } = UseData();
  const dispWishlist = data?.filter(({ id: i }) => wishlist.includes(i));
  return (
    <React.Fragment>
     <div className="cart">
        <Navbar />
        <h2>Wishlist ({dispWishlist.length})</h2>
        {dispWishlist.length === 0 && <h3>Your Wishlist is empty</h3>}
        <div className="wishlistProducts">
          {dispWishlist.map((item) => (
            <CartCard item={item} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Wishlist;
