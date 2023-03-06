import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth/userAuthSlice.js";

const reducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;
