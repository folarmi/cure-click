/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../lib/features/authSlice";

const appReducer = combineReducers({
  auth: authSlice,
});

const rootReducer: Reducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
