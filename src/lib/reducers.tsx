/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../lib/features/authSlice";
import scheduleSlice from "../lib/features/scheduleSlice";

const appReducer = combineReducers({
  auth: authSlice,
  schedule: scheduleSlice,
});

const rootReducer: Reducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
