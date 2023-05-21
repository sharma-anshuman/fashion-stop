import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastHandler = (type, message) => {
    console.log("here in the message")
  if (type === "error") {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === "warn") {
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === "success") {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === "info") {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
