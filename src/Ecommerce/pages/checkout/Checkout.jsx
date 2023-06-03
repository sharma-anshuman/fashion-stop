import React from "react";
import Address from "../../components/Address/Address";
import CheckoutCard from "../Cart/CheckoutCard";
import "./checkout.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const Checkout = () => {
  const { data, cart, userData, firstName } = UseData();
  const navigate = useNavigate();
  const dispCart = data?.filter(({ id: i }) => cart[i]);
  if(!firstName.length || !Object.keys(cart).length) navigate("/cart");
  return (
    <div>
      <div className="mainCheckout">
        <Address />
        <CheckoutCard dispCart={dispCart} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
