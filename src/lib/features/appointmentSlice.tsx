import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppointmentUIState {
  modal: boolean;
  cancelAppointment: boolean;
  cancelledDetails: boolean;
  upcomingDetails: boolean;
  rescheduleModal: boolean;
  rescheduleModalTwo: boolean;
  completedAppointment: boolean;
  meetingCardTwoModal: boolean;
}

const initialState: AppointmentUIState = {
  modal: false,
  cancelAppointment: false,
  cancelledDetails: false,
  upcomingDetails: false,
  rescheduleModal: false,
  rescheduleModalTwo: false,
  completedAppointment: false,
  meetingCardTwoModal: false,
};

const appointmentUiSlice = createSlice({
  name: "appointmentUI",
  initialState,
  reducers: {
    toggleModal(state) {
      state.modal = !state.modal;
    },
    toggleCancelAppointment(state) {
      state.cancelAppointment = !state.cancelAppointment;
    },
    toggleCancelledDetails(state) {
      state.cancelledDetails = !state.cancelledDetails;
    },
    toggleUpcomingDetails(state) {
      state.upcomingDetails = !state.upcomingDetails;
    },
    toggleRescheduleModal(state) {
      state.rescheduleModal = !state.rescheduleModal;
    },
    toggleRescheduleModalTwo(state) {
      state.rescheduleModalTwo = !state.rescheduleModalTwo;
    },
    toggleCompletedAppointment(state) {
      state.completedAppointment = !state.completedAppointment;
    },
    toggleMeetingCardTwo(state) {
      state.meetingCardTwoModal = !state.meetingCardTwoModal;
    },
    setMeetingCardTwoToFalse: (state, action: PayloadAction<boolean>) => {
      state.meetingCardTwoModal = action.payload;
    },
    resetAppointmentUI(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  toggleModal,
  toggleCancelAppointment,
  toggleCancelledDetails,
  toggleUpcomingDetails,
  toggleRescheduleModal,
  toggleRescheduleModalTwo,
  toggleCompletedAppointment,
  toggleMeetingCardTwo,
  setMeetingCardTwoToFalse,
  resetAppointmentUI,
} = appointmentUiSlice.actions;

export default appointmentUiSlice.reducer;
