import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Addresses from "../Addresses/Addresses";
import OrderHistory from "../OrderHistory/OrderHistory";
import { useNavigate } from "react-router-dom";
import { UseSignupContext } from "../../../contexts/Signup/Signup";
import { ToastContainer } from "react-toastify";

const Profile = () => {

  const navigate = useNavigate();
  const {currUser, logOut} = UseSignupContext();
  useEffect(() => {
    if(!currUser?.email) navigate('/login')
  }, [currUser]);

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <h1>My profile</h1>
        <button onClick={() => {navigate('/profile/addresses')}}>My addresses</button>
        <button onClick={() => {navigate('/profile/myorders')}}>My orders</button>
        <button onClick={() => {logOut()}}>Log out</button>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default Profile;
