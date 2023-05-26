import React, { createContext, useContext } from "react";
import { UseData } from "./DataContext";
import { doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ToastHandler } from "../components/Toast/Toast";
import { UseSignupContext } from "./Signup/Signup";
import { db } from "../../firebase-config";
const WishlistDataContext = createContext();

const WishlistContext = ({ children }) => {
  const { setWishlist, wishlist, cart, setCart, cartPrice, setCartPrice } =
    UseData();
  const { currUser } = UseSignupContext();

  const WishlistHandler = async (id, type) => {
    if (currUser?.uid) {
      const tempWish = wishlist.filter((i) => i != id);
      if (type === "add") {
        if (!wishlist.includes(id)) {
          setWishlist([...wishlist, id]);
          ToastHandler("success", "Product Added to Wishlist");
        } else {
          setWishlist([...tempWish]);
          ToastHandler("success", "Product Removed From Wishlist");
        }
      } else if (type === "moveToCart" && !cart[id]) {
        setCart({ ...cart, [id]: 1 });
        setWishlist([...tempWish]);
        ToastHandler("success", "Product Moved to Cart");
      } else if (type === "delete" || (type === "moveToCart" && cart[id])) {
        setWishlist([...tempWish]);
        if (type === "moveToCart"){
          setCart({ ...cart, [id]: cart[id] + 1 });
          ToastHandler("success", "Product Moved to Cart");
        }
        else if (type === "delete")
          ToastHandler("success", "Product Removed from Wishlist");
      }
    } else {
      ToastHandler("error", "Login to add as favourite");
    }
  };

  const UpdateDBwishlist = async () => {
    if (currUser?.uid) {
      const userDataRef = doc(db, "users", currUser?.uid);
      await updateDoc(userDataRef, {
        wishlist: wishlist,
      });
    }
  };

  const elements = { WishlistHandler };
  useEffect(() => {
    UpdateDBwishlist();
  }, [wishlist]);

  return (
    <WishlistDataContext.Provider value={elements}>
      {children}
    </WishlistDataContext.Provider>
  );
};

export const UseWishlistContext = () => {
  return useContext(WishlistDataContext);
};

export default WishlistContext;
