import React, { useEffect, useState } from "react";
import "./cart.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import ProductCard from "../Products/ProductCard";
import CartCard from "./CartCard";
import CheckoutCard from "./CheckoutCard";
import { ToastContainer } from "react-toastify";
import { UseCartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { data, cart } = UseData();
  const {CartHandler} = UseCartContext();
  const dispCart = data?.filter(({ id: i }) => cart[i]);

  return (
    <React.Fragment>
      <div className="cart">
        <Navbar />
        <h2>Cart ({dispCart.length})</h2>
        {dispCart.length === 0 && <h3>Your cart is empty</h3>}
        {dispCart.length > 0 && (
          <div className="cart-main">
            <div className="cartProducts">
              {dispCart.map((item) => (
                <CartCard item={item} quantity={cart[item.id]} />
              ))}
            </div>
            <div className="checkoutCard">
              <CheckoutCard dispCart={dispCart}/>
            </div>
            
          </div>
        )}
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Cart;
