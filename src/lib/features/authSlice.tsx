/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = "doctor" | "patient" | "";

interface AuthState {
  userType: UserType;
  publicId: string;
  userObject: any;
  // registrationUserType: UserType
}

const initialState: AuthState = {
  userType: "patient",
  publicId: "",
  userObject: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    setPublicId: (state, action: PayloadAction<string>) => {
      state.publicId = action.payload;
    },
    updateUserObject: (state, action: PayloadAction<string>) => {
      state.userObject = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setUserType, setPublicId, logout, updateUserObject } =
  authSlice.actions;
export default authSlice.reducer;
