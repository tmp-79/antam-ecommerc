import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import {
  deleteProductAction,
  getAllProductAction,
} from "core/redux/actions/productActions";
import { getCategoryAction } from "core/redux/actions/categoryActions";
import { getAllOrderAction } from "core/redux/actions/userActions";
import AdminLogin from "./admin-page/adminLogin";
import { Switch } from "react-router-dom";
import ListGroup from "app/page/common/listGroup";
import AllProducts from "app/page/admin/admin-page/allProducts";
import NotFound from "../notFound/NotFound";
import TableOrder from "../common/tableOrder";
import Category from "./admin-page/category/Category";
import CategoryForm from "./admin-page/category/action/CategoryForm";
import "./styles/containerAdmin.scss";

function Admin() {
  const dispatch = useDispatch();
  const loggedIn = true;
  const [customers, setCustomers] = useState([]);
  const { productList } = useSelector((state) => state.product);
  const { orderList } = useSelector((state) => state.user);
  const columns = {
    order: [
      { value: "customer", label: "Tên khách hàng" },
      { value: "products", label: "Sản phẩm" },
      { value: "quantity", label: "Số lượng" },
      { value: "date", label: "Ngày gửi" },
      { value: "action", label: "Thao tác" },
    ],
    allProducts: [
      {
        value:"Stt",label:"STT"
      },
      { value: "title", label: "Tên sản phẩm" },
      {
        value: "category", label: "Phân loại"
      },
      { value: "content", label: "Mô tả sản phẩm" },
      { value: "url", label: "Hình ảnh" },
      // { value: 'category', label: "Phan loai" },
      { value: "action", label: "Thao tác" },
    ],
  };
  // Loading api lần đầu tiên vào trang admin
  useEffect(() => {
    dispatch(getAllProductAction());
    dispatch(getAllOrderAction());
    dispatch(getCategoryAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Redirect to="/admin/tat-ca-san-pham" component={AllProducts} />
      <main className=" container-admin">
        <ListGroup />
        <Switch>
          {/* <Route path='/admin/dang-nhap' component={AdminLogin} /> */}
          {/* <ContainerAdmin
          products={productList}
          orders={orderList}
          customers={customers}
        /> */}

          <Route
            path="/admin/don-hang"
            render={(props) => (
              <TableOrder
                heading={"Đơn Hàng"}
                columns={columns.order}
                data={orderList}
                isLoading={customers}
                {...props}
              />
            )}
          />
          <Route path="/admin/phan-loai-san-pham" component={Category} />
          <Route
            path="/admin/tat-ca-san-pham"
            render={(props) => (
              <AllProducts
                products={productList}
                columns={columns.allProducts}
                {...props}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

export default Admin;

/**
 * <div className="main-login" >
          <div className="form-login">
            <div className="main-logo d-flex justify-content-center" >
              <div>
                <img src={logoMain} alt="" />
              </div>
            </div>
            <form className="">
              <div className="form-group">
                <label className="label">Tài khoản</label>
                <input name='username' onChange={handleChange} className='form-control' type="text" />
              </div>
              <div className="form-group">
                <label className="label">Mật khẩu</label>
                <input name='password' onChange={handleChange} className='form-control' type="password" />


              </div>
              <div className="btn-action d-flex justify-content-center">
                <button type='button' className="btn-login" onClick={handleLoginAdmin}>Đăng nhập</button>
              </div>
            </form>
          </div>
        </div>
 */
