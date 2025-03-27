import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = "doctor" | "patient" | "";

interface AuthState {
  userType: UserType;
  // registrationUserType: UserType
}

const initialState: AuthState = {
  userType: "patient",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setUserType, logout } = authSlice.actions;
export default authSlice.reducer;
