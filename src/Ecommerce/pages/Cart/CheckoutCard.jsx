import React, { useEffect } from "react";
import { UseData } from "../../contexts/DataContext";
import "./checkoutCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const CheckoutCard = ({ dispCart }) => {
  const { data, cart, PlaceOrderHandler, setCartPrice } = UseData();
  const navigate = useNavigate();
  const sum = dispCart.reduce(
    (acc, { id, priceAfterDiscount: p }) => acc + cart[id] * p,
    0
  );
  useEffect(() => {
    setCartPrice(sum);
  }, []);
  const loc = useLocation().pathname.slice(1);
  return (
    <div className="checkout">
      <h2 className="checkout-head">TOTAL PRICE</h2>
      <hr />
      <div>
        {dispCart.map(({ priceAfterDiscount, productName, id }) => (
          <div className="checkout-price" key={id}>
            <p className="priceCheckout">
              {productName} ({cart[id]})
            </p>
            <p className="priceCheckout">
              &#8377;{cart[id] * priceAfterDiscount}
            </p>
          </div>
        ))}
        {loc === "checkout" && (
          <div>
            <div className="checkout-price">
              <p className="priceCheckout">Discount</p>
              <p className="priceCheckout">–&#8377;100</p>
            </div>
            <div className="checkout-price">
              <p className="priceCheckout">Delivery charges</p>
              <p className="priceCheckout">&#8377;100</p>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="totalPriceMain">
        <p className="totalPriceCheckout">Total Price: </p>
        <p className="totalPriceCheckout">&#8377;{sum}</p>
      </div>
      <div>
        <button
          onClick={
            () => (loc == "cart" ? navigate("/checkout") : PlaceOrderHandler()) //navigate("/order-description")
          }
          className="checkout-btn"
        >
          {loc === "cart" ? "CHECKOUT" : "PLACE ORDER"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutCard;
