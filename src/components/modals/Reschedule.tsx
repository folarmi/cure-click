import { Box, Text } from "@radix-ui/themes";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { MeetingCard } from "../cards/MeetingCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Reschedule = ({ toggleModal }: any) => {
  return (
    <div className="rounded-lg p-4 bg-white w-[522px]">
      <AppointmentModalHeader
        text="Reschedule Session"
        toggleModal={toggleModal}
      />

      <Box className="mt-4">
        <MeetingCard
          title="Second Opinion on scheduled Cancer surgery"
          date="Today"
          time="11:30PM GMT+1 ( In 30 min)"
          doctorName="Dr. Alison Ogaga"
          speciality="General Practioner"
          onClick={toggleModal}
          ifButtons={false}
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

export { Reschedule };
