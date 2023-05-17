import React, { useEffect } from "react";
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { MainLoginComponent, currUser } = UseSignupContext();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
      if(currUser?.email) navigate(location?.state?.from?.pathname);
    }, [currUser]);
  
  return (
    <React.Fragment>
      <div>{MainLoginComponent}</div>
      <NavLink to="/signup">Don't have an account</NavLink>
    </React.Fragment>
  );
};

export default LoginPage;
