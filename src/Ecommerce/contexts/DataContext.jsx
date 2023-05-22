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
  const [lastName, setLastname] = useState("");
  const [currOrder, setCurrOrder] = useState({});

  const [currAddress, setCurrAddress] = useState("");
  const [cartPrice, setCartPrice] = useState(0);
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
        setLastname(docSnap.data().lastName);
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
        if (type === "moveToCart") ToastHandler("success", "Moved to Cart");
        else if (type === "delete")
          ToastHandler("success", "Removed from Wishlist");
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






/*******************************************PAYMENT GATEWAY *******************************************/
  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      // Notify("Razorpay SDK failed to load, check you connection", "error");
      ToastHandler('error', "Razorpay SDK failed to load, check you connection");

      return;
    }

    const options = {
      key: "rzp_test_I2lkgLwhU0MCkf",
      amount: cartPrice * 100,
      currency: "INR",
      name: "FashionStop",
      description: "Thank you for shopping with us",
      image:
        "https://scontent.fjai1-4.fna.fbcdn.net/v/t1.6435-9/82809907_105048804358678_8872247319261609984_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=uN4yn-sV0jcAX8eqLXx&_nc_ht=scontent.fjai1-4.fna&oh=00_AfAKm0Ccg3kKqyprMZA7ELstnA7PTlcZT2aYe0pLL-8zAw&oe=64929DE0",
      handler: async function (response) {
        const today = new Date();
        const currDate =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear();
        const currTime =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const currentOrder = {
          products: { ...cart },
          address: currAddress,
          amount: cartPrice,
          date: currDate,
          time: currTime,
          paymentId: response.razorpay_payment_id,
        };
        const userDataRef = doc(db, "users", currUser?.uid);
        await updateDoc(userDataRef, {
          orderHistory: arrayUnion(currentOrder),
        });
        setCurrOrder({...currentOrder});
        setCart({});
        ToastHandler("success", "Payment succesfull");
        navigate("/order-description");
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: currUser.email,
        contact: "9876543210",
      },
      theme: {
        color: "#19A7CE",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
/*******************************************PAYMENT GATEWAY *******************************************/





  const navigate = useNavigate();

  const PlaceOrderHandler = () => {
    console.log("its here in handler", currAddress?.length, cart);
    if (addresses?.length === 0)
      ToastHandler("error", "Add an address to continue");
    else if (currAddress?.length === 0)
      ToastHandler("error", "Select an address");
    if (currAddress?.length > 0 && Object.keys(cart)?.length > 0) {
      console.log("here in the condition");
      displayRazorpay();
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
    setCartPrice,
    currOrder,
    lastName
  };
  return <MainData.Provider value={elements}>{children}</MainData.Provider>;
};

export const UseData = () => {
  return useContext(MainData);
};

export default DataContext;
