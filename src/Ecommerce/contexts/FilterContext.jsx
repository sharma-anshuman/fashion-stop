import React, { createContext, useContext, useReducer, useState } from "react";
import { useActionData } from "react-router-dom";
import { UseData } from "./DataContext";

const FilterProvider = createContext();

const FilterContext = ({ children }) => {

  const { data } = UseData();

  const FilterManager = (filters, { value, type }) => {
    switch (type) {
      case "search": {
        return { ...filters, searchQuery: value, isReset: false }
        break;
      }
      case "price": {
        return { ...filters, price: Number(value), isReset: false }
        break;
      }
      case "category": {
        return filters.categories.includes(value) ?
          { ...filters, categories: filters.categories.filter(val => val != value), isReset: false } :
          { ...filters, categories: [...filters.categories, value], isReset: false };
        break;
      }
      case "clearCategory":{
        return {...filters, categories: []};
        break;
      }
      case "size": {
        return filters.sizes.includes(value) ?
          { ...filters, sizes: filters.sizes.filter(val => val != value), isReset: false } :
          { ...filters, sizes: [...filters.sizes, value], isReset: false };
        break;
      }
      case "rating": {
        return { ...filters, rating: value, isReset: false }
        break;
      }
      case "sort": {
        return { ...filters, sortby: value, isReset: false }
        break;
      }
      case "reset": {
        return { searchQuery: "", price: 3000, categories: [], sizes: [], rating: 0, sortby: "", isReset: true }
      }
      default: {
        return filters;
      }
    }
  }

  const [filters, dispatchFilter] = useReducer(FilterManager, {
    searchQuery: "",
    price: 2700,
    categories: [],
    sizes: [],
    rating: 0,
    sortby: "",
    isReset: true
  });

  const filterFunctions = [(tempData) => {
    if(!filters.searchQuery.length) return tempData;
    return tempData.filter(({productName: p}) => p.toLowerCase().includes(filters.searchQuery.toLowerCase()));
  },
    (tempData) => {
      if(!filters.price) return tempData;
      return tempData.filter(({priceAfterDiscount: p}) => p<=filters.price);
    },

    (tempData) => {
      if(!filters.categories.length) return tempData;
      return tempData.filter(({category: c}) => filters.categories.includes(c))
    },
    (tempData) => {
      if(!filters.sizes.length) return tempData;
      return tempData.filter(({size}) => filters.sizes.includes(size));
    },
    (tempData) => {
      if(!filters.rating) return tempData;
      return tempData.filter(({rating}) => rating>=filters.rating);
    },
    (tempData) => {
      if(!filters.sortby.length) return tempData;
      return [...tempData.sort(({priceAfterDiscount: p}, {priceAfterDiscount: q}) => filters.sortby==='lth'?p-q:q-p)];
    }
];


  let dataAfterFilter = filterFunctions.reduce((acc, curr) => curr(acc), [...data]);

  const elements = { filters, dispatchFilter, dataAfterFilter };
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
