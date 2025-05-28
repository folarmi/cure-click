import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleState {
  doctorId: string | undefined;
  timeSlot: string | undefined;
  selectedDate: string | undefined;
  appointmentPublicId: string | undefined;
  doctorPricing: string | undefined;
  appointmentDetails: string | undefined;
  appointmentTopic: string | undefined;
}

const initialState: ScheduleState = {
  doctorId: "",
  timeSlot: "",
  selectedDate: "",
  appointmentPublicId: "",
  doctorPricing: "",
  appointmentDetails: "",
  appointmentTopic: "",
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
    updateAppointmentDetails: (state, action: PayloadAction<string>) => {
      state.appointmentDetails = action.payload;
    },
    updateAppointmentTopic: (state, action: PayloadAction<string>) => {
      state.appointmentTopic = action.payload;
    },
  },
});

export const {
  updateDoctorId,
  updateTimeSlot,
  updateDate,
  updateAppointmentPublicId,
  updateAppointmentDetails,
  updateAppointmentTopic,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
