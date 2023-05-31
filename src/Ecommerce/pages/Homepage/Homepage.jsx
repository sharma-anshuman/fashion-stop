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

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CategoryCard from "./CategoryCard";

const Homepage = () => {
  const { data } = UseData();
  const { currUser } = UseSignupContext();

  const thumbHandler = () => {};

  return !data.length ? (
    <Loader />
  ) : (
    <React.Fragment>
      <img
        className="banner-img"
        src="https://sslimages.shoppersstop.com/sys-master/root/h21/he0/30076670672926/Celio-web---mix-brands-2023-05-25--mens-fest.jpg"
      />

      <div className="homepage-mid">
        <h1>We've got it all covered for you!!</h1>

        <Carousel
          className="carousel-comp"
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          renderThumbs={thumbHandler}
        >
          <div>
            <img src="https://images.unsplash.com/photo-1610695997208-2b6479928d06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" />
          </div>
          <div>
            <img src="https://plus.unsplash.com/premium_photo-1661627681947-4431c8c97659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1523304108042-8ac30850c748?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
          </div>
        </Carousel>
      </div>
      <h1 className="categories-heading">Shop by Categories</h1>
      <div className="home-categories">
        <CategoryCard
          gender="men"
          imgUrl="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8841173/2019/3/19/e73991be-bd0c-4dd3-8390-bb9c460d02311552986669941-Roadster-Men-Tshirts-2621552986668325-1.jpg"
        />
        <CategoryCard
          gender="women"
          imgUrl="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/13165398/2021/1/13/11e7f133-07d4-4270-87aa-234e81f5ac081610520922642-HERENOW-Women-Kurta-Sets-7761610520920712-6.jpg"
        />
        <CategoryCard
          gender="kids"
          imgUrl="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/21388840/2023/5/30/f7604b31-5045-4994-9c1e-4b13a0fcf3301685442174971-HERENOW-Boys-Checked-Pure-Cotton-Casual-Shirt-35716854421745-1.jpg"
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Homepage;
