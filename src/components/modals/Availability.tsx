import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import CustomSelect from "../ui/CustomSelect";
import { sampleDaysOfTheWeek, sampleTime } from "../../utils/data";

import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useGetDoctorAvailableSessions } from "../../lib/apiCalls";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Availability = ({ toggleModal }: any) => {
  const { id } = useParams();
  const { control } = useForm();
  const navigate = useNavigate();
  const [availableTimes, setAvailableTimes] = useState([]);

  const {
    data: doctorAvailableSessions,
    // isLoading: doctorAvailableSessionsIsLoading,
  } = useGetDoctorAvailableSessions(id);

  const dayMap: Record<string, string> = {
    Sunday: "SUNDAY",
    Monday: "MONDAY",
    Tuesday: "TUESDAY",
    Wednesday: "WEDNESDAY",
    Thursday: "THURSDAY",
    Friday: "FRIDAY",
    Saturday: "SATURDAY",
  };

  const handleSelectedDay = (day: string) => {
    const backendDay = dayMap[day];
    const matched = doctorAvailableSessions?.data?.sessions.find(
      (item: any) => item.dayOfTheWeek === backendDay
    );
    setAvailableTimes(matched?.localTimes ?? []);
  };

  console.log(availableTimes);
  return (
    <div className="bg-white py-6 px-4 md:px-10 rounded-lg">
      <Flex justify="between" align="center" className="px-4">
        <Text weight="medium" size="3" className="text-gray12">
          View Availability
        </Text>
        <BiX className="w-6 h-6 cursor-pointer" onClick={toggleModal} />
      </Flex>

      <Box className="mt-8">
        <Flex justify="between" align="center" gap="6">
          <ChevronLeftIcon className="w-6 h-6" />
          <CustomSelect
            options={sampleDaysOfTheWeek}
            placeholder="Monday"
            name="availabilityStatus"
            control={control}
            className="w-[346px]"
            customOnChange={(item) => handleSelectedDay(item)}
          />
          <ChevronRightIcon className="w-6 h-6" />
        </Flex>

        <Box className="mt-6">
          <Text as="p" size="3" weight="medium" className="text-gray12">
            Available Time Slots
          </Text>
          <Text as="p" size="3" weight="regular" className="text-gray11">
            Select a suitable meeting time
          </Text>

          {sampleTime.map(({ id, timeSlot }) => {
            return (
              <Box
                className="mt-2 border border-gray3 rounded-md hover:bg-grassA2 hover:border hover:border-grassA3 cursor-pointer"
                key={id}
              >
                <Text
                  as="p"
                  size="3"
                  weight="medium"
                  align="center"
                  className="text-gray11 py-2"
                >
                  {timeSlot}
                </Text>
              </Box>
            );
          })}

          <Button
            size="3"
            variant="solid"
            radius="medium"
            onClick={() => navigate("/dashboard/schedule")}
            // disabled
            className="bg-grass9 w-full font-medium mt-8 text-base cursor-pointer"
          >
            Schedule
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Availability;
