/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex } from "@radix-ui/themes";
import { CustomText } from "../../components/ui/CustomText";

import Modal from "../../components/ui/Modal";
import { RescheduleTwo } from "../../components/modals/RescheduleTwo";
import { Reschedule } from "../../components/modals/Reschedule";
import { CancelAppointmentTwo } from "../../components/modals/CancelAppointmentTwo";
import CancelAppointment from "../../components/modals/CancelAppointment";
import CompletedAppointment from "../../components/modals/CompletedAppointment";
import { MeetingTwoDetailsCard } from "../../components/modals/MeetingTwoDetailsCard";
import AppointmentDetails from "../../components/modals/AppointmentDetails";
import { useState } from "react";
import { sortUpcomingAppointments } from "../../utils/calendarutil";
import { Appointment } from "../../utils/types";
import { UpcomingAppointment } from "../../components/modals/UpcomingAppointment";
import { UpComingAppointments } from "../../components/ui/UpComingAppointments";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerToggleCancelAppointment,
  triggerToggleCompletedAppointment,
  triggerToggleMeetingCardTwo,
  triggerToggleModal,
  triggerToggleRescheduleModal,
  triggerToggleRescheduleModalTwo,
  triggerToggleUpcomingDetails,
} from "../../utils/toggleFunctions";
import { RootState } from "../../lib/store";
import { setMeetingCardTwoToFalse } from "../../lib/features/appointmentSlice";

type Prop = {
  appointmentsData: any;
  selectedAppointment: Appointment;
};

const ModuleContent = ({ appointmentsData, selectedAppointment }: Prop) => {
  const dispatch = useDispatch();
  const [meetingTwoCancel, setMeetingTwoCancel] = useState(false);
  const {
    modal,
    cancelAppointment,
    cancelledDetails,
    upcomingDetails,
    rescheduleModal,
    rescheduleModalTwo,
    completedAppointment,
    meetingCardTwoModal,
  } = useSelector((state: RootState) => state.appointmentUI);
  const sortedAppointments = sortUpcomingAppointments(appointmentsData);

  const toggleMeetingTwoCancel = () => {
    if (meetingCardTwoModal) {
      dispatch(setMeetingCardTwoToFalse(false));
    }
    setMeetingTwoCancel(!meetingTwoCancel);
  };
  return (
    <Flex className="flex-col md:flex-row">
      <Box>
        <div>
          <CustomText className="text-gray_12" size="large" weight="semibold">
            Upcoming Appointments
          </CustomText>
          <CustomText
            className="text-gray_11 pb-4"
            size="medium"
            weight="normal"
          >
            View your upcoming appointments.
          </CustomText>
        </div>

        <UpComingAppointments
          toggleCancel={() => triggerToggleCancelAppointment(dispatch)}
          toggleMeetingCardTwoModal={() =>
            triggerToggleMeetingCardTwo(dispatch)
          }
          toggleModal={() => triggerToggleModal(dispatch)}
          toggleRescheduleModal={() => triggerToggleRescheduleModal(dispatch)}
        />
      </Box>

      {/* Pending and Active Appointment Details Page */}
      <Modal show={modal} toggleModal={() => triggerToggleModal(dispatch)}>
        <div className="p-4">
          <AppointmentDetails
            toggleModal={() => triggerToggleModal(dispatch)}
            selectedAppointment={selectedAppointment}
            toggleCancel={() => triggerToggleCancelAppointment(dispatch)}
          />
        </div>
      </Modal>

      <Modal
        show={meetingCardTwoModal}
        toggleModal={() => triggerToggleMeetingCardTwo(dispatch)}
      >
        <div className="p-4">
          <MeetingTwoDetailsCard
            toggleModal={() => triggerToggleMeetingCardTwo(dispatch)}
            toggleMeetingTwoCancel={toggleMeetingTwoCancel}
            selectedAppointment={selectedAppointment}
          />
        </div>
      </Modal>

      {/* Completed Appointment Details Page */}
      <Modal
        show={completedAppointment}
        toggleModal={() => triggerToggleCompletedAppointment(dispatch)}
      >
        <div className="p-4">
          <CompletedAppointment
            toggleModal={() => triggerToggleCompletedAppointment(dispatch)}
            selectedAppointment={selectedAppointment}
          />
        </div>
      </Modal>

      {/* Cancelled Appointment Details Page */}
      <Modal
        show={cancelledDetails}
        toggleModal={() => triggerToggleCancelAppointment(dispatch)}
      >
        <div className="p-4">
          <CompletedAppointment
            toggleModal={() => triggerToggleCancelAppointment(dispatch)}
            ifCompleted={false}
            selectedAppointment={selectedAppointment}
          />
        </div>
      </Modal>

      {/* Upcoming Appointment Details Page */}
      <Modal
        show={upcomingDetails}
        toggleModal={() => triggerToggleUpcomingDetails(dispatch)}
      >
        <div className="p-4">
          <UpcomingAppointment
            toggleModal={() => triggerToggleUpcomingDetails(dispatch)}
            selectedAppointment={selectedAppointment}
            toggleCancel={() => triggerToggleCancelAppointment(dispatch)}
            toggleRescheduleModal={() => triggerToggleRescheduleModal(dispatch)}
            // toggleRescheduleTwoModal={toggleRescheduleTwoModal}
          />
        </div>
      </Modal>

      <Modal
        show={cancelAppointment}
        toggleModal={() => triggerToggleCancelAppointment(dispatch)}
      >
        <div className="p-4">
          <CancelAppointment
            toggleModal={() => triggerToggleCancelAppointment(dispatch)}
            details={sortedAppointments?.[0]}
          />
        </div>
      </Modal>

      <Modal show={meetingTwoCancel} toggleModal={toggleMeetingTwoCancel}>
        <div className="p-4">
          <CancelAppointmentTwo toggleModal={toggleMeetingTwoCancel} />
        </div>
      </Modal>

      <Modal
        show={rescheduleModal}
        toggleModal={() => triggerToggleRescheduleModal(dispatch)}
      >
        <div className="p-4">
          <Reschedule
            // details={sortedAppointments?.[0] || selectedAppointment} - find a fix for passing the selected appointment to the blue/green card on the left
            details={selectedAppointment}
            toggleModal={() => triggerToggleRescheduleModal(dispatch)}
          />
        </div>
      </Modal>

      {/* Request Rescheduled Details Page */}
      <Modal
        show={rescheduleModalTwo}
        toggleModal={() => triggerToggleRescheduleModalTwo(dispatch)}
      >
        <div className="p-4">
          <RescheduleTwo
            toggleModal={() => triggerToggleRescheduleModalTwo(dispatch)}
            toggleRescheduleModal={() => triggerToggleRescheduleModal(dispatch)}
            toggleCancel={() => triggerToggleCancelAppointment(dispatch)}
            details={selectedAppointment}
          />
        </div>
      </Modal>
    </Flex>
  );
};

export { ModuleContent };
