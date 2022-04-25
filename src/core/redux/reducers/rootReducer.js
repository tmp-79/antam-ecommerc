import { combineReducers } from "redux";

// Import Redcucers
import { UserReducer } from "./userReducer";
import { ProductReducer } from "./productReducer";
import { CategoryReducer } from "./categoryReducer";

export const rootReducer = combineReducers({
  user: UserReducer,
  product: ProductReducer,
  category: CategoryReducer,
});
