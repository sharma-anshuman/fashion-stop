import React from "react";
import { UseData } from "../../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const SingleAddress = ({ item }) => {
  const { currAddress, setCurrAddress, addresses, setAddresses } = UseData();
  const { address, city, contact, name, pincode, state, id } = item;
  const addressHandler = () => {
    setAddresses([...addresses.filter(({ id: i }) => i != id)]);
    if (currAddress === id) setCurrAddress(null);
  };
  const getAddress = () => {
    return `${address}, ${city}, ${state}, Pin: ${pincode}`;
  };
  return (
    <label className="singleInput">
      <input
        onClick={() => setCurrAddress(id)}
        checked={currAddress === id}
        type="radio"
      />
      <div className="mainAdd">
        <div className="nameAndBin">
          <h2>{name}</h2>
          <button onClick={addressHandler}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
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
