import React from "react";
import { ToastContainer, Toast as RBToast } from 'react-bootstrap';
import "./Toast.css";

const Toast = (props) => {
  return (
    <ToastContainer className="p-3 text-center position-fixed" position="bottom-center">
      <RBToast onClose={() => props.setShow(false)} show={props.show} delay={3000} autohide>
        <RBToast.Body><p className="fs-6 mb-0">{props.message}</p></RBToast.Body>
      </RBToast>
    </ToastContainer>
  );
}

export default Toast;