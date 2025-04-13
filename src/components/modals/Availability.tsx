import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import CustomSelect from "../ui/CustomSelect";
import { sampleDaysOfTheWeek } from "../../utils/data";

import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useGetDoctorAvailableSessions } from "../../lib/apiCalls";
import { useState } from "react";
import { useAppDispatch } from "../../lib/hook";
import {
  updateDoctorId,
  updateTimeSlot,
} from "../../lib/features/scheduleSlice";
// import Modal from "../ui/Modal";
// import { Calendar } from "react-big-calendar";
// import { localizer } from "../../utils/calendarutil";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Availability = ({ toggleModal }: any) => {
  const { id } = useParams();
  const { control } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  // const [showCalendarModal, setShoswCalendarModal] = useState(false);

  // const toggleCalendarModal = () => {
  //   setShowCalendarModal(!showCalendarModal);
  // };

  const handleSelectedTimeSlot = () => {
    dispatch(updateDoctorId(id || ""));
    dispatch(updateTimeSlot(selectedTimeSlot || ""));
    navigate("/dashboard/schedule");
  };

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

    const formattedTimes =
      matched?.localTimes.map((time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        const start = new Date();
        start.setHours(hours, minutes);

        const end = new Date(start);
        end.setHours(end.getHours() + 1); // 1-hour slot

        const startTime = start.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        const endTime = end.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        return { timeSlot: `${startTime} - ${endTime}` };
      }) ?? [];

    setAvailableTimes(formattedTimes);
  };

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
          <ChevronLeftIcon
            className="w-6 h-6"
            // onClick={() => toggleCalendarModal()}
          />
          <CustomSelect
            options={sampleDaysOfTheWeek}
            placeholder="Monday"
            name="availabilityStatus"
            control={control}
            className="w-[346px]"
            customOnChange={(item) => handleSelectedDay(item)}
          />
          <ChevronRightIcon
            className="w-6 h-6"
            // onClick={() => toggleCalendarModal()}
          />
        </Flex>

        <Box className="mt-6">
          <Text as="p" size="3" weight="medium" className="text-gray12">
            Available Time Slots
          </Text>
          <Text as="p" size="3" weight="regular" className="text-gray11">
            Select a suitable meeting time
          </Text>

          {availableTimes.map(({ timeSlot }) => {
            return (
              <Box
                className="mt-2 border border-gray3 rounded-md hover:bg-grassA2 hover:border hover:border-grassA3 cursor-pointer"
                key={timeSlot}
                onClick={() => setSelectedTimeSlot(timeSlot)}
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
            onClick={() => handleSelectedTimeSlot()}
            // disabled
            className="bg-grass9 w-full font-medium mt-8 text-base cursor-pointer"
          >
            Schedule
          </Button>
        </Box>

        {/* <Modal show={showCalendarModal} toggleModal={toggleCalendarModal}>
          <div className="calendar-container bg-red-900 w-full">
            <Calendar
              localizer={localizer}
              events={[]}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={["month", "week", "day"]}
              selectable
              toolbar={false}
              // onSelectSlot={handleDateSelect}
              style={{ height: 500 }}
            />
          </div>
        </Modal> */}
      </Box>
    </div>
  );
};

export default Availability;
