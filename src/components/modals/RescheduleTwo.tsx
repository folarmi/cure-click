import { Box, Text } from "@radix-ui/themes";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import MeetingCardTwo from "../cards/MeetingCardTwo";

/* eslint-disable @typescript-eslint/no-explicit-any */
const RescheduleTwo = ({ toggleModal }: any) => {
  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
      <AppointmentModalHeader
        text="Reschedule Session"
        toggleModal={toggleModal}
      />

      <Box className="mt-4">
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          doctorName="Dr. Alison Ogaga"
          patientName="Kemi Ukpong"
          ifView={false}
          ifSpaceBetween={false}
          ifButtons
        />
        <Box className="mt-6 px-6">
          <Text size="3" className="text-gray12">
            Select New Date (24 Available Sessions)
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export { RescheduleTwo };
