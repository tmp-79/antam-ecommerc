import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { ADD_PRODUCT, EDIT_PRODUCT } from "./constants";
import Modal from "app/page/common/modal";
import Table from "app/page/common/table";

import "../styles/allProducts.scss";

const AllProducts = ({ products, columns, products: data }) => {
  console.log(products,data)
  return (
    <section className="product-section">
      <Table heading="Sản Phẩm" columns={columns} data={data} />

      <Switch>
        <Route
          path="/admin/tat-ca-san-pham/them-san-pham"
          render={(props) => (
            <Modal
              products={products}
              heading={"Thêm sản phẩm"}
              type={ADD_PRODUCT}
              {...props}
            />
          )}
        />

        {/* routing to edit a product */}
        <Route
          path="/admin/tat-ca-san-pham/sua-san-pham/:id"
          render={(props) => (
            <Modal
              products={products}
              heading={"Sửa sản phẩm"}
              type={EDIT_PRODUCT}
              {...props}
            />
          )}
        />
      </Switch>
    </section>
  );
};

export default AllProducts;
