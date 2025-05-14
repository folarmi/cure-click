import { Box } from "@radix-ui/themes";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import MeetingCardTwo from "../cards/MeetingCardTwo";
import { Appointment } from "../../utils/types";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";
import { formatAppointmentTime } from "../../utils/calendarutil";
import { getFullName } from "../../utils/util";

type Prop = {
  toggleModal: () => void;
  toggleRescheduleModal: () => void;
  toggleCancel: () => void;
  details: Appointment;
};

const RescheduleTwo = ({
  toggleModal,
  details,
  toggleRescheduleModal,
  toggleCancel,
}: Prop) => {
  const handleReschedule = () => {
    toggleModal();
    toggleRescheduleModal();
  };

  const handleCancel = () => {
    toggleModal();
    toggleCancel();
  };

  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
      <AppointmentModalHeader
        text="Reschedule Session"
        toggleModal={toggleModal}
      />

      <Box className="mt-4">
        <MeetingCardTwo
          title={details?.topic}
          date={details?.appointmentDate}
          time={formatAppointmentTime(
            details?.appointmentDate,
            details?.appointmentTime
          )}
          doctorName={getFullName(
            details?.doctor?.firstname,
            details?.doctor?.lastname
          )}
          patientName={getFullName(
            details?.patient?.firstname,
            details?.patient?.lastname
          )}
          ifView={false}
          ifSpaceBetween={false}
          ifButtons
          rescheduleOnClick={handleReschedule}
          cancelOnClick={handleCancel}
        />

        <AppointmentSubCard
          status={details?.appointmentStatus}
          date={details?.appointmentDate}
          time={details?.appointmentTime}
        />
      </Box>
    </div>
  );
};

export { RescheduleTwo };
