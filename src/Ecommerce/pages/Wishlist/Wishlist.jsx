import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";

const Wishlist = () => {
  const { data, wishlist, WishlistHandler } = UseData();
  const dispWishlist = data?.filter(({ id: i }) => wishlist.includes(i));
  return (
    <React.Fragment>
      <Navbar />
      <h1>This is wishlist</h1>
      {dispWishlist.map(({ productName, id }) => (
        <div>
          <h3>{productName}</h3>
          <button onClick={() => WishlistHandler(id, "moveToCart")}>Move to cart</button>
          <button onClick={() => WishlistHandler(id, "delete")}>Remove from wishlist</button>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Wishlist;
