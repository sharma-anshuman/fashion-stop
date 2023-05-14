import React from "react";
import { useState, useMemo } from "react";
import "./products.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { UseData } from "../../contexts/DataContext";

import ProductCard from "./ProductCard";

let PageSize = 4;

const ProductsPage = () => {
  const { data } = UseData();

  console.log("were on the homepage", data);

  return !data.length ? (
    <Loader />
  ) : (
    <React.Fragment>
      <Navbar />
      <div className="products">
        {data.map((item) => (
          <ProductCard item={item} />
        ))}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProductsPage;
