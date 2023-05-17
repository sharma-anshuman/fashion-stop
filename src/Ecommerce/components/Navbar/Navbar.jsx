import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/icons/icon-large.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCaretSquareRight,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { UseFilters } from "../../contexts/FilterContext";
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { db } from "../../../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { setUserId } from "firebase/analytics";

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatchFilter } = UseFilters();
  const { currUser } = UseSignupContext();
  const [userData, setUserData] = useState(null);
  const getDataa = async () => {
    console.log(typeof currUser?.uid, currUser?.uid);
    if (currUser?.uid !== undefined) {
      const docSnap = await getDoc(doc(db, "users", currUser?.uid));
      console.log("docSnap", docSnap);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    getDataa();
  }, []);

  return (
    <nav>
      <div className="nav-left">
        <h1 className="navLogo" onClick={() => navigate("/")}>
          fashion stop
        </h1>
      </div>
      <div className="nav-mid">
        <input
          onChange={(event) =>
            dispatchFilter({ type: "search", value: event.target.value })
          }
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="nav-right">
        {userData !== null && (
          <h3 onClick={() => navigate("/profile")}>
            Welcome {userData.firstName}!!
          </h3>
        )}
        <button onClick={() => navigate("/products")}>Explore</button>
        <button onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        <button onClick={() => navigate("/wishlist")}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button onClick={() => navigate("/profile")}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
