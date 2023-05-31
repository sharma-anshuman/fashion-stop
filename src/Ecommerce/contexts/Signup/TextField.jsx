import React from "react";
import { ErrorMessage, useField } from "formik";

const TextField = ({ lable, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <label className="inputField">
      <div className="fieldInputs">
        <span className="fieldTag">{lable}:</span>
        <input
          className="fieldInput"
          {...field}
          {...props}
          autoComplete="off"
        />
      </div>
      <div className="sign-error">
      <ErrorMessage component="div" name={field.name} className="error" />

      </div>
    </label>
  );
};

export default TextField;
