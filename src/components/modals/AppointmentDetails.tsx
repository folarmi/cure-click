/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box } from "@radix-ui/themes";
import { MeetingCard } from "../cards/MeetingCard";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";

const AppointmentDetails = ({ toggleModal }: any) => {
  return (
    <div className="rounded-lg p-4 bg-white w-[522px]">
      <AppointmentModalHeader toggleModal={toggleModal} />

      <Box className="mt-4">
        <MeetingCard
          title="Second Opinion on scheduled Cancer surgery"
          date="Today"
          time="11:30PM GMT+1 ( In 30 min)"
          doctorName="Dr. Alison Ogaga"
          speciality="General Practioner"
          ifModal
          onClick={toggleModal}
        />

        <AppointmentSubCard />
      </Box>
    </div>
  );
};

export default AppointmentDetails;
