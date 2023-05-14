import React, { createContext, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../pages/Products/ProductCard";
import { UseData } from "../contexts/DataContext";
import "./paginate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PaginateContext = createContext();

const Pagination = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { data } = UseData();

  const dataPerPage = 6;
  const pagesVisited = pageNumber * dataPerPage;

  const displayData = data
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((item) => <ProductCard item={item} />);

  const pageCount = Math.ceil(data.length / dataPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const paginateKaro = (
    <ReactPaginate
      previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
      nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName="paginate-container"
      previousLinkClassName="prevButton"
      nextLinkClassName="nextButton"
      disabledClassName="paginationDisabled"
      activeClassName="paginationActive"
    />
  );
  const values = { paginateKaro, displayData };

  return (
    <PaginateContext.Provider value={values}>
      {children}
    </PaginateContext.Provider>
  );
};

export const UsePagination = () => {
  return useContext(PaginateContext);
};

export default Pagination;
