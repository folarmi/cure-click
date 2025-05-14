import MeetingCardTwo from "../cards/MeetingCardTwo";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";
import { Appointment } from "../../utils/types";
// import { formatAppointmentTime } from "../../utils/calendarutil";
import { getFullName } from "../../utils/util";
import {
  formatDateToReadableString,
  formatTimeTo12Hour,
} from "../../utils/calendarutil";
import { ReportButton } from "../ui/ReportButton";

type Prop = {
  toggleModal: () => void;
  selectedAppointment: Appointment;
  toggleCancel: () => void;
  // toggleRescheduleTwoModal: () => void;
  toggleRescheduleModal: () => void;
};
const UpcomingAppointment = ({
  toggleModal,
  selectedAppointment,
  toggleCancel,
  toggleRescheduleModal,
}: Prop) => {
  const handleCancel = () => {
    toggleModal();
    toggleCancel();
  };

  const handleReschedule = () => {
    toggleModal();
    toggleRescheduleModal();
  };
  return (
    <div className="rounded-lg p-4 bg-white w-auto md:min-w-[522px]">
      <AppointmentModalHeader toggleModal={toggleModal} />
      <MeetingCardTwo
        title={selectedAppointment?.topic}
        date={formatDateToReadableString(selectedAppointment?.appointmentDate)}
        time={formatTimeTo12Hour(selectedAppointment?.appointmentTime)}
        doctorName={getFullName(
          selectedAppointment?.doctor?.firstname,
          selectedAppointment?.doctor?.lastname
        )}
        patientName={getFullName(
          selectedAppointment?.patient?.firstname,
          selectedAppointment?.patient?.lastname
        )}
        rescheduleOnClick={handleReschedule}
        ifView={false}
        ifSpaceBetween={false}
        ifButtons
        cancelOnClick={handleCancel}
      />

      <AppointmentSubCard
        status={selectedAppointment?.appointmentStatus}
        date={selectedAppointment?.appointmentDate}
        time={selectedAppointment?.appointmentTime}
      />

      <ReportButton />
    </div>
  );
};

export { UpcomingAppointment };
