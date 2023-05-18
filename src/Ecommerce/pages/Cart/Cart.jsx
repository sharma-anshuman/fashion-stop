import React from "react";
import "./cart.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";

const Cart = () => {
  const {data, userData} = UseData();
  const cart = data?.filter(({id: i}) => userData?.cart?.includes(i));

  return (<React.Fragment>
    <Navbar />
    <h1>This is cart</h1>
    {
      cart?.map(({productName}) => <li>{productName}</li>)
    }
  </React.Fragment>)
};

export default Cart;
