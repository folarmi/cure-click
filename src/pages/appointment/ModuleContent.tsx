import { Box, Flex } from "@radix-ui/themes";
import { CustomText } from "../../components/ui/CustomText";
import { MeetingCard } from "../../components/cards/MeetingCard";

import MeetingCardTwo from "../../components/cards/MeetingCardTwo";
import Modal from "../../components/ui/Modal";
import { RescheduleTwo } from "../../components/modals/RescheduleTwo";
import { Reschedule } from "../../components/modals/Reschedule";
import { CancelAppointmentTwo } from "../../components/modals/CancelAppointmentTwo";
import CancelAppointment from "../../components/modals/CancelAppointment";
import CompletedAppointment from "../../components/modals/CompletedAppointment";
import { MeetingTwoDetailsCard } from "../../components/modals/MeetingTwoDetailsCard";
import AppointmentDetails from "../../components/modals/AppointmentDetails";
import { useState } from "react";

const ModuleContent = () => {
  const [modal, setModal] = useState(false);
  const [meetingCardTwoModal, setMeetingCardTwoModal] = useState(false);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [completedAppointment, setCompletedAppointment] = useState(false);
  const [meetingTwoCancel, setMeetingTwoCancel] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [rescheduleModalTwo, setRescheduleModalTwo] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleMeetingCardTwoModal = () => {
    setMeetingCardTwoModal(!meetingCardTwoModal);
  };

  const toggleCancel = () => {
    setCancelAppointment(!cancelAppointment);
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

  const toggleRescheduleModal = () => {
    setRescheduleModal(!rescheduleModal);
  };

  const toggleRescheduleTwoModal = () => {
    setRescheduleModalTwo(!rescheduleModalTwo);
  };

  return (
    <Flex>
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

        <MeetingCard
          title="Second Opinion on scheduled Cancer surgery"
          date="Today"
          time="11:30PM GMT+1 ( In 30 min)"
          doctorName="Dr. Alison Ogaga"
          patientName="Kemi Ukpong"
          speciality="General Practioner"
          onClick={toggleModal}
          cancelOnClick={toggleCancel}
          rescheduleOnClick={toggleRescheduleModal}
        />
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          doctorName="Dr. Alison Ogaga"
          onClick={toggleMeetingCardTwoModal}
        />
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          doctorName="Dr. Alison Ogaga"
          onClick={toggleCompletedAppointment}
        />
      </Box>

      <Modal show={modal} toggleModal={toggleModal}>
        <div className="p-4">
          <AppointmentDetails toggleModal={toggleModal} />
        </div>
      </Modal>

      <Modal show={meetingCardTwoModal} toggleModal={toggleMeetingCardTwoModal}>
        <div className="p-4">
          <MeetingTwoDetailsCard
            toggleModal={toggleMeetingCardTwoModal}
            toggleMeetingTwoCancel={toggleMeetingTwoCancel}
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
            // ifCompleted={false}
          />
        </div>
      </Modal>

      <Modal show={cancelAppointment} toggleModal={toggleCancel}>
        <div className="p-4">
          <CancelAppointment toggleModal={toggleCancel} />
        </div>
      </Modal>

      <Modal show={meetingTwoCancel} toggleModal={toggleMeetingTwoCancel}>
        <div className="p-4">
          <CancelAppointmentTwo toggleModal={toggleMeetingTwoCancel} />
        </div>
      </Modal>

      <Modal show={rescheduleModal} toggleModal={toggleRescheduleModal}>
        <div className="p-4">
          <Reschedule toggleModal={toggleRescheduleModal} />
        </div>
      </Modal>

      <Modal show={rescheduleModalTwo} toggleModal={toggleRescheduleTwoModal}>
        <div className="p-4">
          <RescheduleTwo toggleModal={toggleRescheduleTwoModal} />
        </div>
      </Modal>
    </Flex>
  );
};

export { ModuleContent };
