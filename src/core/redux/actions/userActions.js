import { create, getList, removeById } from "app/const/firebase";
import {
  ADD_ORDER_FAILED,
  ADD_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDERS_REQUESTING,
  GET_ORDERS_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/userConstants";

export const loginAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUESTING,
      });

      // If Login success
      setTimeout(() => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            id: 1,
            username: "demo user name",
          },
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error,
      });
    }
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const addOrderAction = (data) => {
  return async (dispatch) => {
    create("order", data)
      .then((response) => {
        dispatch({
          type: ADD_ORDER_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_ORDER_FAILED,
          payload: error,
        });
      });
  };
};

export const getAllOrderAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDERS_REQUESTING,
    });

    getList("order")
      .then((response) => {
        if (response.length) {
          dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: response,
          });
        }
        // if (response.length) {
        //   dispatch({
        //     type: GET_ORDERS_SUCCESS,
        //     payload: response,
        //   });
        // }
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDERS_FAILED,
        });
      });
  };
};

export const deleteOrderAction = (id) => {
  return async (dispatch) => {
    removeById("order", id)
      .then((res) => {
        dispatch({
          type: DELETE_ORDER_SUCCESS,
          payload: id,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: DELETE_ORDER_FAILED,
          payload: id,
        });
      });
  };
};
