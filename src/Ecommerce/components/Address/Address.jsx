import React, { useState } from "react";
import { UseData } from "../../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import SingleAddress from "./SingleAddress";
import Modal from "../Modal/Modal";
import "./address.css";

const Address = () => {
  const { addresses } = UseData();
  const [show, setShow] = useState(false);
  
  return (
    <div className="main-address">
      <h2 className="add-head">Address Details</h2>
      <div>
        {addresses.map((item, idx) => (
          <SingleAddress key={idx} item={item} />
        ))}
      </div>
      <div>
        <button onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faLocationPin} /> Add new Address
        </button>
        <Modal
          title="Add a new address"
          onClose={() => setShow(false)}
          show={show}
        >
        </Modal>
      </div>
    </div>
  );
};

export default Address;
