import React from "react";
import "./filter.css";
import { UseFilters } from "../../contexts/FilterContext";

const FilterUI = () => {
  const { filters, dispatchFilter } = UseFilters();
  const { categories, sizes } = filters;

  const rates = [4, 3, 2, 1];
  const sizing = ["S", "M", "L", "XL", "XXL"];
  const gender = ["Men", "Women", "Kids"];

  return (
    <React.Fragment>
      <div className="filterMain">
        <div className="filter-head">
          <h3>Filters</h3>
          <button onClick={() => dispatchFilter({type: "reset"})} className="filter-clear">Clear</button>
        </div>

        <div className="filter filter-price">
          <h3>Price</h3>
          <input
            onChange={({ target: { value: v } }) =>
              dispatchFilter({ type: "price", value: v })
            }
            type="range"
            min={100}
            max={3000}
          />
        </div>

        <div className="filter filter-category">
          <h3>Categories</h3>
          {gender.map((item) => (
            <label>
              <input
                onChange={() =>
                  dispatchFilter({
                    type: "category",
                    value: item.toLowerCase(),
                  })
                }
                type="checkbox"
                checked={categories.includes(item.toLowerCase())}
              />
              {item}
            </label>
          ))}
        </div>

        <div className="filter filter-size">
          <h3>Sizes</h3>
          {sizing.map((size) => (
            <label>
              <input
                onChange={() => dispatchFilter({ type: "size", value: size })}
                type="checkbox"
                checked={sizes.includes(size)}
              />
              {size}
            </label>
          ))}
        </div>

        <div className="filter filter-rating">
          <h3>Rating</h3>
          {rates.map((rate) => (
            <label>
              <input
                onChange={() => dispatchFilter({ type: "rating", value: rate })}
                checked={filters.rating === rate}
                type="radio"
              />
              {rate} stars and above
            </label>
          ))}
        </div>

        <div className="filter filter-sort">
          <h3>Sort by Price</h3>
          <label>
            <input
              onChange={() => dispatchFilter({ type: "sort", value: "lth" })}
              checked={filters.sortby === "lth"}
              type="radio"
            />
            Low to High
          </label>
          <label>
            <input
              onChange={() => dispatchFilter({ type: "sort", value: "htl" })}
              checked={filters.sortby === "htl"}
              type="radio"
            />
            High to Low
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterUI;
