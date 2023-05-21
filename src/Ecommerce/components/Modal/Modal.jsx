import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from 'uuid';
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

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const submitHandler = (event) => {
    const obj = {
      address: event.target.address.value,
      city: event.target.city.value,
      contact: event.target.tele.value,
      name: event.target.name.value,
      pincode: event.target.pin.value,
      state: event.target.state.value,
      id: uuidv4()
    };
    setAddresses([...addresses, obj]);
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
                className="name"
                placeholder="Name"
                maxLength="25"
                type="text"
                required
              />
              <input
                name="tele"
                className="tel"
                placeholder="Mobile No."
                maxLength="10"
                type="tel"
                required
              />
              <input
                name="pin"
                className="pincode"
                placeholder="Pincode"
                maxLength="6"
                type="number"
                required
              />
              <input
                name="city"
                className="city"
                placeholder="City"
                type=""
                required
              />
              <textarea
                name="address"
                className="address-text"
                placeholder="Address"
                type=""
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
                placeholder="State"
                name="state"
                required
              >
                {states.map((state, idx) => (
                  <option key={idx} value={state}>{state}</option>
                ))}
              </select>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button modal-btn">
              Close
            </button>
            <input className="modal-btn" type="submit" form="myForm" />
            <input className="modal-btn" type="reset" form="myForm" value="Reset" />
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
