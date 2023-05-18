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
        console.log("Document data:", docSnap.data());
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("it's in else");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [data]);

  const CartHandler = async (id, type) => {
    console.log(currUser, userData);
    if (currUser?.uid) {
      const userDataRef = doc(db, "users", currUser?.uid);
      if (type == "add" && !userData?.cart?.includes(id)) {
        await updateDoc(userDataRef, {
          cart: arrayUnion(id),
        });
        console.log("added", id, userData);
      } else {
        await updateDoc(userDataRef, {
          cart: arrayRemove(id),
        });
      }
    }
  };

  const elements = { data, userData, CartHandler };
  return <MainData.Provider value={elements}>{children}</MainData.Provider>;
};

export const UseData = () => {
  return useContext(MainData);
};

export default DataContext;
