/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Box,
//   Button,
//   Checkbox,
//   Flex,
//   IconButton,
//   Select,
//   Switch,
//   Text,
// } from "@radix-ui/themes";
// import { useEffect, useState } from "react";
// import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
// import { availableTimes } from "../../utils/data";
// import { useForm } from "react-hook-form";
// import {
//   convertToLocalTimeFormat,
//   numberToWeekday,
//   timeSlots,
// } from "../../utils/util";
// import {
//   useCustomMutation,
//   useGetData,
//   useGetDoctorProfile,
// } from "../../lib/apiCalls";
// import { Loader } from "../../components/ui/Loader";
// import { FormValues, TimePeriod } from "../../utils/types";
// import { DayScheduleItem } from "./DaySchedule";

// const Calendar = () => {
//   // const { fields, append, remove } = useFieldArray({
//   //   name: "addPeriod",
//   // });
//   const [expandedDay, setExpandedDay] = useState<string | null>(null);
//   const [isBlockedOutDaysSwitchEnabled, setIsBlockedOutDaysSwitchEnabled] =
//     useState(true);
// const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
//   useGetDoctorProfile();

// const {
//   data: doctorAvailableSessions,
//   isLoading: doctorAvailableSessionsIsLoading,
// } = useGetData({
//   url: `appointment/api/doctors/${doctorProfile?.data?.publicId}/available-sessions`,
//   queryKey: ["GetDoctorAvailableSessions"],
// });

//   const { control, setValue, watch, getValues, reset } = useForm<FormValues>();

// const updateDoctorAvailableSessionMutation = useCustomMutation({
//   endpoint: `appointment/api/doctors/available-sessions`,
//   successMessage: () => "Available Sessions Updated sucessfully",
//   errorMessage: (error: any) => error?.response?.data?.remark,
//   method: "put",
//   onSuccessCallback: () => {
//     // toggleModal();
//   },
// });

//   const handleToggleDay = (publicId: string) => {
//     setExpandedDay((prev) => (prev === publicId ? null : publicId));
//   };

//   const handleBlockedOutSwitchChange = () => {
//     setIsBlockedOutDaysSwitchEnabled((prevState) => !prevState);
//   };

//   useEffect(() => {
//     if (!doctorAvailableSessions?.data || !expandedDay) return;

//     // Get the current day's periods
//     const dayPeriods = watch(`schedule.${expandedDay}.periods`);

//     if (dayPeriods && Array.isArray(dayPeriods)) {
//       dayPeriods.forEach((period, index) => {
//         if (period?.startTime) {
//           const [startHour, startMinute] = period.startTime
//             .split(":")
//             .map(Number);
//           const endHour = startHour + 1;
//           const endTime = `${endHour}:${startMinute}`;

//           // Check if end time exists in available slots
//           const isValidEndTime = timeSlots.some(
//             (slot) => slot.value === endTime
//           );

//           if (isValidEndTime) {
//             setValue(
//               `schedule.${expandedDay}.periods.${index}.endTime`,
//               endTime
//             );
//           }
//         }
//       });
//     }
//   }, [expandedDay, watch, setValue, timeSlots, doctorAvailableSessions?.data]);

//   useEffect(() => {
//     if (doctorAvailableSessions?.data) {
//       const defaultValues = doctorAvailableSessions.data.reduce((acc, day) => {
//         acc[day.publicId] = {
//           periods:
//             day.localTimes.length > 0
//               ? day.localTimes.map((time) => ({ ...time, id: time.id }))
//               : [{ startTime: "", endTime: "" }], // Default empty period if none exists
//         };
//         return acc;
//       }, {} as Record<string, { periods: TimePeriod[] }>);

//       reset({ schedule: defaultValues });
//     }
//   }, [doctorAvailableSessions?.data, reset]);

// const submitAvailableSessions = () => {
//   const scheduleData = getValues("schedule");
//   if (!doctorProfile?.data?.publicId) return;

//   // Prepare data for each day
//   Object.entries(scheduleData).forEach(([publicId, dayData]) => {
//     updateDoctorAvailableSessionMutation.mutate({
//       doctorPublicId: doctorProfile.data.publicId,
//       dayOfTheWeek: publicId, // or convert to proper format if needed
//       localTimes: dayData.periods.map((period) =>
//         convertToLocalTimeFormat(period.startTime)
//       ),
//       available: true, // You might want to track this per day
//     });
//   });
// };

//   return (
//     <>
//       {doctorAvailableSessionsIsLoading || doctorProfileIsLoading ? (
//         <Loader />
//       ) : (
//         <Flex className="mt-10">
//           <Box>
//             <Text as="p" size="4" className="text-gray12 font-semibold">
//               Availability Hours
//             </Text>
//             <Text
//               as="p"
//               size="3"
//               className="text-gray11 font-medium pt-1 w-[316px]"
//             >
//               Setup your Schedule to assist patients know when to book sessions
//             </Text>

//             <Box className="mt-4 border border-gray3  w-[564px]">
//               {doctorAvailableSessions?.data?.map(
//                 ({ dayOfTheWeek, publicId, localTimes }) => (
//                   <DayScheduleItem
//                     key={publicId}
//                     dayOfTheWeek={dayOfTheWeek}
//                     publicId={publicId}
//                     defaultPeriods={localTimes}
//                     isExpanded={expandedDay === publicId}
//                     onToggle={handleToggleDay}
//                     control={control}
//                     watch={watch}
//                   />
//                 )
//               )}
//             </Box>

