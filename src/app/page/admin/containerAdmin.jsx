import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { icons } from "assets/icons/icons-svg";
import Table from "app/page/common/table";
import ListGroup from "app/page/common/listGroup";
import AllProducts from "app/page/admin/admin-page/allProducts";
import Delete from "../common/delete";
import NotFound from "../notFound/NotFound";
import "./styles/containerAdmin.scss";

class ContainerAdmin extends Component {
  columns = {
    order: [
      { value: "_id", label: "id" },
      { value: "customer", label: "customer name" },
      { value: "products", label: "product name" },
      { value: "date", label: "date" },
      { value: "state", label: "state" },
      {
        key: "1233",
        content: (item) => (
          <Delete item={item} list="orders" onDelete={this.props.onDelete} />
        ),
      },
    ],
    allProducts: [
      { value: "title", label: "Title" },
      { value: "content", label: "Content" },
      {
        key: "13233",
        content: (item) => (
          <Link to={`/admin/all-products/${item._id}`} className=" btn-edit">
            {icons.iconEdit}
          </Link>
        ),
      },
      {
        key: "6233",
        content: (item) => (
          <Delete item={item} list="products" onDelete={this.props.onDelete} />
        ),
      },
    ],
  };

  render() {
    const { products, orders, isLoading } = this.props;

    return (
      <main className="container container-admin">
        <ListGroup />

        <Switch>
          {/* <Route path="/admin" render={(props) => (
            <AllProducts
              products={products}
              columns={this.columns.allProducts}
              {...props}
              onDelete={this.props.onDelete}
            />
          )} /> */}
          <Route
            path="/admin/don-hang"
            render={(props) => (
              <Table
                heading={"Đơn Hàng"}
                columns={this.columns.order}
                data={orders}
                isLoading={isLoading}
                {...props}
              />
            )}
          />
          <Route
            path="/admin/tat-ca-san-pham"
            render={(props) => (
              <>
                <AllProducts
                  products={products}
                  columns={this.columns.allProducts}
                  onDelete={this.props.onDelete}
                  {...props}
                />
              </>
            )}
          />
          <Route
            path="/admin/tat-ca-san-pham"
            render={(props) => (
              <AllProducts
                products={products}
                columns={this.columns.allProducts}
                {...props}
                onDelete={this.props.onDelete}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default ContainerAdmin;
