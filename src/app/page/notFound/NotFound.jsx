import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";
import { BsArrowLeft } from "react-icons/bs";

const NotFound = () => {
  return (
    <section className="notfound">
      <img src="/404.png" alt="" className="" />
      <Link to="/" className="notfound-btn btn">
        <BsArrowLeft></BsArrowLeft>
        <span>Về lại trang chủ</span>
      </Link>
    </section>
  );
};

export default NotFound;
