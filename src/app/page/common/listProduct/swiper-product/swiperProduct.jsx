import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import "./swiperProduct.scss";
import { SwiperSlide, Swiper } from "swiper/react/swiper-react";
import LoadingSkeletonItem from "app/components/loading-skeleton/LoadingSkeletonItem";

const SwiperProduct = (props) => {
  const { products, name } = props.data;
  const isLoading = props.isLoading
  return (
    <Fragment>
      <h2 className="product-title">{name }</h2>
      <div className="product-home__list">
        {isLoading ? (
          <div className="product-list product-list__loading">
            {Array(5)
              .fill()
              .map((item, index) => (
                <LoadingSkeletonItem key={index}></LoadingSkeletonItem>
              ))}
          </div>
        ) : (
          <Swiper
            spaceBetween={12}
            grabCursor={"true"}
            slidesPerView={"auto"}
            className="product-home__wrap"
          >
            {products?.map((item) => {
              return (
                <SwiperSlide className="product product-home" key={item.id}>
                  <Link to={`/san-pham/${item.id}`}>
                    <div className="">
                      <div
                        className="product-item product-home__item"
                        key={item.id}
                      >
                        <img src={item.img} alt="" className="product-img" />
                        <div className="product-body">
                          <h4 className="product-name">{item.title}</h4>
                          <p className="product-price">Giá sỉ liên hệ</p>
                          <p className="product-phone">0865328664</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </Fragment>
  );
};

export default SwiperProduct;
