import Loading from "app/components/loading";
import LoadingSkeleton from "app/components/loading-skeleton/LoadingSkeleton";
import LoadingSkeletonItem from "app/components/loading-skeleton/LoadingSkeletonItem";
import { getAllProductAction } from "core/redux/actions/productActions";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./listProduct.scss";

const ListProduct = ({ title, products, isLoading }) => {
  return (
    <section className="product-wrap">
      <section className="product">
        {title ? <h2 className="product-title">{title}</h2> : ""}
        {isLoading ? (
          <div className="product-list">
            {Array(12)
              .fill()
              .map((item, index) => (
                <LoadingSkeletonItem key={index}></LoadingSkeletonItem>
              ))}
          </div>
        ) : (
          <div className="product-list">
            {products?.length > 0 &&
              products?.map((item) => (
                <Link
                  to={`/san-pham/${item.id}`}
                  className="product-item"
                  key={item.id}
                >
                  <img src={item.img} alt="" className="product-img" />
                  <div className="product-body">
                    <h4 className="product-name">{item.title}</h4>
                    <p className="product-price">Giá sỉ liên hệ</p>
                    <p className="product-phone">0865328664</p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default ListProduct;
