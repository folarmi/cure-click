import { Box, Text } from "@radix-ui/themes";
import MeetingCardTwo from "../cards/MeetingCardTwo";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";

type Prop = {
  ifCompleted?: boolean;
  toggleModal: () => void;
};

const CompletedAppointment = ({ ifCompleted = true, toggleModal }: Prop) => {
  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
      <AppointmentModalHeader toggleModal={toggleModal} />
      <MeetingCardTwo
        title="Second Opinion on scheduled Cancer surge.."
        date="1 July 2023"
        time="11:30PM GMT+1"
        doctorName="Dr. Alison Ogaga"
        ifView={false}
      />

      <Box className="border border-gray3 rounded-lg p-4 mt-4">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          {ifCompleted ? "Doctor Notes" : "Cancel Reason"}
        </Text>

        <Box className="bg-gray2 rounded p-3">
          <Text as="p" weight="regular" size="3" className="text-gray11">
            note from doctor
          </Text>
        </Box>
      </Box>

      <AppointmentSubCard status={ifCompleted ? "Completed" : "Cancelled"} />
    </div>
  );
};

export default CompletedAppointment;
