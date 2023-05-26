import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Addresses from "../Addresses/Addresses";
import OrderHistory from "../OrderHistory/OrderHistory";
import { useNavigate } from "react-router-dom";
import { UseSignupContext } from "../../../contexts/Signup/Signup";
import { ToastContainer } from "react-toastify";
import "./profile.css";
import { UseData } from "../../../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "../../../components/Footer/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const { currUser, logOut } = UseSignupContext();
  const { firstName, lastName } = UseData();
  
  return (
    <React.Fragment>
      <div className="profile-main">
      <Navbar />
      <div className="container">
        <div className="cover-photo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/607/791/non_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
            className="profile"
          />
        </div>
        <div className="profile-name">{firstName + " " + lastName}</div>
        <p className="about">Welcome to FashionStop!!</p>
        <button
          onClick={() => {
            logOut();
          }}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Profile;

// <div>
//   <h1>My profile</h1>
//   <button
//     onClick={() => {
//       navigate("/profile/addresses");
//     }}
//   >
//     My addresses
//   </button>
//   <button
//     onClick={() => {
//       navigate("/profile/myorders");
//     }}
//   >
//     My orders
//   </button>
//   <button
//     onClick={() => {
//       logOut();
//     }}
//   >
//     Log out
//   </button>
//   <ToastContainer />
// </div>;
