import React, { useEffect } from "react";
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const SignupPage = () => {
  const { MainSignupComponent, currUser } = UseSignupContext();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  useEffect(() => {
    if (currUser?.email) navigate("/products");
  }, [currUser]);

  return (
    <React.Fragment>
      <div className="mainSignup">{MainSignupComponent}</div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default SignupPage;
