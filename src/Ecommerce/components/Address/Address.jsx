import React, { useState } from "react";
import { UseData } from "../../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import SingleAddress from "./SingleAddress";
import Modal from "../Modal/Modal";
import "./address.css";
import { ToastContainer } from "react-toastify";

const Address = () => {
  const { addresses } = UseData();
  const [show, setShow] = useState(false);

  return (
    <div className="main-address">
      <h2 className="add-head">Address Details</h2>
      {addresses.length === 0 && <h3 style={{marginBottom: "1rem"}}>Oops!! You've no addresses — Add an address</h3>}
      <div>
        {addresses.map((item, idx) => (
          <SingleAddress key={idx} item={item} />
        ))}
      </div>
      <div>
        <button className="addNewAddress" onClick={() => setShow(true)}>
          <FontAwesomeIcon className="mapIcon" icon={faMapMarkerAlt} /> Add new Address{" "}
        </button>
        <Modal
          title="Add a new address"
          onClose={() => setShow(false)}
          show={show}
        ></Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Address;
