import React, { useEffect, useState } from "react";
import "./cart.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import ProductCard from "../Products/ProductCard";
import CartCard from "./CartCard";

const Cart = () => {
  const { data, cart, CartHandler } = UseData();
  const dispCart = data?.filter(({ id: i }) => cart[i]);

  return (
    <React.Fragment>
      <div className="cart">
        <Navbar />
        <h2>Cart ({dispCart.length})</h2>
        {dispCart.length === 0 && <h3>Your cart is empty</h3>}
        <div className="cartProducts">
          {dispCart.map((item) => (
            <CartCard item={item} quantity={cart[item.id]} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;

// {dispCart.length !== 0 &&
//   dispCart?.map(({ productName, id }) => (
//     <div>
//       <h3>{productName}</h3>
//       <p>
//         <strong>Quantity: </strong>
//         {cart[id]}
//       </p>
//       <button onClick={() => CartHandler(id, "add")}>+</button>
//       <button onClick={() => CartHandler(id, "remove")}>-</button>
//       <button onClick={() => CartHandler(id, "delete")}>
//         Remove from cart
//       </button>
//       <button onClick={() => CartHandler(id, "moveToWish")}>
//         Move to wishlist
//       </button>
//     </div>
//   ))}
