import React from "react";
import "./orderdescription.css";
import Navbar from "../../components/Navbar/Navbar";
import { UseData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import SummaryIcon from "../../assets/icons/SummaryIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink } from "@fortawesome/free-regular-svg-icons";
import Footer from "../../components/Footer/Footer";

const OrderDescription = () => {
  const { currOrder, firstName, addresses, data } = UseData();
  const navigate = useNavigate();
  if (!currOrder?.time?.length) navigate("cart");
  const {
    date,
    time,
    paymentId,
    amount,
    address: addId,
    products: prod,
  } = currOrder;
  const products = data.filter(({ id }) => prod[id]);
  const addressObj = addresses.find(({ id }) => id === addId);
  const { city, state } = addressObj;

  return (
    <React.Fragment>
      <div>
        {/* <Navbar /> */}
        <div className="main-summary">
          <div className="iconDiv">
            <img src="https://static.vecteezy.com/system/resources/previews/015/285/052/non_2x/rural-nature-landscape-bird-flying-silhouette-over-hills-and-sky-background-animal-wildlife-mountain-skyline-resort-view-background-vector.jpg" />
            {/* <SummaryIcon /> */}
          </div>
          <div className="summary-greetings">
            <h2>Your Order Confirmed!!</h2>
            <p>Hi, {firstName}</p>
            <p>Your order has been confirmed and will be shipping soon.</p>
          </div>

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
              <p>
                {city}, {state}
              </p>
            </div>
          </div>

          <div className="summary-products">
            {products.map((product) => (
              <div className="summary-product">
                <div className="summary-product-left">
                  <img src={product.imageLink} alt="image" />
                  <div className="summary-product-name">
                    <h3>{product.productName}</h3>
                    <p>{product.category.toUpperCase()}</p>
                  </div>
                </div>
                <div className="summary-product-right">
                  <p>Qty {prod[product.id]}</p>
                  <p>&#8377;{product.priceAfterDiscount}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="billing-details">
            <div>
              <p>Subtotal</p>
              <p>&#8377;{amount}</p>
            </div>
            <div>
              <p>Delivery</p>
              <p>&#8377;300</p>
            </div>
            <div>
              <p>Coupon (FLAT300)</p>
              <p style={{ color: "#14b8a6" }}>– &#8377;300</p>
            </div>
          </div>
          <div className="billing-details">
            <div>
              <p>Total</p>
              <p>&#8377;{amount}</p>
            </div>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="thank-para">
              <p>
                We'll send you shipping confirmation on your mail, when your
                item(s) are on the way! We appreciate your purchase, and hope
                you'll keep updating your fashion with FashionStop{" "}
                <FontAwesomeIcon icon={faSmileWink} />
              </p>
            </div>
            <div className="last-greet">
              <p className="thank">Thanks!</p>
              <p>FashionStop Businesses</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default OrderDescription;
