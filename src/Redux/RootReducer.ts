import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { authReducer } from "../context/AuthProvider";
import Reducer from "./Slice/Reducer";
import AccountReducer from "./Slice/AccountReducer";



// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["settings"],
};

const rootReducer = combineReducers({
  Reducer: Reducer,
  AccountReducer: AccountReducer,
  auth: authReducer,
});

export { rootPersistConfig, rootReducer };
