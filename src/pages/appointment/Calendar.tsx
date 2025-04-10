/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DayScheduleItem } from "./DaySchedule";
import { CalendarFormValues, DaySchedule } from "../../utils/types";
import {
  useCustomMutation,
  useGetData,
  useGetDoctorProfile,
} from "../../lib/apiCalls";
import { Loader } from "../../components/ui/Loader";
import {
  convertToLocalTimeFormat,
  getFullDayNameFromPublicId,
} from "../../utils/util";
import { CustomCheckBox } from "../../components/ui/CustomCheckBox";
import { sessionsData } from "../../utils/data";

const Calendar = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
    useGetDoctorProfile();

  const {
    data: doctorAvailableSessions,
    isLoading: doctorAvailableSessionsIsLoading,
  } = useGetData({
    url: `appointment/api/doctors/${doctorProfile?.data?.publicId}/available-sessions`,
    queryKey: ["GetDoctorAvailableSessions"],
  });

  const updateDoctorAvailableSessionMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/available-sessions`,
    successMessage: () => "Available Sessions Updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "put",
    onSuccessCallback: () => {
      // toggleModal();
    },
  });

  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<CalendarFormValues>({
      defaultValues: {
        schedule: doctorAvailableSessions?.data?.reduce(
          (acc: any, day: DaySchedule) => {
            acc[day.publicId] = {
              ...day,
              localTimes: day.localTimes || [],
              available: day.available || false,
            };
            return acc;
          },
          {}
        ),
      },
    });

  const submitAvailableSessions = (data: any) => {
    const scheduleData = getValues("schedule");
    console.log(data.schedule);

    const payload = {
      Object.entries(scheduleData).map(
      ([publicId, schedule]: any) => ({
      doctorPublicId: doctorProfile.data.publicId,
      dayOfTheWeek: getFullDayNameFromPublicId(expandedDay),
      localTimes: data.schedule.map(
        (slot: { startTime: string; endTime: string }) =>
          convertToLocalTimeFormat(slot.startTime)
      ),
      available: getValues(`schedule.${expandedDay}.available`),
      // recurring: getValues(`schedule.${publicId}.recurring`),
      timeZone: {
        id: "string",
        displayName: "string",
        dstsavings: 1073741824,
        rawOffset: 1073741824,
      },
      })
      );
    };

    const formData = {
      ...payload,
      recurring: getValues("recurring"),
    };
    console.log(payload);
  };
  return (
    <>
      {doctorAvailableSessionsIsLoading || doctorProfileIsLoading ? (
        <Loader />
      ) : (
        <Flex direction="column" gap="4" className="p-4">
          <Text size="5" weight="bold">
            Weekly Availability
          </Text>

          <Box className="border rounded-lg overflow-hidden">
            {sessionsData?.map((day: DaySchedule) => (
              <DayScheduleItem
                key={day.dayOfTheWeek}
                day={day}
                control={control}
                watch={watch}
                isExpanded={expandedDay === day.publicId}
                onToggle={(id) =>
                  setExpandedDay(id === expandedDay ? null : id)
                }
                setValue={setValue}
                getValues={getValues}
              />
            ))}
          </Box>

          <div className="flex items-center my-4">
            <CustomCheckBox name="recurring" control={control} />
            <Text size="2" className="text-text pl-2" weight="regular" as="p">
              Make Recurring
            </Text>
          </div>
          <Button onClick={handleSubmit(submitAvailableSessions)}>
            Save Schedule
          </Button>
        </Flex>
      )}
    </>
  );
};

export { Calendar };
