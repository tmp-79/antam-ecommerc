import React, { Component, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/thumbs/thumbs.min.css";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "./productContent.scss";

// class ProductContent extends Component {
//   render() {
//     const { product } = this.props;
//     console.log("product", product.img);

//     return (
//       <>
//         {product && (
//           <div className="row product-content" image="true">
//             <div className="image col-lg-6 col-md-6 col-xs-12">
//               <div className="wrapper">
//                 <img src={product?.img} alt="" />
//               </div>
//             </div>
//             <div className="content col-lg-6 col-md-6 col-xs-12">
//               <div className="wrapper">
//                 <h2>{product?.title}</h2>
//                 <p>{product?.content}</p>
//                 <h4>
//                   <p>Liên hệ số điện thoại:</p> <span>0865.328.664</span>
//                 </h4>
//                 <a href="#form-section" className="btn">
//                   Nhập thông tin đặt hàng
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }
// }

// export default ProductContent;

const productContent = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  return (
    <section className="product-wrapper">
      <div className="wrapper">
        <div className="product-content">
          <Swiper
            style={{
              "--swiper-navigation-color": "#Fff",
              "--swiper-pagination-color": "#fff",
            }}
            // loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 product-image__show"
          >
            {props.product?.img?.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={item} alt="" className="product-img__show" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            // loop={true}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper product-img__wrap"
          >
            {props.product?.img?.map((item, idx) => {
              return (
                <SwiperSlide key={idx} className="product-sub__img-slide">
                  <img src={item} alt="" className="product-sub__img" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="product-intro">
          <h2 className="product-intro__title">{props.product?.title}</h2>
          <p className="product-intro__desc">{props.product?.content}</p>
          <p className="product-intro__contact">
            Liên hệ: <span>0865.328.664</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default productContent;
