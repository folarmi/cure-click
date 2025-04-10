/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, IconButton, Switch, Text } from "@radix-ui/themes";
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
import { availableTimes, sessionsData } from "../../utils/data";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

const Calendar = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  // const { fields, append, remove } = useFieldArray({
  //   name: "addPeriod",
  // });
  // const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isBlockedOutDaysSwitchEnabled, setIsBlockedOutDaysSwitchEnabled] =
    useState(true);

  // const handleSwitchChange = (id: string) => {
  //   setIsSwitchEnabled(!isSwitchEnabled);
  //   setSelectedID(id);
  // };

  // const handleToggleDay = (publicId: string) => {
  //   setExpandedDay((prev) => (prev === publicId ? null : publicId));
  // };

  const handleBlockedOutSwitchChange = () => {
    setIsBlockedOutDaysSwitchEnabled((prevState) => !prevState);
  };

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
        <Flex className="mt-10">
          <Box>
            <Text as="p" size="4" className="text-gray12 font-semibold">
              Availability Hours
            </Text>
            <Text
              as="p"
              size="3"
              className="text-gray11 font-medium pt-1 w-[316px]"
            >
              Setup your Schedule to assist patients know when to book sessions
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
                <Text
                  size="2"
                  className="text-text pl-2"
                  weight="regular"
                  as="p"
                >
                  Make Recurring
                </Text>
              </div>
            )}

            <Button
              className="bg-grass9 text-base font-medium mb-4"
              loading={updateDoctorAvailableSessionMutation.isPending}
              disabled={updateDoctorAvailableSessionMutation.isPending}
              onClick={submitAvailableSessions}
            >
              Save Schedule{" "}
            </Button>
          </Box>

          <Flex direction="column" align="center" className=" w-full mx-auto">
            <Text as="p" size="4" className="text-gray12 font-semibold">
              Blockout Dates
            </Text>

            <Text
              as="p"
              size="3"
              className="text-gray11 font-medium pt-1 w-[546px]"
            >
              Add days you do not want to get bookings. This will be applied to
              all sessions immediately.
            </Text>

            <Box className="mt-4 border border-gray3  w-[564px]">
              <div className="px-4 py">
                {availableTimes?.slice(0, 1).map(({ day, id, status }) => {
                  return (
                    <Box>
                      <Flex
                        key={id}
                        align="center"
                        justify="between"
                        className="py-3 border-b border-gray3"
                      >
                        <Text as="p" weight="medium" size="2">
                          {day}
                        </Text>
                        <Text
                          as="p"
                          weight="regular"
                          size="2"
                          className="text-left"
                        >
                          {status}
                        </Text>
                        <Switch
                          variant="soft"
                          size="2"
                          checked={isBlockedOutDaysSwitchEnabled}
                          onCheckedChange={handleBlockedOutSwitchChange}
                        />
                      </Flex>

                      {isBlockedOutDaysSwitchEnabled && (
                        <>
                          <Flex
                            align="center"
                            justify="between"
                            className="my-4"
                          >
                            <Flex key={id} align="center">
                              <Select.Root size="1">
                                <Select.Trigger
                                  placeholder="Wed, 12 Dec 2024"
                                  className="w-[140px]"
                                />
                                <Select.Content variant="soft">
                                  <Select.Group>
                                    <Select.Label>Fruits</Select.Label>
                                    <Select.Item value="orange">
                                      Orange
                                    </Select.Item>
                                    <Select.Item value="apple">
                                      Apple
                                    </Select.Item>
                                    <Select.Item value="grape" disabled>
                                      Grape
                                    </Select.Item>
                                  </Select.Group>
                                </Select.Content>
                              </Select.Root>
                              <Text
                                as="p"
                                size="1"
                                weight="regular"
                                className="px-6"
                              >
                                To
                              </Text>
                              <Select.Root size="1">
                                <Select.Trigger
                                  className="w-[140px]"
                                  placeholder="Mon, 17 Dec 2024"
                                />
                                <Select.Content>
                                  <Select.Group>
                                    <Select.Label>Fruits</Select.Label>
                                    <Select.Item value="orange">
                                      Orange
                                    </Select.Item>
                                    <Select.Item value="apple">
                                      Apple
                                    </Select.Item>
                                    <Select.Item value="grape" disabled>
                                      Grape
                                    </Select.Item>
                                  </Select.Group>
                                </Select.Content>
                              </Select.Root>
                            </Flex>

                            <IconButton
                              style={{
                                border: "1px solid var(--border-gray)",
                              }}
                              className="bg-transparent text-neutral_11"
                              size="1"
                            >
                              <TrashIcon />
                            </IconButton>
                          </Flex>
                          <Button
                            style={{
                              border: "1px solid var(--border-gray)",
                            }}
                            size="1"
                            className="text-sm font-medium bg-transparent text-neutral_11 mb-4"
                          >
                            <PlusIcon /> Add Blockout Dates
                          </Button>
                        </>
                      )}
                    </Box>
                  );
                })}
              </div>
            </Box>
          </Flex>
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

