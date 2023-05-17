import React, { useEffect } from 'react'
import { UseSignupContext } from '../../contexts/Signup/Signup'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { MainSignupComponent, currUser} = UseSignupContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(currUser?.email) navigate('/products')
  }, [currUser]);
  

  return (
    <React.Fragment>
      {MainSignupComponent}
      <NavLink to='/login'>Already have an account</NavLink>
    </React.Fragment>
  )
}

export default SignupPage