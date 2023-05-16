import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Addresses from "../Addresses/Addresses";
import OrderHistory from "../OrderHistory/OrderHistory";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <h1>My profile</h1>
        <button onClick={() => {navigate('/profile/addresses')}}>My addresses</button>
        <button>My orders</button>
      </div>
    </React.Fragment>
  );
};

export default Profile;
