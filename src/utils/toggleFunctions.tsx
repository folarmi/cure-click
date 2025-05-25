import {
  toggleCancelAppointment,
  toggleCancelledDetails,
  toggleCompletedAppointment,
  toggleMeetingCardTwo,
  toggleModal,
  toggleRescheduleModal,
  toggleRescheduleModalTwo,
  toggleUpcomingDetails,
} from "../lib/features/appointmentSlice";
import { AppDispatch } from "../lib/store";

export const triggerToggleModal = (dispatch: AppDispatch) => {
  dispatch(toggleModal());
};

export const triggerToggleCancelAppointment = (dispatch: AppDispatch) => {
  dispatch(toggleCancelAppointment());
};

export const triggerToggleCancelledDetails = (dispatch: AppDispatch) => {
  dispatch(toggleCancelledDetails());
};

export const triggerToggleUpcomingDetails = (dispatch: AppDispatch) => {
  dispatch(toggleUpcomingDetails());
};

export const triggerToggleRescheduleModal = (dispatch: AppDispatch) => {
  dispatch(toggleRescheduleModal());
};

export const triggerToggleRescheduleModalTwo = (dispatch: AppDispatch) => {
  dispatch(toggleRescheduleModalTwo());
};

export const triggerToggleCompletedAppointment = (dispatch: AppDispatch) => {
  dispatch(toggleCompletedAppointment());
};

export const triggerToggleMeetingCardTwo = (dispatch: AppDispatch) => {
  dispatch(toggleMeetingCardTwo());
};
