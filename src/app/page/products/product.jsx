import React, { Component } from "react";
import ProductContainer from "./productContainer/productContainer";
import _ from "lodash";
import "./product.scss";
import {
  getListWithCondition,
  getListWithCustomField,
} from "app/const/firebase";

import EmptyProduct from "./empty-product/EmptyProduct";
class Product extends Component {
  state = {
    products: [],
    pageSize: 8,
    currentPage: 1,
    sortProduct: { id: "asc322ssa21", order: "asc", path: "title" },
    isLoading: false,
  };

  buttons = [
    {
      id: "asc322ssa21",
      title: "A - Z",
      path: "title",
      order: "asc",
    },
    {
      id: "asc32ss1af1",
      title: "Z - A",
      path: "title",
      order: "desc",
    },
  ];

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSortProduct = (sortProduct) => {
    getListWithCondition("product", {
      compare: {
        field: "categoryId",
        value: this.props.match.params.categoryId,
      },
      sort: {
        field: "title",
        type: sortProduct.order,
      },
    })
      .then((res) => {
        this.setState({
          products: res,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
    this.setState({ sortProduct });
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    getListWithCustomField(
      "product",
      "categoryId",
      this.props.match.params.categoryId
    )
      .then((res) => {
        this.setState({
          products: res,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.categoryId !== this.props.match.params.categoryId
    ) {
      this.setState({
        isLoading: true,
      });
      getListWithCustomField(
        "product",
        "categoryId",
        nextProps.match.params.categoryId
      )
        .then((res) => {
          this.setState({
            products: res,
          });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    const { products, currentPage, pageSize, sortProduct } = this.state;

    const { length: itemsCount } = products;

    const sorted = _.orderBy(products, [sortProduct.path], [sortProduct.order]);

    // const allProduct = paginate(sorted, currentPage, pageSize);

    return (
      <div className="background-page product">
        {/* <Filter
          sortProduct={sortProduct}
          buttons={this.buttons}
          onSort={this.handleSortProduct}
        /> */}


        {
          (this.state.products.length <= 0) ? <EmptyProduct /> : (
            <ProductContainer
              products={this.state.products}
              itemsCount={itemsCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              isLoading={this.state.isLoading}
            />
          )
        }

      </div>
    );
  }
}

export default Product;