// <div className="flex items-center my-4">
//   <Checkbox className="data-[state=checked]:bg-red-500" />
//   <Text size="2" className="text-text pl-2" weight="regular" as="p">
//     Make Recurring
//   </Text>
// </div>
//             <Button
//               className="bg-grass9 text-base font-medium mb-4"
//               loading={updateDoctorAvailableSessionMutation.isPending}
//               disabled={updateDoctorAvailableSessionMutation.isPending}
//               onClick={submitAvailableSessions}
//             >
//               Save Schedule{" "}
//             </Button>
//           </Box>

//           <Flex direction="column" align="center" className=" w-full mx-auto">
//             <Text as="p" size="4" className="text-gray12 font-semibold">
//               Blockout Dates
//             </Text>

//             <Text
//               as="p"
//               size="3"
//               className="text-gray11 font-medium pt-1 w-[546px]"
//             >
//               Add days you do not want to get bookings. This will be applied to
//               all sessions immediately.
//             </Text>

//             <Box className="mt-4 border border-gray3  w-[564px]">
//               <div className="px-4 py">
//                 {availableTimes?.slice(0, 1).map(({ day, id, status }) => {
//                   return (
//                     <Box>
//                       <Flex
//                         key={id}
//                         align="center"
//                         justify="between"
//                         className="py-3 border-b border-gray3"
//                       >
//                         <Text as="p" weight="medium" size="2">
//                           {day}
//                         </Text>
//                         <Text
//                           as="p"
//                           weight="regular"
//                           size="2"
//                           className="text-left"
//                         >
//                           {status}
//                         </Text>
//                         <Switch
//                           variant="soft"
//                           size="2"
//                           checked={isBlockedOutDaysSwitchEnabled}
//                           onCheckedChange={handleBlockedOutSwitchChange}
//                         />
//                       </Flex>

//                       {isBlockedOutDaysSwitchEnabled && (
//                         <>
//                           <Flex
//                             align="center"
//                             justify="between"
//                             className="my-4"
//                           >
//                             <Flex key={id} align="center">
//                               <Select.Root size="1">
//                                 <Select.Trigger
//                                   placeholder="Wed, 12 Dec 2024"
//                                   className="w-[140px]"
//                                 />
//                                 <Select.Content variant="soft">
//                                   <Select.Group>
//                                     <Select.Label>Fruits</Select.Label>
//                                     <Select.Item value="orange">
//                                       Orange
//                                     </Select.Item>
//                                     <Select.Item value="apple">
//                                       Apple
//                                     </Select.Item>
//                                     <Select.Item value="grape" disabled>
//                                       Grape
//                                     </Select.Item>
//                                   </Select.Group>
//                                 </Select.Content>
//                               </Select.Root>
//                               <Text
//                                 as="p"
//                                 size="1"
//                                 weight="regular"
//                                 className="px-6"
//                               >
//                                 To
//                               </Text>
//                               <Select.Root size="1">
//                                 <Select.Trigger
//                                   className="w-[140px]"
//                                   placeholder="Mon, 17 Dec 2024"
//                                 />
//                                 <Select.Content>
//                                   <Select.Group>
//                                     <Select.Label>Fruits</Select.Label>
//                                     <Select.Item value="orange">
//                                       Orange
//                                     </Select.Item>
//                                     <Select.Item value="apple">
//                                       Apple
//                                     </Select.Item>
//                                     <Select.Item value="grape" disabled>
//                                       Grape
//                                     </Select.Item>
//                                   </Select.Group>
//                                 </Select.Content>
//                               </Select.Root>
//                             </Flex>

//                             <IconButton
//                               style={{
//                                 border: "1px solid var(--border-gray)",
//                               }}
//                               className="bg-transparent text-neutral_11"
//                               size="1"
//                             >
//                               <TrashIcon />
//                             </IconButton>
//                           </Flex>
//                           <Button
//                             style={{
//                               border: "1px solid var(--border-gray)",
//                             }}
//                             size="1"
//                             className="text-sm font-medium bg-transparent text-neutral_11 mb-4"
//                           >
//                             <PlusIcon /> Add Blockout Dates
//                           </Button>
//                         </>
//                       )}
//                     </Box>
//                   );
//                 })}
//               </div>
//             </Box>
//           </Flex>
//         </Flex>
//       )}
//     </>
//   );
// };

// export { Calendar };
import { Box, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
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
  mapIdsToWeekdays,
  numberToWeekday,
} from "../../utils/util";
import { CustomCheckBox } from "../../components/ui/CustomCheckBox";

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
        schedule: doctorAvailableSessions?.data?.map((day: DaySchedule) => [
          day.publicId,
          day,
        ]),
      },
    });

  const submitAvailableSessions = (data: any) => {
    console.log(getValues());
    const scheduleData = getValues("schedule");
    if (!doctorProfile?.data?.publicId) return;

    // Prepare data for each day
    // mapIdsToWeekdays
    updateDoctorAvailableSessionMutation.mutate({
      doctorPublicId: doctorProfile.data.publicId,
      dayOfTheWeek: numberToWeekday(selectedID),
      localTimes: scheduleData?.localTimes?.map(
        (slot: { startTime: string; endTime: string }) =>
          convertToLocalTimeFormat(slot.startTime)
      ),
      available: true,
      recurring: data.recurring,
      timeZone: {
        id: "string",
        displayName: "string",
        dstsavings: 1073741824,
        rawOffset: 1073741824,
      },
    });
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
            {doctorAvailableSessions?.data.map((day: DaySchedule) => (
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
