import {
  GET_CATEGORY_FAILED,
  GET_CATEGORY_REQUESTING,
  GET_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAILED,
  REMOVE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_REQUESTING,
  UPDATE_CATEGORY_SUCCESS,
  GET_COSMETICS_LIST_BY_CATEGORYID,
  GET_PET_LIST_BY_CATEGORYID,
  GET_BOX_LIST_BY_CATEGORYID,
  GET_PRINT_LIST_BY_CATEGORYID,
  GET_BOTTLE_LIST_BY_CATEGORYID
} from "../constants/categoryConstants";

const initialState = {
  isLoading: false,
  categoryList: [],
  productPets: [],
  productPrints: [],
  productBottles: [],
  productCosmetics: [],
  productBoxs: []
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUESTING: {
      state.isLoading = true;
      return { ...state };
    }

    case GET_CATEGORY_SUCCESS: {
      state.isLoading = false;
      state.categoryList = action.payload;
      return { ...state };
    }

    case GET_CATEGORY_FAILED: {
      state.isLoading = false;
      state.categoryList = [];
      return { ...state };
    }
    case REMOVE_CATEGORY_SUCCESS: {
      let result = [...state.categoryList];
      const index = result.findIndex((y) => y.id === action.payload);

      if (index !== -1) {
        result.splice(index, 1);
      }

      state.categoryList = result;

      return { ...state };
    }

    case REMOVE_CATEGORY_FAILED: {
      state.isLoading = false;
      state.categoryList = [];
      return { ...state };
    }

    case UPDATE_CATEGORY_REQUESTING: {
      state.isLoading = true;
      return { ...state };
    }

    case UPDATE_CATEGORY_SUCCESS: {
      state.isLoading = false;
      let result = [...state.categoryList];
      const index = result.findIndex((y) => y.id === action.payload.id);

      if (index !== -1) {
        result[index] = {
          ...result[index],
          ...action.payload.dataUpdate,
        };
      }

      state.categoryList = result;
      return { ...state };
    }

    case UPDATE_CATEGORY_FAILED: {
      state.loading = false;
      return { ...state };
    }

    case GET_COSMETICS_LIST_BY_CATEGORYID: {
      state.productCosmetics = action.payload;
      return { ...state };
    }

    case GET_PET_LIST_BY_CATEGORYID: {
      state.productPets = action.payload
      return { ...state }
    }

    case GET_BOX_LIST_BY_CATEGORYID: {
      state.productBoxs = action.payload
      return { ...state }
    }
    case GET_PRINT_LIST_BY_CATEGORYID: {
      state.productPrints = action.payload
      return { ...state }
    }
    case GET_BOTTLE_LIST_BY_CATEGORYID: {
      state.productBottles = action.payload
      return { ...state }
    }

    default: {
      return { ...state };
    }
  }
};
