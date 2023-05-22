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
import { useNavigate } from "react-router-dom";
import { ToastHandler } from "../components/Toast/Toast";

const MainData = createContext();

const DataContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstname] = useState("");
  const [currAddress, setCurrAddress] = useState("");
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
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
      console.log("docSnap in DataContext.jsx", docSnap);
      if (docSnap.exists()) {
        console.log(
          "Document data is here in DataContext.jsx:",
          docSnap.data()
        );
        setUserData(docSnap.data());
        setFirstname(docSnap.data().firstName);
        setCart({ ...docSnap.data().cart });
        setWishlist([...docSnap.data().wishlist]);
        setAddresses([...docSnap.data().addresses]);
      } else {
        console.log("No such document! in DataContext.jsx");
      }
    } else {
      setUserData(null);
      console.log("it's in else in DataContext.jsx");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [currUser]);

  const CartHandler = async (id, type) => {
    if (currUser?.uid) {
      if (type === "add" && !cart[id]) {
        setCart({ ...cart, [id]: 1 });
        ToastHandler("success", "Added to Cart");
      } else if (type === "add" && cart[id]) {
        setCart({ ...cart, [id]: cart[id] + 1 });
      } else if (
        (type === "remove" && cart[id] === 1) ||
        type === "delete" ||
        type === "moveToWish"
      ) {
        const tempCart = Object.keys(cart)
          .filter((key) => key != id)
          .reduce((acc, key) => {
            acc[key] = cart[key];
            return acc;
          }, {});
        setCart({ ...tempCart });
        if (type !== "moveToWish") ToastHandler("success", "Item Deleted");
        if (type === "moveToWish") {
          if (!wishlist.includes(id)) {
            setWishlist([...wishlist, id]);
          }
          ToastHandler("success", "Moved to Wishlist");
        }
      } else if (type === "remove" && cart[id] > 1) {
        setCart({ ...cart, [id]: cart[id] - 1 });
      }
    } else {
      ToastHandler("error", "Login to add to Cart");
    }
  };

  const UpdateDBcart = async () => {
    if (currUser?.uid) {
      const userDataRef = doc(db, "users", currUser?.uid);
      await updateDoc(userDataRef, {
        cart: cart,
      });
    }
  };
  useEffect(() => {
    UpdateDBcart();
  }, [cart]);

  const WishlistHandler = async (id, type) => {
    if (currUser?.uid) {
      const tempWish = wishlist.filter((i) => i != id);
      if (type === "add") {
        if (!wishlist.includes(id)) {
          setWishlist([...wishlist, id]);
          ToastHandler("success", "Added to Wishlist");
        } else {
          setWishlist([...tempWish]);
          ToastHandler("success", "Removed From Wishlist");
        }
      } else if (type === "moveToCart" && !cart[id]) {
        setCart({ ...cart, [id]: 1 });
        setWishlist([...tempWish]);
        ToastHandler("success", "Moved to Cart");
      } else if (type === "delete" || (type === "moveToCart" && cart[id])) {
        setCart({ ...cart, [id]: cart[id] + 1 });
        setWishlist([...tempWish]);
        if(type === 'moveToCart') ToastHandler("success", "Moved to Cart");
        else if (type === "delete") ToastHandler("success", "Removed from Wishlist");
      }
    } else {
      ToastHandler("error", "Login to add as favourite");
    }
  };

  useEffect(() => {
    UpdateDBcart();
  }, [wishlist]);

  const UpdateDBwishlist = async () => {
    if (currUser?.uid) {
      const userDataRef = doc(db, "users", currUser?.uid);
      await updateDoc(userDataRef, {
        wishlist: wishlist,
      });
    }
  };

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

  const PlaceOrderHandler = () => {
    console.log("its here in handler", currAddress.length, cart);
    if (addresses?.length === 0)
      ToastHandler("error", "Add an address to continue");
    else if (currAddress?.length === 0)
      ToastHandler("error", "Select an address");
    if (currAddress?.length > 0 && Object.keys(cart)?.length > 0) {
      console.log("here in the condition");
      navigate("order-description");
    }
  };

  const elements = {
    data,
    userData,
    CartHandler,
    firstName,
    cart,
    wishlist,
    WishlistHandler,
    addresses,
    setCurrAddress,
    currAddress,
    setAddresses,
    PlaceOrderHandler,
  };
  return <MainData.Provider value={elements}>{children}</MainData.Provider>;
};

export const UseData = () => {
  return useContext(MainData);
};

export default DataContext;
