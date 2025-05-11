import { Box } from "@radix-ui/themes";
import { MeetingCard } from "../cards/MeetingCard";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { Appointment } from "../../utils/types";
import { formatAppointmentTime } from "../../utils/calendarutil";
import { getFullName } from "../../utils/util";
import { useCustomMutation } from "../../lib/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { ReportButton } from "../ui/ReportButton";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";

type Prop = {
  toggleModal: () => void;
  selectedAppointment: Appointment;
  toggleCancel: () => void;
};

const AppointmentDetails = ({
  toggleModal,
  selectedAppointment,
  toggleCancel,
}: Prop) => {
  const queryClient = useQueryClient();
  const userType = useAppSelector((state: RootState) => state.auth.userType);

  const acceptAppointmentMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/appointment/accept/${selectedAppointment?.publicId}`,
    successMessage: () => "Appointment Updated sucessfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllAppointments"] });
      toggleModal();
    },
  });

  const handleCancel = () => {
    toggleModal();
    toggleCancel();
  };
  // Active appointments shouldn't be cancelled or rescheduled

  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
      <AppointmentModalHeader toggleModal={toggleModal} />
      <Box className="mt-4">
        <MeetingCard
          date={selectedAppointment?.appointmentDate}
          speciality={selectedAppointment?.doctor?.specialization}
          title={selectedAppointment?.topic}
          time={formatAppointmentTime(
            selectedAppointment?.appointmentDate,
            selectedAppointment?.appointmentTime
          )}
          patientName={getFullName(
            selectedAppointment?.patient?.firstname,
            selectedAppointment?.patient?.lastname
          )}
          doctorName={getFullName(
            selectedAppointment?.doctor?.firstname,
            selectedAppointment?.doctor?.lastname
          )}
          ifModal
          acceptOnClick={() => acceptAppointmentMutation.mutate({})}
          acceptLoading={acceptAppointmentMutation.isPending}
          acceptDisabled={userType === "patient" ? true : false}
          cancelOnClick={handleCancel}
          rescheduleOnClick={handleCancel}
          joinDisabled={
            selectedAppointment?.appointmentStatus === "PENDING" ? true : false
          }
          ifPending={
            selectedAppointment?.appointmentStatus === "PENDING" ? true : false
          }
          cancelDisabled={
            selectedAppointment?.appointmentStatus === "ACTIVE" ? true : false
          }
          rescheduleDisbaled={
            selectedAppointment?.appointmentStatus === "ACTIVE" ? true : false
          }
        />

        <AppointmentSubCard
          status={selectedAppointment?.appointmentStatus}
          date={selectedAppointment?.appointmentDate}
          time={selectedAppointment?.appointmentTime}
        />

        <ReportButton />
      </Box>
    </div>
  );
};

export default AppointmentDetails;
