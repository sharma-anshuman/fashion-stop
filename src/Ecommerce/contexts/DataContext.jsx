import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { UseSignupContext } from "./Signup/Signup";
import { useNavigate } from "react-router-dom";
import { ToastHandler } from "../components/Toast/Toast";

const MainData = createContext();

const DataContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [currOrder, setCurrOrder] = useState({});
  const [currAddress, setCurrAddress] = useState("");
  const [cartPrice, setCartPrice] = useState(0);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const { currUser } = UseSignupContext();

  useEffect(() => {
    if (!currUser?.uid) {
      setUserData(null);
      setFirstname("");
      setLastname("");
      setCurrOrder({});
      setCurrAddress("");
      setCartPrice(0);
      setCart({});
      setWishlist([]);
      setAddresses([]);
    }
  }, [currUser]);

  const userCollectionRef = collection(db, "clothingData");
  const getData = async () => {
    const data = await getDocs(userCollectionRef);
    const arr = data.docs.map((doc, idx) => {
      return { ...doc.data(), id: doc.id };
    });
    setData([...arr]);
  };

  useEffect(() => {
    getData();
  }, []);

  const getUserDetails = async () => {
    if (currUser?.uid !== undefined) {
      const docSnap = await getDoc(doc(db, "users", currUser?.uid));

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setFirstname(docSnap.data().firstName);
        setLastname(docSnap.data().lastName);
        setCart({ ...docSnap.data().cart });
        setWishlist([...docSnap.data().wishlist]);
        setAddresses([...docSnap.data().addresses]);
      } else {
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [currUser]);

  useEffect(() => {
    const temp = async () => {
      if (currUser?.uid) {
        const userDataRef = doc(db, "users", currUser?.uid);
        await updateDoc(userDataRef, {
          addresses: addresses,
        });
      }
    };
    temp();
  }, [addresses]);

  const navigate = useNavigate();

  const PlaceOrderHandler = (MakePayment) => {
    if (addresses?.length === 0)
      ToastHandler("error", "Add an address to continue");
    else if (currAddress?.length === 0)
      ToastHandler("error", "Select an address");
    if (currAddress?.length > 0 && Object.keys(cart)?.length > 0) {
      MakePayment();
    }
  };

  const elements = {
    data,
    userData,
    firstName,
    cart,
    setCart,
    setWishlist,
    wishlist,
    addresses,
    setCurrAddress,
    setCurrOrder,
    currAddress,
    setAddresses,
    PlaceOrderHandler,
    setCartPrice,
    cartPrice,
    currOrder,
    lastName,
  };
  return <MainData.Provider value={elements}>{children}</MainData.Provider>;
};

export const UseData = () => {
  return useContext(MainData);
};

export default DataContext;
