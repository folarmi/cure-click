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

type Prop = {
  appointmentsData: any;
  modal: boolean;
  cancelAppointment: boolean;
  cancelledDetails: boolean;
  upcomingDetails: boolean;
  rescheduleModal: boolean;
  rescheduleModalTwo: boolean;
  toggleModal: () => void;
  toggleCancel: () => void;
  toggleCancelledDetails: () => void;
  toggleUpcomingDetails: () => void;
  toggleRescheduleModal: () => void;
  toggleRescheduleTwoModal: () => void;
  selectedAppointment: Appointment;
};

const ModuleContent = ({
  appointmentsData,
  modal,
  cancelAppointment,
  selectedAppointment,
  cancelledDetails,
  upcomingDetails,
  rescheduleModalTwo,
  rescheduleModal,
  toggleModal,
  toggleCancel,
  toggleUpcomingDetails,
  toggleCancelledDetails,
  toggleRescheduleTwoModal,
  toggleRescheduleModal,
}: Prop) => {
  const [meetingCardTwoModal, setMeetingCardTwoModal] = useState(false);
  const [completedAppointment, setCompletedAppointment] = useState(false);
  const [meetingTwoCancel, setMeetingTwoCancel] = useState(false);

  const sortedAppointments = sortUpcomingAppointments(appointmentsData);

  const toggleMeetingCardTwoModal = () => {
    setMeetingCardTwoModal(!meetingCardTwoModal);
  };

  const toggleCompletedAppointment = () => {
    setCompletedAppointment(!completedAppointment);
  };

  const toggleMeetingTwoCancel = () => {
    if (meetingCardTwoModal) {
      setMeetingCardTwoModal(false);
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
          sortedAppointments={sortedAppointments}
          toggleCancel={toggleCancel}
          toggleMeetingCardTwoModal={toggleMeetingCardTwoModal}
          toggleModal={toggleModal}
          toggleRescheduleModal={toggleRescheduleModal}
        />
      </Box>

      {/* Pending and Active Appointment Details Page */}
      <Modal show={modal} toggleModal={toggleModal}>
        <div className="p-4">
          <AppointmentDetails
            toggleModal={toggleModal}
            selectedAppointment={selectedAppointment}
            toggleCancel={toggleCancel}
          />
        </div>
      </Modal>

      <Modal show={meetingCardTwoModal} toggleModal={toggleMeetingCardTwoModal}>
        <div className="p-4">
          <MeetingTwoDetailsCard
            toggleModal={toggleMeetingCardTwoModal}
            toggleMeetingTwoCancel={toggleMeetingTwoCancel}
            selectedAppointment={selectedAppointment}
          />
        </div>
      </Modal>

      <Modal
        show={completedAppointment}
        toggleModal={toggleCompletedAppointment}
      >
        <div className="p-4">
          <CompletedAppointment
            toggleModal={toggleCompletedAppointment}
            selectedAppointment={selectedAppointment}
          />
        </div>
      </Modal>

      {/* Cancelled Appointment Details Page */}
      <Modal show={cancelledDetails} toggleModal={toggleCancelledDetails}>
        <div className="p-4">
          <CompletedAppointment
            toggleModal={toggleCancelledDetails}
            ifCompleted={false}
            selectedAppointment={selectedAppointment}
          />
        </div>
      </Modal>

      {/* Upcoming Appointment Details Page */}
      <Modal show={upcomingDetails} toggleModal={toggleUpcomingDetails}>
        <div className="p-4">
          <UpcomingAppointment
            toggleModal={toggleUpcomingDetails}
            selectedAppointment={selectedAppointment}
            toggleCancel={toggleCancel}
            toggleRescheduleModal={toggleRescheduleModal}
            // toggleRescheduleTwoModal={toggleRescheduleTwoModal}
          />
        </div>
      </Modal>

      <Modal show={cancelAppointment} toggleModal={toggleCancel}>
        <div className="p-4">
          <CancelAppointment
            toggleModal={toggleCancel}
            details={sortedAppointments?.[0]}
          />
        </div>
      </Modal>

      <Modal show={meetingTwoCancel} toggleModal={toggleMeetingTwoCancel}>
        <div className="p-4">
          <CancelAppointmentTwo toggleModal={toggleMeetingTwoCancel} />
        </div>
      </Modal>

      <Modal show={rescheduleModal} toggleModal={toggleRescheduleModal}>
        <div className="p-4">
          <Reschedule
            // details={sortedAppointments?.[0] || selectedAppointment} - find a fix for passing the selected appointment to the blue/green card on the left
            details={selectedAppointment}
            toggleModal={toggleRescheduleModal}
          />
        </div>
      </Modal>

      {/* Request Rescheduled Details Page */}
      <Modal show={rescheduleModalTwo} toggleModal={toggleRescheduleTwoModal}>
        <div className="p-4">
          <RescheduleTwo
            toggleModal={toggleRescheduleTwoModal}
            toggleRescheduleModal={toggleRescheduleModal}
            toggleCancel={toggleCancel}
            details={selectedAppointment}
          />
        </div>
      </Modal>
    </Flex>
  );
};

export { ModuleContent };
