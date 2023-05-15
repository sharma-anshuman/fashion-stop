import React, { createContext, useContext, useReducer, useState } from "react";

const FilterProvider = createContext();

const FilterContext = ({ children }) => {

    const FilterManager = (filters, {value, type}) => {
        switch(type){
            case "search": {
                return {...filters, searchQuery: value}
                break;
            }
            case "price": {
                return {...filters, price: Number(value)}
                break;
            }
            case "category":{
                return filters.categories.includes(value)?
                {...filters, categories: filters.categories.filter(val => val!=value)}:
                {...filters, categories: [...filters.categories, value]};
                break;
            }
            case "size":{
                return filters.sizes.includes(value)?
                {...filters, sizes: filters.sizes.filter(val => val!=value)}:
                {...filters, sizes: [...filters.sizes, value]};
                break;
            }
            case "rating":{
                return {...filters, rating: value}
                break;
            }
            case "sort":{
                return {...filters, sortby: value}
                break;
            }
            default: {
                return filters;
            }
        }
    }

  const [filters, dispatchFilter] = useReducer(FilterManager, {
    searchQuery: "",
    price: 0,
    categories: [],
    sizes: [],
    rating: 0,
    sortby: "",
  });

  console.log(filters);
  const elements = {filters, dispatchFilter};
  return (
    <FilterProvider.Provider value={elements}>
      {children}
    </FilterProvider.Provider>
  );
};

export const UseFilters = () => {
  return useContext(FilterProvider);
};

export default FilterContext;
