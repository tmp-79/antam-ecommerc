import React from "react";
import { BsCheck } from "react-icons/bs";
import "./ToastForm.scss";

const ToastForm = () => {
  return (
    <div id="toast">
      <div className="toast-form">
        <div className="toast-icon__wrap">
          <BsCheck className="toast-icon"></BsCheck>
        </div>
        <div className="toast-content">
          <span className="toast-title">Thành công!</span>
          <span className="toast-text">Bạn đã đặt hàng thành công</span>
        </div>
      </div>
    </div>
  );
};

export default ToastForm;
