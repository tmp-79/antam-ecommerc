import React, { Fragment, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMenu, GrFormClose } from "react-icons/gr";

import { BiChevronDown } from "react-icons/bi";
import "./Header.scss";

const Header = () => {
  const { pathname } = useLocation();
  const [showShadow, setShowShadow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { categoryList, isLoading } = useSelector((state) => state.category);

  // useEffect(() => {
  //   dispatch();
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //  Logic scroll show background header */
  // const [sticky, setSticky] = useState("");
  // window.addEventListener("scroll", () => {
  //   const scrolled = window.scrollY;
  //   if (scrolled > 0) {
  //     setSticky(" sticky");
  //   } else {
  //     setSticky("");
  //   }
  // });

  /* Logic toggle SearchBar */
  // const [open, setOpen] = useState("");

  // const HandleSearchBar = () => {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth < 740) {
  //     if (open === "") {
  //       setOpen(" open");
  //     } else {
  //       setOpen("");
  //     }
  //   }
  // };

  return (
    <Fragment>
      <header className={`header ${showShadow ? "is-show" : ""}`}>
        <div className="wrapper header-wr header-wrap">
          <Link to="/">
            <span className="header-logo">
              <img src="/logo-chailo.png" alt="" />
              {/* <h2>Chai Lọ An Tâm</h2> */}
            </span>
          </Link>
          <ul className={`header-nav__list ${showMenu ? "is-show" : ""}`}>
            <GrFormClose
              onClick={() => setShowMenu(false)}
              className="header-menu__close"
            ></GrFormClose>
            <li className="header-nav__item" >
              <NavLink className="header-title" to='/' onClick={() => setShowMenu(false)}
                activeClassName={
                  `/` === pathname ? "active" : ""
                }>
                Trang Chủ
              </NavLink>
            </li>
            {categoryList?.map((item) => (
              <li className="header-nav__item" key={item.id}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={`/loai-san-pham/${item.id}`}
                  className="header-title"
                  activeClassName={
                    `/loai-san-pham/${item.id}` === pathname ? "active" : ""
                  }
                >
                  {item.name}
                  {/* {item.subItemName ? <BiChevronDown></BiChevronDown> : ""} */}
                </NavLink>

                {/* {item.subItemName ? (
                  <ul className="header-sub__list">
                    <li className="header-sub__item">
                      <Link to={item.sublink} className="header-sub__link">
                        {item.subItemName}
                      </Link>
                    </li>
                    <li className="header-sub__item">
                      <Link to={item.sublink} className="header-sub__link">
                        {item.subItemName}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )} */}
              </li>
            ))}
            <li className="header-nav__item" >
              <NavLink className="header-title" to='/lien-he'
               onClick={() => setShowMenu(false)}
                activeClassName={
                  `/lien-he` === pathname ? "active" : ""
                }>
                Liên hệ
              </NavLink>
            </li>
            <button className="btn header-phone">
              <a
                href="tel:0865328664"
                className="header-nav__contact animate-pulse"
              >
                <span>
                  <BsTelephoneFill className="animate-turnCircle"></BsTelephoneFill>
                </span>
                <span className="text-effect">
                  <span className="text-child">0</span>
                  <span className="text-child">8</span>
                  <span className="text-child">6</span>
                  <span className="text-child">5</span>
                  <span className="text-child">3</span>
                  <span className="text-child">2</span>
                  <span className="text-child">8</span>
                  <span className="text-child">6</span>
                  <span className="text-child">6</span>
                  <span className="text-child">4</span>
                </span>
              </a>
            </button>
          </ul>
          <GrMenu
            onClick={() => setShowMenu(!showMenu)}
            className="header-menu__btn is-show"
          ></GrMenu>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
