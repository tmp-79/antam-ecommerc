// import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
// import ListGroup from "app/page/common/listGroup";
// import AllProducts from "app/page/admin/admin-page/allProducts";
// import NotFound from "../notFound/NotFound";
// import "./styles/containerAdmin.scss";
// import TableOrder from "../common/tableOrder";
// import Category from './admin-page/category/Category'
// import CategoryForm from "./admin-page/category/action/CategoryForm";
// class ContainerAdmin extends Component {
//   columns = {
//     order: [
//       { value: "customer", label: "Tên khách hàng" },
//       { value: "products", label: "Sản phẩm" },
//       { value: "quantity", label: "Số lượng" },
//       { value: "date", label: "Ngày gửi" },
//       { value: "action", label: "Thao tác" },
//     ],
//     allProducts: [
//       { value: "title", label: "Tên sản phẩm" },
//       { value: "content", label: "Mô tả sản phẩm" },
//       { value: "url", label: "Hình ảnh" },
//       { value: "action", label: "Thao tác" },
//     ],
//   };

//   render() {
//     const { products, orders, isLoading } = this.props;

//     return (
//       <main className="container container-admin">
//         <ListGroup />
//         <Switch>
//           <Route
//             path="/admin/don-hang"
//             render={(props) => (
//               <TableOrder
//                 heading={"Đơn Hàng"}
//                 columns={columns.order}
//                 data={orders}
//                 isLoading={isLoading}
//                 {...props}
//               />
//             )}
//           />
//           <Route path="/admin/phan-loai-san-pham" component={Category}/>
//           <Route path="/admin/phan-loai-san-pham/them-san-pham" component={CategoryForm} />
//           <Route
//             path="/admin/tat-ca-san-pham"
//             render={(props) => (
//               <AllProducts
//                 products={products}
//                 columns={this.columns.allProducts}
//                 onDelete={this.props.onDelete}
//                 {...props}
//               />
//             )}
//           />

//           <Route component={NotFound} />
//         </Switch>
//       </main>
//     );
//   }
// }

// export default ContainerAdmin;
