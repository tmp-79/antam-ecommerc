import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SwiperProduct from "../common/listProduct/swiper-product/swiperProduct";
import NewSlide from "./new-slide/NewSlide";
import { getListWithCustomField } from "app/const/firebase"
import "./Home.scss";

function Home() {
  const { categoryList } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false)
  let count = 0;
  if (categoryList.length > 0) {
    categoryList.forEach((item) => {
      getListWithCustomField(
        "product",
        "categoryId",
        item.id
      )
        .then((res) => {
          item.products = res;
          count++;
          if (count === 5) {
            setTimeout(() => setLoading(true), 0)
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          count = 0;
        })
    });
  }

  return (
    <Fragment>
      <div className="wrapper content-wrapper">
        <NewSlide></NewSlide>
        {loading ? categoryList?.map((item, index) => (
          <SwiperProduct isLoading={false} data={item} key={index} />
        )) : (
          categoryList?.map((item, index) =>
            <SwiperProduct isLoading={true} data={item} key={index} />
          )
        )}
      </div>
    </Fragment>
  );
}

export default Home;
