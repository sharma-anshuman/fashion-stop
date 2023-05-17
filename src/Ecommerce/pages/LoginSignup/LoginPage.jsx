import React, { useEffect } from "react";
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const LoginPage = () => {
  const { MainLoginComponent, currUser } = UseSignupContext();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (currUser?.email) navigate(location?.state?.from?.pathname);
  }, [currUser]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="mainLogin">{MainLoginComponent}</div>
    </React.Fragment>
  );
};

export default LoginPage;