// <Flex className="mt-10">
//   <Box>
//     <Text as="p" size="4" className="text-gray12 font-semibold">
//       Availability Hours
//     </Text>
//     <Text as="p" size="3" className="text-gray11 font-medium pt-1 w-[316px]">
//       Setup your Schedule to assist patients know when to book sessions
//     </Text>

//     <Box className="mt-4 border border-gray3  w-[564px]">
//       {doctorAvailableSessions?.data?.map(
//         ({ dayOfTheWeek, publicId, localTimes }) => (
//           <DayScheduleItem
//             key={publicId}
//             dayOfTheWeek={dayOfTheWeek}
//             publicId={publicId}
//             defaultPeriods={localTimes}
//             isExpanded={expandedDay === publicId}
//             onToggle={handleToggleDay}
//             control={control}
//             watch={watch}
//           />
//         )
//       )}
//     </Box>

//     <div className="flex items-center my-4">
//       <Checkbox className="data-[state=checked]:bg-red-500" />
//       <Text size="2" className="text-text pl-2" weight="regular" as="p">
//         Make Recurring
//       </Text>
//     </div>
//     <Button
//       className="bg-grass9 text-base font-medium mb-4"
//       loading={updateDoctorAvailableSessionMutation.isPending}
//       disabled={updateDoctorAvailableSessionMutation.isPending}
//       onClick={submitAvailableSessions}
//     >
//       Save Schedule{" "}
//     </Button>
//   </Box>

//   <Flex direction="column" align="center" className=" w-full mx-auto">
//     <Text as="p" size="4" className="text-gray12 font-semibold">
//       Blockout Dates
//     </Text>

//     <Text as="p" size="3" className="text-gray11 font-medium pt-1 w-[546px]">
//       Add days you do not want to get bookings. This will be applied to all
//       sessions immediately.
//     </Text>

//     <Box className="mt-4 border border-gray3  w-[564px]">
//       <div className="px-4 py">
//         {availableTimes?.slice(0, 1).map(({ day, id, status }) => {
//           return (
//             <Box>
//               <Flex
//                 key={id}
//                 align="center"
//                 justify="between"
//                 className="py-3 border-b border-gray3"
//               >
//                 <Text as="p" weight="medium" size="2">
//                   {day}
//                 </Text>
//                 <Text as="p" weight="regular" size="2" className="text-left">
//                   {status}
//                 </Text>
//                 <Switch
//                   variant="soft"
//                   size="2"
//                   checked={isBlockedOutDaysSwitchEnabled}
//                   onCheckedChange={handleBlockedOutSwitchChange}
//                 />
//               </Flex>

//               {isBlockedOutDaysSwitchEnabled && (
//                 <>
//                   <Flex align="center" justify="between" className="my-4">
//                     <Flex key={id} align="center">
//                       <Select.Root size="1">
//                         <Select.Trigger
//                           placeholder="Wed, 12 Dec 2024"
//                           className="w-[140px]"
//                         />
//                         <Select.Content variant="soft">
//                           <Select.Group>
//                             <Select.Label>Fruits</Select.Label>
//                             <Select.Item value="orange">Orange</Select.Item>
//                             <Select.Item value="apple">Apple</Select.Item>
//                             <Select.Item value="grape" disabled>
//                               Grape
//                             </Select.Item>
//                           </Select.Group>
//                         </Select.Content>
//                       </Select.Root>
//                       <Text as="p" size="1" weight="regular" className="px-6">
//                         To
//                       </Text>
//                       <Select.Root size="1">
//                         <Select.Trigger
//                           className="w-[140px]"
//                           placeholder="Mon, 17 Dec 2024"
//                         />
//                         <Select.Content>
//                           <Select.Group>
//                             <Select.Label>Fruits</Select.Label>
//                             <Select.Item value="orange">Orange</Select.Item>
//                             <Select.Item value="apple">Apple</Select.Item>
//                             <Select.Item value="grape" disabled>
//                               Grape
//                             </Select.Item>
//                           </Select.Group>
//                         </Select.Content>
//                       </Select.Root>
//                     </Flex>

//                     <IconButton
//                       style={{
//                         border: "1px solid var(--border-gray)",
//                       }}
//                       className="bg-transparent text-neutral_11"
//                       size="1"
//                     >
//                       <TrashIcon />
//                     </IconButton>
//                   </Flex>
//                   <Button
//                     style={{
//                       border: "1px solid var(--border-gray)",
//                     }}
//                     size="1"
//                     className="text-sm font-medium bg-transparent text-neutral_11 mb-4"
//                   >
//                     <PlusIcon /> Add Blockout Dates
//                   </Button>
//                 </>
//               )}
//             </Box>
//           );
//         })}
//       </div>
//     </Box>
//   </Flex>
// </Flex>;
