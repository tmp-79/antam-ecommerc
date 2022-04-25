import React, { useEffect, useState } from "react";
import ListProduct from "app/page/common/listProduct/listProduct";
import { useDispatch } from "react-redux";
import { getAllProductAction } from "core/redux/actions/productActions";
import "./productContainer.scss";

const ProductContainer = (props) => {
  const { products: allProduct, isLoading } = props;

  return (
    <div className="wrapper">
      <div className="product-container">
        <ListProduct products={allProduct} isLoading={isLoading} />
        {/* <Pagination
                currentPage={currentPage}
                itemsCount={itemsCount}
                onPageChange={onPageChange}
                pageSize={pageSize}
            /> */}
      </div>
    </div>
  );
};

export default ProductContainer;
