import React from "react";
import { useState, useEffect } from "react";
// Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
// Paignation
import { UsePagination } from "../../pagination/Pagination";
import "./products.css";

const ProductsPage = () => {
  const { paginateKaro, displayData } = UsePagination();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [displayData]);

  return !displayData.length ? (
    <Loader />
  ) : (
    <React.Fragment>
      <Navbar />
      <div className="main-products">
        <div className="products">{displayData}</div>
        <div className="paginate-karo">{paginateKaro}</div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProductsPage;
