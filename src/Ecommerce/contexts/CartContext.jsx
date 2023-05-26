import React, { createContext, useContext } from 'react'
import { UseData } from './DataContext';
import { doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ToastHandler } from '../components/Toast/Toast';
import { UseSignupContext } from './Signup/Signup';
import { db } from '../../firebase-config'; 
const CartDataContext = createContext();

const CartContext = ({children}) => {
  const {setWishlist, wishlist, cart, setCart, cartPrice, setCartPrice} = UseData();
  const {currUser} = UseSignupContext();

  const CartHandler = async (id, type) => {
    if (currUser?.uid) {
      if (type === "add" && !cart[id]) {
        setCart({ ...cart, [id]: 1 });
        ToastHandler("success", "Product Added to Cart");
      } else if (type === "add" && cart[id]) {
        setCart({ ...cart, [id]: cart[id] + 1 });
      } else if (
        (type === "remove" && cart[id] === 1) ||
        type === "delete" ||
        type === "moveToWish"
      ) {
        const tempCart = Object.keys(cart)
          .filter((key) => key != id)
          .reduce((acc, key) => {
            acc[key] = cart[key];
            return acc;
          }, {});
        setCart({ ...tempCart });
        if (type !== "moveToWish")
          ToastHandler("success", "Product Removed from Cart");
        if (type === "moveToWish") {
          if (!wishlist.includes(id)) {
            setWishlist([...wishlist, id]);
          }
          ToastHandler("success", "Product Moved to Wishlist");
        }
      } else if (type === "remove" && cart[id] > 1) {
        setCart({ ...cart, [id]: cart[id] - 1 });
      }
    } else {
      ToastHandler("error", "Login to add to Cart");
    }
  };

  const UpdateDBcart = async () => {
    if (currUser?.uid) {
      const userDataRef = doc(db, "users", currUser?.uid);
      await updateDoc(userDataRef, {
        cart: cart,
      });
    }
  };

  useEffect(() => {
    UpdateDBcart();
  }, [cart]);

  const elements = {CartHandler};

  return (
    <CartDataContext.Provider value={elements}>{children}</CartDataContext.Provider>
  )
}

export const UseCartContext = () => {
  return useContext(CartDataContext);
}

export default CartContext;