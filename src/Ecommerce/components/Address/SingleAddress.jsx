import React, {useState} from "react";
import { UseData } from "../../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditAddressModal from "../Modal/EditAddressModal";
import { ToastHandler } from "../Toast/Toast";

const SingleAddress = ({ item }) => {
  const { currAddress, setCurrAddress, addresses, setAddresses } = UseData();
  const { address, city, contact, name, pincode, state, id } = item;
  const [show, setShow] = useState(false);
  const addressHandler = () => {
    setAddresses([...addresses.filter(({ id: i }) => i != id)]);
    ToastHandler("success", "Address Deleted");
    if (currAddress === id) setCurrAddress("");
  };
  const addUpdateHandler = () => {
    setShow(true);
  };
  const getAddress = () => {
    return `${address}, ${city}, ${state}, Pin: ${pincode}`;
  };
  return (
    <label className="singleInput">
      <input
        onClick={() => setCurrAddress(id)}
        checked={currAddress === id}
        onChange={(e) => {}}
        type="radio"
      />
      <div className="mainAdd">
        <div className="nameAndBin">
          <h2>{name}</h2>
          <div>
            <button onClick={addUpdateHandler}>
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button onClick={addressHandler}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <EditAddressModal
              title="Edit Address"
              onClose={() => setShow(false)}
              show={show}
              item={item}
            ></EditAddressModal>
          </div>
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
