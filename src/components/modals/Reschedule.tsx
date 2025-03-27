import { Box, Button, Text } from "@radix-ui/themes";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { MeetingCard } from "../cards/MeetingCard";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { CustomTextarea } from "../ui/CustomTextArea";
import { useForm } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Reschedule = ({ toggleModal }: any) => {
  const { control } = useForm();
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
      <AppointmentModalHeader
        text="Reschedule Session"
        toggleModal={toggleModal}
      />

      <Box className="mt-4">
        <MeetingCard
          title="Second Opinion on scheduled Cancer surgery"
          date="Today"
          time="11:30PM GMT+1 ( In 30 min)"
          patientName="Kemi Ukpong"
          doctorName="Dr. Alison Ogaga"
          speciality="General Practioner"
          onClick={toggleModal}
          ifButtons={false}
          ifModal
        />
        <Box className="mt-6">
          {userType === "patient" ? (
            <Text size="3" className="text-gray12 px-6">
              Select New Date (24 Available Sessions)
            </Text>
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
