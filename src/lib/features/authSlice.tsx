import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = "doctor" | "patient" | "";

interface AuthState {
  userType: UserType;
  value: 0;
}

const initialState: AuthState = {
  userType: "doctor",
  value: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;
export default authSlice.reducer;
