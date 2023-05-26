import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import DataContext from "./contexts/DataContext";
import Pagination from "./pagination/Pagination";
import FilterContext from "./contexts/FilterContext";
import SignUpContext from "./contexts/Signup/Signup";
import CartContext from "./contexts/CartContext";
import WishlistContext from "./contexts/WishlistContext";

const EcommerceMain = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SignUpContext>
          <DataContext>
            <CartContext>
              <WishlistContext>
                <FilterContext>
                  <Pagination>
                    <MainRoutes />
                  </Pagination>
                </FilterContext>
              </WishlistContext>
            </CartContext>
          </DataContext>
        </SignUpContext>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default EcommerceMain;
