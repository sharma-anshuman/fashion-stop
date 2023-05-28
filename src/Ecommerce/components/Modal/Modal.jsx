import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import "./modal.css";
import { UseData } from "../../contexts/DataContext";
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Chandigarh",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  const { addresses, setAddresses } = UseData();
  const  [currAddress, setCurr ] = useState({
    address: "",
    city: "",
    contact: "",
    name: "",
    pincode: "",
    state: "",
  });

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const submitHandler = (event) => {
    // const obj = {
    //   address: event.target.address.value,
    //   city: event.target.city.value,
    //   contact: event.target.tele.value,
    //   name: event.target.name.value,
    //   pincode: event.target.pin.value,
    //   state: event.target.state.value,
    //   id: uuidv4(),
    // };
    const tempAdd = {...currAddress, id: uuidv4()}
    setAddresses([...addresses, tempAdd]);
    event.preventDefault();
    setCurr({
      address: "",
      city: "",
      contact: "",
      name: "",
      pincode: "",
      state: "",
    });
    props.onClose();
  };

  const resetHandler = () => {
    setCurr({
      address: "",
      city: "",
      contact: "",
      name: "",
      pincode: "",
      state: "",
    });
  }

  const getRandomAddress = async () => {
    const tempAdd = {
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      contact: faker.phone.number('+91##########'), // '501-039-84,
      name: faker.person.fullName(),
      pincode: faker.location.zipCode('######'),
      state: states[Math.floor(Math.random() * (states.length - 1))],
    }
    setCurr(tempAdd)
  };

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={submitHandler} id="myForm" className="address-form">
              <input
                name="name"
                value={currAddress?.name}
                className="name"
                placeholder="Name"
                maxLength="25"
                type="text"
                onChange={(event) => setCurr({...currAddress, name: event.target.value})}
                required
              />
              <input
                name="tele"
                value={currAddress?.contact}
                className="tel"
                placeholder="Mobile No."
                maxLength="10"
                type="tel"
                onChange={(event) => setCurr({...currAddress, contact: event.target.value})}
                required
              />
              <input
                name="pin"
                value={currAddress?.pincode}
                className="pincode"
                placeholder="Pincode"
                maxLength="6"
                type="number"
                onChange={(event) => setCurr({...currAddress, pincode: event.target.value})}
                required
              />
              <input
                name="city"
                value={currAddress?.city}
                className="city"
                placeholder="City"
                type=""
                onChange={(event) => setCurr({...currAddress, city: event.target.value})}
                required
              />
              <textarea
                name="address"
                value={currAddress?.address}
                className="address-text"
                placeholder="Address"
                type=""
                onChange={(event) => setCurr({...currAddress, address: event.target.value})}
                required
              />
              <input
                name="alternate"
                className="tel"
                placeholder="Alternate Contact"
                maxLength="10"
                type="tel"
              />
              <select
                className="state-select"
                value={currAddress?.state}
                placeholder="State"
                name="state"
                onChange={(event) => setCurr({...currAddress, state: event.target.value})}
                required
              >
                {states.map((state, idx) => (
                  <option key={idx} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button modal-btn">
              Close
            </button>
            <button onClick={getRandomAddress} className="modal-btn">Random Address</button>
            <input className="modal-btn" type="submit" form="myForm" />
            <input
              className="modal-btn"
              type="reset"
              form="myForm"
              value="Reset"
              onClick={resetHandler}
            />
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
