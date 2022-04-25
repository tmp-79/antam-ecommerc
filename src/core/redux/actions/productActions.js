import {
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_REQUESTING,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILED,
  EDIT_PRODUCT_REQUESTING,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_REQUESTING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAIL_FAILED,
  GET_PRODUCT_DETAIL_REQUESTING,
  GET_PRODUCT_DETAIL_SUCCESS,
} from "../constants/productConstants";

import {
  create,
  getDocById,
  getList,
  removeById,
  updateById,
} from "app/const/firebase";
import { CODE_SUCCESS } from "app/const/Api";

export const addProductAction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_REQUESTING,
    });

    create("product", data)
      .then((response) => {
        dispatch({
          type: ADD_PRODUCT_SUCCESS,
          payload: data,
        });

        dispatch(getAllProductAction());

        // CreateToast("success", "Tạo thông tin thành công.");
      })
      .catch((error) => {
        dispatch({
          type: ADD_PRODUCT_FAILED,
          payload: error,
        });
        // CreateToast("error", "Tạo thông tin thất bại.");
      });
  };
};

export const deleteProductAction = (id) => {
  return async (dispatch) => {
    removeById("product", id)
      .then((res) => {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: id,
        });

        // dispatch(getAllProductAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: DELETE_PRODUCT_FAILED,
          payload: id,
        });
      });
  };
};

export const getAllProductAction = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_PRODUCTS_REQUESTING,
    });
    getList("product")
      .then((response) => {
        if (response.length) {
          dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PRODUCTS_FAILED,
          payload: error,
        });
      });
  };
};

export const editProductAction = (id, payload) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_PRODUCT_REQUESTING });

    updateById("product", id, payload)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCT_SUCCESS,
          payload: {
            id: id,
            dataUpdate: payload,
          },
        });
      })
      .catch((error) => {
        dispatch({ type: EDIT_PRODUCT_FAILED });

        console.log("error,", error);
      });
  };
};

export const getDetailProductAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_PRODUCT_DETAIL_REQUESTING,
    });
    getDocById("product", id)
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_DETAIL_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_PRODUCT_DETAIL_FAILED,
          payload: error,
        });
      });
  };
};
