import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import DataContext from "./contexts/DataContext";
import Pagination from "./pagination/Pagination";
import FilterContext from "./contexts/FilterContext";

const EcommerceMain = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <DataContext>
          <FilterContext>
            <Pagination>
              <MainRoutes />
            </Pagination>
          </FilterContext>
        </DataContext>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default EcommerceMain;
