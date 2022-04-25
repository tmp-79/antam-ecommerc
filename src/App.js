import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "app/page/products/product";
import Home from "app/page/home";
import ProductDetail from "./app/page/productDetail/productDetail";
import { Contact } from "app/page/contact";
import ScrollToTop from "app/page/utils/ScrollToTop";
import NotFound from "app/page/notFound/NotFound";
import LoginPage from "app/page/login/login";
import Form from "app/page/common/form";
import { PublicPage } from "HOC/publicPage";
import { PrivatePage } from "HOC/privatePage";
import Admin from "app/page/admin";

function App() {
  return (
    <React.Fragment>
      <ScrollToTop />

      <Switch>
        {/* Trang Public */}
        <PublicPage path="/" exact Component={Home} />
        <PublicPage path="/san-pham/:id" exact Component={ProductDetail} />
        <PublicPage path="/form" exact Component={Form} />
        <PublicPage path="/lien-he" exact Component={Contact} />
        <PublicPage path="/dang-nhap" exact Component={LoginPage} />
        <PublicPage path="/loai-san-pham/:categoryId" Component={Products} />

        {/* Trang admin */}
        <PrivatePage path="/admin" component={Admin} />
        
        {/* Nếu tất cả các path trên không đủng nhảy vào not found page */}
        <Route path="*" component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
