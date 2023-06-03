import React, { useEffect, useState } from "react";
import "./cart.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import ProductCard from "../Products/ProductCard";
import CartCard from "./CartCard";
import CheckoutCard from "./CheckoutCard";
import { ToastContainer } from "react-toastify";
import { UseCartContext } from "../../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faCompass, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { data, cart } = UseData();
  const { CartHandler } = UseCartContext();
  const dispCart = data?.filter(({ id: i }) => cart[i]);

  return (
    <React.Fragment>
      <div className="cart">
        {dispCart.length === 0 && (
          <div>
            <h2>Your <FontAwesomeIcon icon={faShoppingCart} /> is empty :(</h2>
            <h4>
              <NavLink to="/products">
                Explore <FontAwesomeIcon icon={faCompass} />
              </NavLink>
            </h4>
          </div>
        )}
        {dispCart.length > 0 && (
          <div>
            <h2>Cart ({dispCart.length})</h2>

            <div className="cart-main">
              <div className="cartProducts">
                {dispCart.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    quantity={cart[item.id]}
                  />
                ))}
              </div>
              <div className="checkoutCard">
                <CheckoutCard dispCart={dispCart} />
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Cart;
