import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleState {
  doctorId: string | undefined;
  timeSlot: string | undefined;
  selectedDate: string | undefined;
  appointmentPublicId: string | undefined;
  doctorPricing: string | undefined;
}

const initialState: ScheduleState = {
  doctorId: "",
  timeSlot: "",
  selectedDate: "",
  appointmentPublicId: "",
  doctorPricing: "",
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
    updateAppointmentPublicId: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  updateDoctorId,
  updateTimeSlot,
  updateDate,
  updateAppointmentPublicId,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
