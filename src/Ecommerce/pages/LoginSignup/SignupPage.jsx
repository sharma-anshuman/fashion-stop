import React, { useEffect } from "react";
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const SignupPage = () => {
  const { MainSignupComponent, currUser } = UseSignupContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (currUser?.email) navigate("/products");
  }, [currUser]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="mainSignup">{MainSignupComponent}</div>
    </React.Fragment>
  );
};

export default SignupPage;
