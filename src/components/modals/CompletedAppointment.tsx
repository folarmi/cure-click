import { Box, Text } from "@radix-ui/themes";
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
  ifCompleted?: boolean;
  toggleModal: () => void;
  selectedAppointment: Appointment;
};
const CompletedAppointment = ({
  ifCompleted = true,
  toggleModal,
  selectedAppointment,
}: Prop) => {
  console.log(selectedAppointment);
  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
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
        ifView={false}
        ifSpaceBetween={false}
      />

      <AppointmentSubCard
        status={selectedAppointment?.appointmentStatus}
        date={selectedAppointment?.appointmentDate}
        time={selectedAppointment?.appointmentTime}
      />

      <Box className="border border-gray3 rounded-lg p-4 mt-4">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          {ifCompleted ? "Doctor Notes" : "Cancellation Reasons"}
        </Text>

        <Box className="bg-gray2 rounded p-3">
          <Text as="p" weight="regular" size="3" className="text-gray11">
            note from doctor
          </Text>
        </Box>
      </Box>

      <ReportButton />
    </div>
  );
};

export default CompletedAppointment;
