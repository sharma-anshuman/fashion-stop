import React from "react";
import "./loader.css";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <ColorRing
        visible={true}
        height="50%"
        width="50%"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={["#F6F1F1", "#AFD3E2", "#19A7CE", "#146C94"]}
      />
    </div>
  );
};

export default Loader;
