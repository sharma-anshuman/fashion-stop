import React, { createContext, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../pages/Products/ProductCard";
import { UseData } from "../contexts/DataContext";
import "./paginate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { UseFilters } from "../contexts/FilterContext";
import { useEffect } from "react";

const PaginateContext = createContext();

const Pagination = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { dataAfterFilter: data } = UseFilters();

  const getSize = () => {
    if(window.innerWidth>3381){
      return 22;
    }
    else if(window.innerWidth>3077){
      return 20;
    }
    else if(window.innerWidth>2774){
      return 18;
    }
    else if(window.innerWidth>2471){
      return 16;
    }
    else if(window.innerWidth>2168){
      return 14;
    }
    else if(window.innerWidth>1865){
      return 12;
    }
    else if(window.innerWidth>1562){
      return 10;
    }
    return 8;
  }

  const [dataPerPage, setPerPage] = useState(getSize());

  const handleResize = () => {
    setPerPage(getSize());
  }
  window.addEventListener("resize", handleResize);
  const pagesVisited = pageNumber * dataPerPage;

  const displayData = data
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((item) => <ProductCard key={item.id} item={item} />);
  const NoDataMsg = "Oops!! No data found";

  useEffect(() => {setPageNumber(0)}, [data])

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
      previousLinkClassName={`prevButton ${pageNumber == 0?"disable":""}`}
      nextLinkClassName={`nextButton ${pageNumber == pageCount-1?"disable":""}`}
      disabledClassName="paginationDisabled"
      activeClassName="paginationActive"
    />
  );
  const values = { paginateKaro, displayData, pageNumber, NoDataMsg };

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
