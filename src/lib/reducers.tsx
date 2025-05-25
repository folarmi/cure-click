/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../lib/features/authSlice";
import scheduleSlice from "../lib/features/scheduleSlice";
import appointmentUiSlice from "../lib/features/appointmentSlice";

const appReducer = combineReducers({
  auth: authSlice,
  schedule: scheduleSlice,
  appointmentUI: appointmentUiSlice,
});

const rootReducer: Reducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
