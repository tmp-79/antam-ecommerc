import React from "react";
import { Footer } from "app/components/footer";
import Header from "app/components/header";
// import { Navbar } from "app/components/navbar";
import { Route } from "react-router-dom";
import ListGroup from "app/page/common/listGroup";

export const PrivatePage = ({ Component, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <>
            <Component {...propsRoute} />
            {/* <Navbar /> */}

          </>
        );
      }}
    />
  );
};
