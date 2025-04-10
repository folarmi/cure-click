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
  getTimeZoneInfo,
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
              recurring: day.recurring || false,
            };
            return acc;
          },
          {}
        ),
      },
    });

  const submitAvailableSessions = async () => {
    const scheduleData = getValues("schedule");
    const payload = {
      doctorPublicId: doctorProfile.data.publicId,
      dayOfTheWeek: getFullDayNameFromPublicId(expandedDay),
      localTimes:
        expandedDay &&
        scheduleData[expandedDay]?.localTimes.map(
          (slot: { startTime: string; endTime: string }) =>
            convertToLocalTimeFormat(slot.startTime)
        ),
      available: getValues(`schedule.${expandedDay}.available`) || false,
      recurring: getValues(`schedule.${expandedDay}.recurring`),
      timeZone: getTimeZoneInfo(),
    };

    console.log(payload);
    // updateDoctorAvailableSessionMutation.mutateAsync(payload);
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
              />
            ))}
          </Box>

          {expandedDay && (
            <div className="flex items-center my-4">
              <CustomCheckBox
                name={`schedule.${expandedDay}.recurring`}
                control={control}
              />
              <Text size="2" className="text-text pl-2" weight="regular" as="p">
                Make Recurring
              </Text>
            </div>
          )}
          <Button onClick={handleSubmit(submitAvailableSessions)}>
            Save Schedule
          </Button>
        </Flex>
      )}
    </>
  );
};

export { Calendar };

{
  /* <Box className="cursor-pointer" onClick={() => onToggle(publicId)}>
<Flex
  align="center"
  justify="between"
  className="py-3 border-b border-gray3 px-4"
>
  <Text as="p" weight="medium" size="2">
    {capitalize(dayOfTheWeek)}
  </Text>
  <Text as="p" weight="regular" size="2" className="text-left">
    {`${fields.length} availability periods`}
  </Text>
  <Switch variant="soft" size="2" />
</Flex>

{isExpanded && (
  <div className="px-4">
    {fields.map((item, index) => {
      const startTime = watch(
        `schedule.${publicId}.periods.${index}.startTime`
      );
      const endTimeOptions = getEndTimeOptions(index, startTime);

      return (
        <Flex
          key={item.id}
          align="center"
          justify="between"
          className="my-4"
        >
          <Flex align="center" className="w-full">
            <div className="w-1/3">
              <CustomSelect
                options={timeSlots}
                placeholder="9:00am"
                ifGrayBg={false}
                name={`schedule.${publicId}.periods.${index}.startTime`}
                control={control}
              />
            </div>
            <Text as="p" size="1" weight="regular" className="px-6">
              To
            </Text>
            <div className="w-1/3">
              <CustomSelect
                options={endTimeOptions}
                placeholder={endTimeOptions[0]?.label || "10:00 AM"}
                name={`schedule.${publicId}.periods.${index}.endTime`}
                control={control}
              />
            </div>
          </Flex>
          <IconButton
            style={{ border: "1px solid var(--border-gray)" }}
            className="bg-transparent text-neutral_11 cursor-pointer"
            size="1"
            onClick={() => remove(index)}
          >
            <TrashIcon />
          </IconButton>
        </Flex>
      );
    })}
    <Button
      style={{ border: "1px solid var(--border-gray)" }}
      onClick={() => append({ startTime: "", endTime: "" })}
      size="1"
      className="text-sm font-medium bg-transparent text-neutral_11 my-2 mx-4 cursor-pointer"
    >
      <PlusIcon /> Add Period
    </Button>
  </div>
)}
</Box> */
}
