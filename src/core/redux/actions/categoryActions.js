import {
  ADD_CATEGORY_FAILED,
  ADD_CATEGORY_REQUESTING,
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_REQUESTING,
  GET_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAILED,
  REMOVE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_REQUESTING,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/categoryConstants";
import { create, getList, removeById, updateById } from "app/const/firebase";
import { getListWithCustomField } from 'app/const/firebase'
export const getCategoryAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_CATEGORY_REQUESTING,
    });

    getList("category")
      .then((response) => {
        dispatch({
          type: GET_CATEGORY_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_CATEGORY_FAILED,
          payload: error,
        });
      });
  };
};

export const addCategoryAction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_CATEGORY_REQUESTING,
    });

    create("category", data)
      .then((response) => {
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
        });

        dispatch(getCategoryAction());
      })
      .catch((error) => {
        dispatch({
          type: ADD_CATEGORY_FAILED,
          payload: error,
        });
      });
  };
};

export const removeProductAction = (id) => {
  return async (dispatch) => {
    removeById("category", id)
      .then((res) => {
        dispatch({
          type: REMOVE_CATEGORY_SUCCESS,
          payload: id,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: REMOVE_CATEGORY_FAILED,
          payload: id,
        });
      });
  };
};

export const updateCategoryAction = (id, payload) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUESTING });

    updateById("category", id, payload)
      .then((response) => {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: {
            id: id,
            dataUpdate: payload,
          },
        });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_CATEGORY_FAILED });

        console.log("error,", error);
      });
  };
};

export const getProductListByCategoryId = (categoryId, typeAction = 'GET_COSMETICS_LIST_BY_CATEGORYID') => {
  return async (dispatch) => {
    getListWithCustomField(
      "product",
      "categoryId",
      categoryId
    )
      .then((response) => {
        dispatch({
          type: typeAction,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          // type: GET_CATEGORY_FAILED,
          // payload: error,
        });
      });
  }
}