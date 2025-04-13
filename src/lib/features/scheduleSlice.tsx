import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleState {
  doctorId: string | undefined;
  timeSlot: string | undefined;
  selectedDate: string | undefined;
}

const initialState: ScheduleState = {
  doctorId: "",
  timeSlot: "",
  selectedDate: "",
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
    updateDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { updateDoctorId, updateTimeSlot, updateDate } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
