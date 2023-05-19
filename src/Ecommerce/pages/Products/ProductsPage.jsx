import React from "react";
import { useState, useEffect } from "react";
// Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import FilterUI from "../../components/Filter/FilterUI";
// Paignation
import { UsePagination } from "../../pagination/Pagination";
import "./products.css";

const ProductsPage = () => {
  const { paginateKaro, displayData, pageNumber } = UsePagination();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pageNumber]);

  return !displayData.length ? (
    <Loader />
  ) : (
    <React.Fragment>
      <div className="pro-main">

      <Navbar />
      <div className="products-and-filter">
        <div className="filter-component">
          <FilterUI />
        </div>
        <div className="main-products">
          <div className="products">{displayData}</div>
          <div className="paginate-karo">{paginateKaro}</div>
        </div>
      </div>
      <Footer />
      </div>
    </React.Fragment>
  );
};

export default ProductsPage;
