/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Text } from "@radix-ui/themes";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { MeetingCard } from "../cards/MeetingCard";
import { RootState } from "../../lib/store";
import { CustomTextarea } from "../ui/CustomTextArea";
import { useForm } from "react-hook-form";
import { Appointment } from "../../utils/types";
import { DoctorCalendar } from "../ui/DoctorCalendar";
import {
  useCustomMutation,
  useGetDoctorAvailableSessions,
} from "../../lib/apiCalls";
import {
  formatAppointmentTime,
  getTotalAvailableTimes,
} from "../../utils/calendarutil";
import { convertStartTimeToBackendFormat, getFullName } from "../../utils/util";
import { useAppSelector } from "../../lib/hook";
import { format, parseISO } from "date-fns";

type Prop = {
  toggleModal: () => void;
  details: Appointment;
};

const Reschedule = ({ toggleModal, details }: Prop) => {
  const { control, handleSubmit, getValues } = useForm();
  const { data: doctorAvailableSessions } = useGetDoctorAvailableSessions(
    details?.doctor?.publicId
  );
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const scheduleData = {
    ...doctorAvailableSessions?.data,
    date: doctorAvailableSessions?.date,
  };

  const requestRescheduleMutation = useCustomMutation({
    endpoint: `appointment/api/appointments/request-reschedule/${details?.publicId}`,
    successMessage: () => "Appointment Updated sucessfully",
    method: "put",
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const rescheduleMutation = useCustomMutation({
    endpoint: `appointment/api/appointments/reschedule/${details.publicId}`,
    successMessage: () => "Appointment Updated sucessfully",
    method: "put",
    onSuccessCallback: () => {
      toggleModal();
    },
    onError: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    requestRescheduleMutation.mutate({
      who: userType === "doctor" ? "DOCTOR" : "PATIENT",
      reason: data?.reason,
    });
  };

  const submitRescheduleForm = (data: { timeSlot: string; date: string }) => {
    rescheduleMutation.mutate({
      who: userType === "doctor" ? "DOCTOR" : "PATIENT",
      reason: getValues("reason"),
      appointmentDate: format(parseISO(data?.date), "yyyy-MM-dd"),
      appointmentTime: convertStartTimeToBackendFormat(data?.timeSlot),
    });
  };

  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px] max-h-[700px] overflow-y-auto my-12">
      <AppointmentModalHeader
        text="Reschedule Session"
        toggleModal={toggleModal}
      />

      <Box className="mt-4">
        <MeetingCard
          title={details?.topic}
          date={details?.appointmentDate}
          time={formatAppointmentTime(
            details?.appointmentDate,
            details?.appointmentTime
          )}
          patientName={getFullName(
            details?.patient?.firstname,
            details?.patient?.lastname
          )}
          doctorName={getFullName(
            details?.doctor?.firstname,
            details?.doctor?.lastname
          )}
          speciality={details?.doctor?.specialization}
          onClick={toggleModal}
          ifButtons={false}
          ifModal
        />
        <Box className="mt-6">
          {userType === "patient" ? (
            <>
              <CustomTextarea
                label="Reason for rescheduling"
                className="mb-6"
                placeholder="Input your Reasons"
                control={control}
                name="reason"
                rules={{
                  required: "Reason for Rescheduling is required",
                }}
              />
              <Text size="3" className="text-gray12">
                Select New Date ({" "}
                {getTotalAvailableTimes(
                  doctorAvailableSessions?.data?.sessions
                )}{" "}
                Available Sessions )
              </Text>

              <div className="">
                <DoctorCalendar
                  singleDoctorData={details?.doctor}
                  scheduleData={scheduleData}
                  customSubmit
                  submitFunction={submitRescheduleForm}
                />
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(submitForm)}>
              <CustomTextarea
                label="Reason for rescheduling"
                className=""
                placeholder="Input your Reasons"
                control={control}
                name="reason"
                rules={{
                  required: "Reason for Rescheduling is required",
                }}
              />

              <Button
                loading={
                  requestRescheduleMutation.isPending ||
                  rescheduleMutation.isPending
                }
                disabled={
                  requestRescheduleMutation.isPending ||
                  rescheduleMutation.isPending
                }
                variant="solid"
                size="3"
                className="font-medium text-white text-base bg-grass_9 w-full my-6"
              >
                Reschedule
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </div>
  );
};

export { Reschedule };
