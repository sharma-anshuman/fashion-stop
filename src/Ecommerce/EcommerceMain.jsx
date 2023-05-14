import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import DataContext from "./contexts/DataContext";
import Pagination from "./pagination/Pagination";

const EcommerceMain = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <DataContext>
          <Pagination>
            <MainRoutes />
          </Pagination>
        </DataContext>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default EcommerceMain;
