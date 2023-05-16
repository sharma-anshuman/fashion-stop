import React from 'react'
import { UseSignupContext } from '../../contexts/Signup/Signup'

const SignupPage = () => {
  const {MainFormComponent, credentials} = UseSignupContext();
  console.log(credentials)
  return (
    <React.Fragment>
      {MainFormComponent}
    </React.Fragment>
  )
}

export default SignupPage