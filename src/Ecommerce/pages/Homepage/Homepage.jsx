import React from "react";
import "./homepage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { UseData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { data } = UseData();
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/products");
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
