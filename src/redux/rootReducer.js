import { combineReducers } from "redux";
import formReducer from "./form/formReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
});

export default rootReducer;
