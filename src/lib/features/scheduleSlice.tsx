import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleState {
  doctorId: string | undefined;
  timeSlot: string | undefined;
}

const initialState: ScheduleState = {
  doctorId: "",
  timeSlot: "",
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    updateDoctorId: (state, action: PayloadAction<string>) => {
      state.doctorId = action.payload;
    },
    updateTimeSlot: (state, action: PayloadAction<string>) => {
      state.timeSlot = action.payload;
    },
  },
});

export const { updateDoctorId, updateTimeSlot } = scheduleSlice.actions;
export default scheduleSlice.reducer;
