import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/icons/icon-large.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faDirections,
  faCompass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCaretSquareRight,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { UseFilters } from "../../contexts/FilterContext";
import { UseSignupContext } from "../../contexts/Signup/Signup";
import { db } from "../../../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { setUserId } from "firebase/analytics";
import { UseData } from "../../contexts/DataContext";
import { faSafari, faWpexplorer } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatchFilter, filters } = UseFilters();
  const { userData, firstName, cart, wishlist } = UseData();
  const [searchValue, setSearch] = useState("");
  const location = useLocation().pathname;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchFilter({ type: "search", value: searchValue })
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [searchValue]);

  useEffect(() => {
    if(filters.isReset) setSearch("");
  }, [filters.isReset])

  return (
    <nav>
      <div className="nav-left">
        <h1 className="navLogo" onClick={() => navigate("/")}>
          Fashion Stop
        </h1>
      </div>
      <div className="nav-mid">
       { location === '/products' && <input
          value={searchValue}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          type="text"
          placeholder="Search"
        />}
      </div>
      <div className="nav-right">
        {userData !== null && (
          <h3>Hey {firstName}!!</h3>
        )}
        <button className="nav-icon compass" onClick={() => navigate("/products")}><FontAwesomeIcon icon={faCompass} /></button>
        <button className="nav-icon" onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {Object.keys(cart).length>0 && <div className="lengthCount"><p>{Object.keys(cart).length}</p></div>}
        </button>
        <button className="nav-icon" onClick={() => navigate("/wishlist")}>
          <FontAwesomeIcon icon={faHeart} />
          {wishlist.length>0 && <div className="lengthCount"><p>{wishlist.length}</p></div>}
        </button>
        <button className="nav-icon" onClick={() => navigate("/profile")}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
