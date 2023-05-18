import React, { useEffect, useState } from "react";
import "./cart.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";

const Cart = () => {
  const { data, cart } = UseData();
  const dispCart = data?.filter(({ id: i }) => cart.includes(i));

  return (
    <React.Fragment>
      <Navbar />
      <h1>This is cart</h1>
      {dispCart.length !== 0 &&
        dispCart?.map(({ productName }) => <li>{productName}</li>)}
    </React.Fragment>
  );
};

export default Cart;
