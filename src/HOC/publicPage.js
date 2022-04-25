import React, { useEffect } from "react";
import { Footer } from "app/components/footer";
import Header from "app/components/header";
// import { Navbar } from "app/components/navbar";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCategoryAction } from "core/redux/actions/categoryActions";
import IconContact from '../app/components/animation/IconContact'
export const PublicPage = ({ Component, ...restProps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            {/* <Navbar /> */}
            <Component {...propsRoute} />
            <IconContact />
            <Footer />
          </>
        );
      }}
    />
  );
};
