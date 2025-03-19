import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = "doctor" | "patient" | "";

interface AuthState {
  userType: UserType;
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
  },
});

export const { setUserType } = authSlice.actions;
export default authSlice.reducer;
