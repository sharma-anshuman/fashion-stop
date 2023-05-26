import React, { createContext, useContext } from "react";
import { UseSignupContext } from "./Signup/Signup";
import { UseData } from "./DataContext";
import { ToastHandler } from "../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase-config";

const MainPaymetContext = createContext();

const PaymentGatewayContext = ({children}) => {
  const { currUser } = UseSignupContext();
  const {
    cart,
    firstName,
    lastName,
    setCurrOrder,
    setCart,
    setCurrAddress,
    currAddress,
    cartPrice,
  } = UseData();
  const navigate = useNavigate();

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const MakePayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      // Notify("Razorpay SDK failed to load, check you connection", "error");
      ToastHandler(
        "error",
        "Razorpay SDK failed to load, check you connection"
      );

      return;
    }

    const options = {
      key: "rzp_test_I2lkgLwhU0MCkf",
      amount: cartPrice * 100,
      currency: "INR",
      name: "FashionStop",
      description: "Thank you for shopping with us",
      image:
        "https://scontent.fjai1-4.fna.fbcdn.net/v/t1.6435-9/82809907_105048804358678_8872247319261609984_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=uN4yn-sV0jcAX8eqLXx&_nc_ht=scontent.fjai1-4.fna&oh=00_AfAKm0Ccg3kKqyprMZA7ELstnA7PTlcZT2aYe0pLL-8zAw&oe=64929DE0",
      handler: async function (response) {
        const today = new Date();
        const currDate =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear();
        const currTime =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const currentOrder = {
          products: { ...cart },
          address: currAddress,
          amount: cartPrice,
          date: currDate,
          time: currTime,
          paymentId: response.razorpay_payment_id,
        };
        const userDataRef = doc(db, "users", currUser?.uid);
        await updateDoc(userDataRef, {
          orderHistory: arrayUnion(currentOrder),
        });
        setCurrOrder({ ...currentOrder });
        setCart({});
        setCurrAddress("");
        ToastHandler("success", "Payment succesfull");
        navigate("/order-description");
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: currUser.email,
        contact: "9876543210",
      },
      theme: {
        color: "#19A7CE",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const elements = {MakePayment};

  return <MainPaymetContext.Provider value={elements}>{children}</MainPaymetContext.Provider>
};

export const UsePayments = () => {
    return useContext(MainPaymetContext)
}

export default PaymentGatewayContext;
