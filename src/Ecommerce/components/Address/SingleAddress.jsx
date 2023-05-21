import React from "react";

const SingleAddress = ({ item }) => {
  const { address, city, contact, name, pincode, state } = item;
  const getAddress = () => {
    return `${address}, ${city}, ${state}, Pin: ${pincode}`;
  };
  return (
    <label className="singleInput">
      <input type="radio" />
      <div>
      <h2>{name}</h2>
        <p>{getAddress()}</p>
        <p>
          <strong>Mobile: </strong>
          {contact}
        </p>
      </div>
    </label>
  );
};

export default SingleAddress;
