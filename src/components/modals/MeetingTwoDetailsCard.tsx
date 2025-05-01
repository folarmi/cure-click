import MeetingCardTwo from "../cards/MeetingCardTwo";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
const MeetingTwoDetailsCard = ({
  toggleModal,
  toggleMeetingTwoCancel,
  selectedAppointment,
}: any) => {
  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
      <AppointmentModalHeader toggleModal={toggleModal} />

      <MeetingCardTwo
        title="Second Opinion on scheduled Cancer surge.."
        date="1 July 2023"
        time="11:30PM GMT+1"
        doctorName="Dr. Alison Ogaga"
        ifButtons
        cancelOnClick={toggleMeetingTwoCancel}
        ifSpaceBetween={false}
      />

      <AppointmentSubCard
        status={selectedAppointment?.appointmentStatus}
        date={selectedAppointment?.appointmentDate}
        time={selectedAppointment?.appointmentTime}
      />
    </div>
  );
};

export { MeetingTwoDetailsCard };
