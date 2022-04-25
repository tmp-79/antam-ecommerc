import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const LoadingSkeletonItem = () => {
  return (
    <div className="product-item product-item--hover">
      <LoadingSkeleton height={"180px"}></LoadingSkeleton>
      <div className="product-body">
        <div className="product-name">
          <LoadingSkeleton height={"10px"}></LoadingSkeleton>
        </div>
        <div className="product-price">
          <LoadingSkeleton height={"10px"}></LoadingSkeleton>
        </div>
        <div className="product-price">
          <LoadingSkeleton height={"10px"}></LoadingSkeleton>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeletonItem;
