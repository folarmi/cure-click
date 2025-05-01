import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = "doctor" | "patient" | "";

interface AuthState {
  userType: UserType;
  publicId: string;
  // registrationUserType: UserType
}

const initialState: AuthState = {
  userType: "patient",
  publicId: "",
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
    logout: () => {
      return initialState;
    },
  },
});

export const { setUserType, setPublicId, logout } = authSlice.actions;
export default authSlice.reducer;
