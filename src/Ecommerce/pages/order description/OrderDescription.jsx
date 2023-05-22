import React from "react";
import "./orderdescription.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import SummaryIcon from "../../assets/icons/SummaryIcon";

const OrderDescription = () => {
  const {currOrder, firstName, addresses} = UseData();
  const navigate = useNavigate();
  if(!currOrder?.time?.length) navigate('cart');
  const {date, time, paymentId, amount, address: addId, products} = currOrder;

  const addressObj = addresses.find(({id}) => id === addId);
  const {city, state} = addressObj;

  return (
    <React.Fragment>
      <div>
        <Navbar />
        <div className="iconDiv">
          <SummaryIcon />
        </div>
        <div className="summary-greetings">
          <h2>Your Order Confirmed!!</h2>
          <p>Hi, {firstName}</p>
          <p>Your order has been confirmed and will be shipping soon.</p>
        </div>
        <hr/>
        <div className="summary-basicDetails">
          <div>
            <h3>Order Date</h3>
            <p>{date}</p>
          </div>
          <div>
            <h3>Order Time</h3>
            <p>{time}</p>
          </div>
          <div>
            <h3>Payment Id</h3>
            <p>{paymentId}</p>
          </div>
          <div>
            <h3>Address</h3>
            <p>{city}, {state}</p>
          </div>
        </div>

        <hr />

      </div>
    </React.Fragment>
  );
};

export default OrderDescription;
