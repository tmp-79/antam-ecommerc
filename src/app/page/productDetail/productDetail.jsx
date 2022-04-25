// import React, { Component } from "react";
// import ProductContent from "./productContent/productContent";
// import ProductForm from "./productForm/productForm";
// import { getForms } from "../fakeServer/productChaillo";
// import { getProducts } from "../fakeServer/productChaillo";
// import { Toasts } from "../common/toasts/toasts";
// import { CreateToast } from "../utils/createToast";
// import "./productDetail.scss";

// class ProductDetail extends Component {
//   handleSubmit = (value) => {
//     console.log("you have a new order!", value);
//     let state = "";
//     if (value) {
//       state = "success";
//       CreateToast(state, "Thành công! Đã gửi thông tin đặt hàng.");
//     } else {
//       state = "error";
//       CreateToast(state, "Lỗi! Không tin đặt hàng không được gửi đi.");
//     }
//   };

//   constructor() {
//     super();
//     this.state = {
//       forms: getForms(),
//       products: getProducts(),
//     };
//   }

//   render() {
//     const { match, history } = this.props;
//     const { forms, products } = this.state;

//     return (
//       <React.Fragment>
//         <div className="background-page product-detail">
//           <ProductContent id={match.params._id} products={products} />

//           <ProductForm
//             id={match.params._id}
//             forms={forms}
//             onSubmit={this.handleSubmit}
//             history={history}
//           />
//         </div>
//         <Toasts />
//       </React.Fragment>
//     );
//   }
// }

// export default ProductDetail;

import React, { useState, useEffect } from "react";
import ProductContent from "./productContent/productContent";
import ProductForm from "./productForm/productForm";
import { getForms } from "../fakeServer/productChaillo";
import { Toasts } from "../common/toasts/toasts";
import { CreateToast } from "../utils/createToast";
import "./productDetail.scss";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailProductAction } from "core/redux/actions/productActions";
import { addOrderAction } from "core/redux/actions/userActions";

function ProductDetail() {
  const [form, setForm] = useState(getForms());
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { editProduct } = useSelector((state) => state.product);
  const { isValid } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDetailProductAction(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleOrder(value) {
    const DEFAULT_PRODUCT = {
      id: "",
      title: "",
      content: "",
      img: [],
    };

    const buildFormSubmit = {
      name: "",
      phone: "",
      address: "",
      product: DEFAULT_PRODUCT,
      quantity: 0,
      date: Date.now(),
    };

    const payload = {
      ...buildFormSubmit,
      ...value,
      product: editProduct,
    };

    dispatch(addOrderAction(payload));
  }

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="background-page product-detail">
          <ProductContent id={id} product={editProduct} />

          <ProductForm
            id={id}
            forms={form}
            onSubmit={handleOrder}
            history={history}
          />
        </div>
        <Toasts />
      </div>
    </React.Fragment>
  );
}

export default ProductDetail;
