import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import DataContext from "./contexts/DataContext";

const EcommerceMain = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <DataContext>
          <MainRoutes />
        </DataContext>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default EcommerceMain;
