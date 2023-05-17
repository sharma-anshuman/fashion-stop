import React, { useContext, createContext, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";

//
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import { addDoc, collection, getDoc } from "@firebase/firestore";
import { doc, setDoc } from "@firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const SignupContext = createContext();

const SignUpContext = ({ children }) => {
  const [currUser, setCurr] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setCurr(currentUser);
  });

  const logIn = async (values) => {
    try {
      const CurrUser = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      
    } catch (e) {
      console.error(e.message);
    }
  };

  const register = async (values) => {
    try {
      const CurrUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const temp = await setDoc(doc(db, "users", CurrUser?.user?.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        cart: [],
        wishlist: [],
        addresses: [],
        orderHistory: [],
      });

      
      
    } catch (e) {
      console.error(e.message);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  console.log("It's the signup context", auth?.currentUser);

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const MainSignupComponent = (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        register(values);
      }}
    >
      {(formik) => (
        <div>
          <h1>Signup</h1>
          <Form>
            <TextField lebel="First Name" name="firstName" type="text" />
            <TextField lebel="Last Name" name="lastName" type="text" />
            <TextField lebel="Email" name="email" type="email" />
            <TextField lebel="Password" name="password" type="password" />
            <TextField
              lebel="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  );

  const MainLoginComponent = (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        console.log("here is login");
        logIn(values);
      }}
    >
      {(formik) => (
        <div>
          <h1>Login</h1>
          <Form>
            <TextField lebel="Email" name="email" type="email" />
            <TextField lebel="Password" name="password" type="password" />
            <button type="submit">Login</button>
          </Form>
        </div>
      )}
    </Formik>
  );

  const elements = {
    MainSignupComponent,
    MainLoginComponent,
    currUser,
    logOut,
  };

  return (
    <SignupContext.Provider value={elements}>{children}</SignupContext.Provider>
  );
};

export const UseSignupContext = () => {
  return useContext(SignupContext);
};

export default SignUpContext;
