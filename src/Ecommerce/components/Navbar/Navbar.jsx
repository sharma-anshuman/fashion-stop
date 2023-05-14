import React from "react";
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

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-left">
        <h1 className="navLogo">fashion stop</h1>
      </div>
      <div className="nav-mid">
        <input type="text" placeholder="Search" />
      </div>
      <div className="nav-right">
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
