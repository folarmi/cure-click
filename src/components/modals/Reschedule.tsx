import { Box, Button, Text } from "@radix-ui/themes";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { MeetingCard } from "../cards/MeetingCard";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { CustomTextarea } from "../ui/CustomTextArea";
import { useForm } from "react-hook-form";
import { Appointment } from "../../utils/types";
import { DoctorCalendar } from "../ui/DoctorCalendar";
import { useGetDoctorAvailableSessions } from "../../lib/apiCalls";
import {
  formatAppointmentTime,
  getTotalAvailableTimes,
} from "../../utils/calendarutil";
import { getFullName } from "../../utils/util";

type Prop = {
  toggleModal: () => void;
  details: Appointment;
};

const Reschedule = ({ toggleModal, details }: Prop) => {
  const { control } = useForm();
  const { data: doctorAvailableSessions } = useGetDoctorAvailableSessions(
    details?.doctor?.publicId
  );
  const userType = useSelector((state: RootState) => state.auth.userType);

  const scheduleData = {
    ...doctorAvailableSessions?.data,
    // ...test,
    date: doctorAvailableSessions?.date,
  };

  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
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
              <Text size="3" className="text-gray12">
                Select New Date ({" "}
                {getTotalAvailableTimes(
                  doctorAvailableSessions?.data?.sessions
                )}{" "}
                Available Sessions )
              </Text>

              <div className="mt-6">
                <DoctorCalendar
                  singleDoctorData={details?.doctor}
                  scheduleData={scheduleData}
                  customSubmit
                  submitFunction={() => console.log("jhbfjhdsbhf")}
                />
              </div>
            </>
          ) : (
            <>
              <CustomTextarea
                label="Reason for rescheduling"
                className=""
                placeholder="Input your Reasons"
                control={control}
                name="biography"
              />

              <Button
                // onClick={toggleModal}
                variant="solid"
                size="3"
                className="font-medium text-white text-base bg-grass_9 w-full my-6"
              >
                Schedule
              </Button>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export { Reschedule };
