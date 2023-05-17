import React, { useEffect } from "react";
import "./homepage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { UseData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { UseSignupContext } from "../../contexts/Signup/Signup";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const Homepage = () => {
  const { data } = UseData();
  const { currUser } = UseSignupContext();
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/products");
  };
  
  const getDataa = async () => {
    console.log(typeof(currUser?.uid))
    const docRef = doc(db, "users", currUser?.uid );
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  
  
  return !data.length ? (
    <Loader />
  ) : (
    <React.Fragment>
      <Navbar />
      <img
        onClick={clickHandler}
        className="banner-img"
        src="https://img.freepik.com/premium-vector/summer-fashion-sale-banner-design-template_2239-1174.jpg?w=2000"
      />
      <Footer />
    </React.Fragment>
  );
};

export default Homepage;
