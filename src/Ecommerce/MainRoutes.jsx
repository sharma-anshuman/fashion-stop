import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/MyProfile/Profile";
import Wishlist from "./pages/Wishlist/Wishlist";
import Error from "./pages/Error/Error";
import ProductsPage from "./pages/Products/ProductsPage";
import Product from "./pages/Product Detail/Product";
import SignupPage from "./pages/LoginSignup/SignupPage";
import Addresses from "./pages/Profile/Addresses/Addresses";
import OrderHistory from "./pages/Profile/OrderHistory/OrderHistory";
import LoginPage from "./pages/LoginSignup/LoginPage";
import { RequiresAuth } from "./components/RequiresAuth";

const MainRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="product/:ID" element={<Product />} />
        <Route path="cart" element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          } />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route path="*" element={<Error />} />
        <Route path="profile">
          <Route index={true} element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          } />
          <Route path="addresses" element={<Addresses />} />
          <Route path="myorders" element={<OrderHistory />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default MainRoutes;
