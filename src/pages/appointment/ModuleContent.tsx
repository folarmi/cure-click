/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  formatAppointmentTime,
  sortUpcomingAppointments,
} from "../../utils/calendarutil";
import { getFullName } from "../../utils/util";
import { Appointment } from "../../utils/types";
import { format, parse } from "date-fns";

type Prop = {
  appointmentsData: any;
};

const ModuleContent = ({ appointmentsData }: Prop) => {
  const [modal, setModal] = useState(false);
  const [meetingCardTwoModal, setMeetingCardTwoModal] = useState(false);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [completedAppointment, setCompletedAppointment] = useState(false);
  const [meetingTwoCancel, setMeetingTwoCancel] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [rescheduleModalTwo, setRescheduleModalTwo] = useState(false);

  const sortedAppointments = sortUpcomingAppointments(appointmentsData?.data);

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

        <MeetingCard
          title={sortedAppointments?.[0]?.topic}
          date={sortedAppointments?.[0]?.appointmentDate}
          time={formatAppointmentTime(
            sortedAppointments?.[0]?.appointmentDate,
            sortedAppointments?.[0]?.appointmentTime
          )}
          doctorName={getFullName(
            sortedAppointments?.[0]?.doctor?.firstname,
            sortedAppointments?.[0]?.doctor?.lastname
          )}
          patientName={getFullName(
            sortedAppointments?.[0]?.patient?.firstname,
            sortedAppointments?.[0]?.patient?.lastname
          )}
          speciality={sortedAppointments?.[0]?.doctor?.specialization}
          onClick={toggleModal}
          cancelOnClick={toggleCancel}
          rescheduleOnClick={toggleRescheduleModal}
        />
        {sortedAppointments?.slice(1).map((item: Appointment) => {
          return (
            <div key={item?.publicId}>
              <MeetingCardTwo
                title={item?.topic}
                date={item?.appointmentDate}
                time={format(
                  parse(item?.appointmentTime, "HH:mm:ss", new Date()),
                  "h:mm a"
                )}
                doctorName={getFullName(
                  item?.doctor?.firstname,
                  item?.doctor?.lastname
                )}
                onClick={toggleMeetingCardTwoModal}
              />
            </div>
          );
        })}
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
          <Reschedule
            details={sortedAppointments?.[0]}
            toggleModal={toggleRescheduleModal}
          />
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
