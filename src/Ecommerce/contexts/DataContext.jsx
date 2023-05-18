import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  setDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { UseSignupContext } from "./Signup/Signup";

const MainData = createContext();

const DataContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstname] = useState("");
  const [cart, setCart] = useState([]);
  const { currUser } = UseSignupContext();

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
      console.log("docSnap", docSnap);
      if (docSnap.exists()) {
        console.log("Document data is here:", docSnap.data());
        setUserData(docSnap.data());
        setFirstname(docSnap.data().firstName);
        setCart([...docSnap.data().cart]);
      } else {
        console.log("No such document!");
      }
    } else {  
      setUserData(null);
      console.log("it's in else");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [currUser]);

  const CartHandler = async (id, type) => {
    if (currUser?.uid) {
      const userDataRef = doc(db, "users", currUser?.uid);
      if (type == "add" && !cart.includes(id)) {
        await updateDoc(userDataRef, {
          cart: arrayUnion(id),
        });
        setCart([...cart, id]);
      } else if (type != "add") {
        await updateDoc(userDataRef, {
          cart: arrayRemove(id),
        });
        setCart([...cart.filter((i) => i != id)]);
      }
    }
  };

  const elements = { data, userData, CartHandler, firstName, cart };
  return <MainData.Provider value={elements}>{children}</MainData.Provider>;
};

export const UseData = () => {
  return useContext(MainData);
};

export default DataContext;
