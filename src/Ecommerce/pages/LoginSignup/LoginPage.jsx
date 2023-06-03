import React, { useEffect } from "react";
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const { MainLoginComponent, currUser, loading } = UseSignupContext();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (currUser?.email){
      if(location?.state?.from?.pathname) navigate(location?.state?.from?.pathname);
      else navigate('/profile')
    }
  }, [currUser]);

  return loading?<Loader />: (
    <React.Fragment>
      <div className="mainLogin">{MainLoginComponent}</div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default LoginPage;
