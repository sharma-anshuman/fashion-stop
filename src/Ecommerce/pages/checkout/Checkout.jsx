import React from "react";
import Address from "../../components/Address/Address";
import CheckoutCard from "../Cart/CheckoutCard";
import './checkout.css'
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";

const Checkout = () => {
  const { data, cart } = UseData();
  const dispCart = data?.filter(({ id: i }) => cart[i]);
  return (
    <div>
      <Navbar />
    <div className="mainCheckout">
      
      <Address />
      <CheckoutCard dispCart={dispCart} />
    </div>
    </div>
  );
};

export default Checkout;
