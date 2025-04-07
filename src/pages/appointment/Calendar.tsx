/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Select,
  Switch,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { availableTimes } from "../../utils/data";
import { useForm } from "react-hook-form";
import {
  convertToLocalTimeFormat,
  numberToWeekday,
  timeSlots,
} from "../../utils/util";
import {
  useCustomMutation,
  useGetData,
  useGetDoctorProfile,
} from "../../lib/apiCalls";
import { Loader } from "../../components/ui/Loader";
import { FormValues, TimePeriod } from "../../utils/types";
import { DayScheduleItem } from "./DaySchedule";

const Calendar = () => {
  // const { fields, append, remove } = useFieldArray({
  //   name: "addPeriod",
  // });
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [isBlockedOutDaysSwitchEnabled, setIsBlockedOutDaysSwitchEnabled] =
    useState(true);
  const [selectedID, setSelectedID] = useState("");
  const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
    useGetDoctorProfile();

  const {
    data: doctorAvailableSessions,
    isLoading: doctorAvailableSessionsIsLoading,
  } = useGetData({
    url: `appointment/api/doctors/${doctorProfile?.data?.publicId}/available-sessions`,
    queryKey: ["GetDoctorAvailableSessions"],
  });

  const { control, setValue, watch, getValues, reset } = useForm<FormValues>();

  const updateDoctorAvailableSessionMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/available-sessions`,
    successMessage: () => "Available Sessions Updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "put",
    onSuccessCallback: () => {
      // toggleModal();
    },
  });

  // const handleSwitchChange = (id: string) => {
  //   setIsSwitchEnabled(!isSwitchEnabled);
  //   setSelectedID(id);
  // };

  const handleToggleDay = (publicId: string) => {
    setExpandedDay((prev) => (prev === publicId ? null : publicId));
  };

  const handleBlockedOutSwitchChange = () => {
    setIsBlockedOutDaysSwitchEnabled((prevState) => !prevState);
  };

  const startTimes = watch("addPeriod");

  // Auto-update end time when start time changes
  // useEffect(() => {
  //   if (startTimes && Array.isArray(startTimes)) {
  //     startTimes.forEach((period, index) => {
  //       if (period?.startTime) {
  //         const [startHour, startMinute] = period.startTime
  //           .split(":")
  //           .map(Number);
  //         const endHour = startHour + 1;
  //         const endTime = `${endHour}:${startMinute}`;

  //         // Check if end time exists in available slots
  //         const isValidEndTime = timeSlots.some(
  //           (slot) => slot.value === endTime
  //         );

  //         if (isValidEndTime) {
  //           setValue(`addPeriod.${index}.endTime`, endTime);
  //         }
  //       }
  //     });
  //   }
  // }, [startTimes, setValue]);

  useEffect(() => {
    if (!doctorAvailableSessions?.data || !expandedDay) return;

    // Get the current day's periods
    const dayPeriods = watch(`schedule.${expandedDay}.periods`);

    if (dayPeriods && Array.isArray(dayPeriods)) {
      dayPeriods.forEach((period, index) => {
        if (period?.startTime) {
          const [startHour, startMinute] = period.startTime
            .split(":")
            .map(Number);
          const endHour = startHour + 1;
          const endTime = `${endHour}:${startMinute}`;

          // Check if end time exists in available slots
          const isValidEndTime = timeSlots.some(
            (slot) => slot.value === endTime
          );

          if (isValidEndTime) {
            setValue(
              `schedule.${expandedDay}.periods.${index}.endTime`,
              endTime
            );
          }
        }
      });
    }
  }, [expandedDay, watch, setValue, timeSlots, doctorAvailableSessions?.data]);

  useEffect(() => {
    if (doctorAvailableSessions?.data) {
      const defaultValues = doctorAvailableSessions.data.reduce((acc, day) => {
        acc[day.publicId] = {
          periods: day.localTimes.map((time) => ({
            ...time,
            id: time.id,
          })),
        };
        return acc;
      }, {} as Record<string, { periods: TimePeriod[] }>);

      reset({ schedule: defaultValues });
    }
  }, [doctorAvailableSessions?.data, reset]);

  const submitAvailableSessions = () => {
    updateDoctorAvailableSessionMutation.mutate({
      doctorPublicId: doctorProfile?.data?.publicId,
      dayOfTheWeek: numberToWeekday(selectedID),
      localTimes: getValues("addPeriod").map(
        (slot: { startTime: string; endTime: string }) =>
          convertToLocalTimeFormat(slot.startTime)
      ),
      available: isSwitchEnabled,
    });
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

            <Box className="mt-4 border border-gray3  w-[564px]">
              {/* <div className="py">
                {doctorAvailableSessions?.data?.map(
                  ({
                    dayOfTheWeek,
                    publicId,
                    localTimes,
                  }: AvailableSessions) => {
                    return (
                      <Box
                        className="cursor-pointer"
                        onClick={() => handleSwitchChange(publicId)}
                        key={publicId}
                      >
                        <Flex
                          key={publicId}
                          align="center"
                          justify="between"
                          className="py-3 border-b border-gray3 px-4"
                        >
                          <Text as="p" weight="medium" size="2">
                            {capitalize(dayOfTheWeek)}
                          </Text>
                          <Text
                            as="p"
                            weight="regular"
                            size="2"
                            className="text-left"
                          >
                            {`${localTimes.length} availability periods`}
                          </Text>
                          <Switch
                            variant="soft"
                            size="2"
                            // checked={isSwitchEnabled && selectedID === id}
                            // onCheckedChange={() => handleSwitchChange(id)}
                          />
                        </Flex>

                        {selectedID === publicId && (
                          <>
                            <div className="px-4">
                              {fields?.map((item, index: number) => {
                                const endTimeOptions = getEndTimeOptions(
                                  index,
                                  startTimes
                                );
                                return (
                                  <Flex
                                    align="center"
                                    justify="between"
                                    className="my-4"
                                    key={item?.id}
                                  >
                                    <Flex
                                      key={publicId}
                                      align="center"
                                      className=" w-full"
                                    >
                                      <div className="w-1/3">
                                        <CustomSelect
                                          options={timeSlots}
                                          placeholder="9:00am"
                                          ifGrayBg={false}
                                          name={`addPeriod.${index}.startTime`}
                                          control={control}
                                        />
                                      </div>

                                      <Text
                                        as="p"
                                        size="1"
                                        weight="regular"
                                        className="px-6"
                                      >
                                        To
                                      </Text>

                                      <div className="w-1/3">
                                        <CustomSelect
                                          options={endTimeOptions}
                                          placeholder={
                                            endTimeOptions[0]?.label ||
                                            "10:00 AM"
                                          }
                                          name={`addPeriod.${index}.endTime`}
                                          control={control}
                                          disabled
                                        />
                                      </div>
                                    </Flex>

                                    <IconButton
                                      style={{
                                        border: "1px solid var(--border-gray)",
                                      }}
                                      className="bg-transparent text-neutral_11 cursor-pointer"
                                      size="1"
                                      onClick={() => remove(index)}
                                    >
                                      <TrashIcon />
                                    </IconButton>
                                  </Flex>
                                );
                              })}
                            </div>

                            <Button
                              style={{
                                border: "1px solid var(--border-gray)",
                              }}
                              onClick={() => {
                                append({
                                  startTime: "",
                                  endTime: "",
                                });
                              }}
                              size="1"
                              className="text-sm font-medium bg-transparent text-neutral_11 my-2 mx-4 cursor-pointer"
                            >
                              <PlusIcon /> Add Period
                            </Button>
                          </>
                        )}
                      </Box>
                    );
                  }
                )}
              </div> */}

              {/* {doctorAvailableSessions?.data?.map(
                ({ dayOfTheWeek, publicId, localTimes }: AvailableSessions) => {
                  const { fields, append, remove } = useFieldArray({
                    control,
                    name: `schedule.${publicId}.periods`,
                  });

                  return (
                    <Box
                      key={publicId}
                      className="cursor-pointer"
                      onClick={() => handleSwitchChange(publicId)}
                    >
                      <Flex
                        align="center"
                        justify="between"
                        className="py-3 border-b border-gray3 px-4"
                      >
                        <Text as="p" weight="medium" size="2">
                          {capitalize(dayOfTheWeek)}
                        </Text>
                        <Text
                          as="p"
                          weight="regular"
                          size="2"
                          className="text-left"
                        >
                          {`${fields.length} availability periods`}
                        </Text>
                        <Switch variant="soft" size="2" />
                      </Flex>

                      {selectedID === publicId && (
                        <div className="px-4">
                          {fields.map((item, index) => {
                            const endTimeOptions = getEndTimeOptions(
                              index,
                              watch(
                                `schedule.${publicId}.periods.${index}.startTime`
                              )
                            );

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
                                  <Text
                                    as="p"
                                    size="1"
                                    weight="regular"
                                    className="px-6"
                                  >
                                    To
                                  </Text>
                                  <div className="w-1/3">
                                    <CustomSelect
                                      options={endTimeOptions}
                                      placeholder={
                                        endTimeOptions[0]?.label || "10:00 AM"
                                      }
                                      name={`schedule.${publicId}.periods.${index}.endTime`}
                                      control={control}
                                    />
                                  </div>
                                </Flex>
                                <IconButton
                                  style={{
                                    border: "1px solid var(--border-gray)",
                                  }}
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
                            onClick={() =>
                              append({ startTime: "", endTime: "" })
                            }
                            size="1"
                            className="text-sm font-medium bg-transparent text-neutral_11 my-2 mx-4 cursor-pointer"
                          >
                            <PlusIcon /> Add Period
                          </Button>
                        </div>
                      )}
                    </Box>
                  );
                }
              )} */}

              {doctorAvailableSessions?.data?.map(
                ({ dayOfTheWeek, publicId, localTimes }) => (
                  <DayScheduleItem
                    key={publicId}
                    dayOfTheWeek={dayOfTheWeek}
                    publicId={publicId}
                    defaultPeriods={localTimes}
                    isExpanded={expandedDay === publicId}
                    onToggle={handleToggleDay}
                    control={control}
                    watch={watch}
                  />
                )
              )}
            </Box>

            <div className="flex items-center my-4">
              <Checkbox className="data-[state=checked]:bg-red-500" />
              <Text size="2" className="text-text pl-2" weight="regular" as="p">
                Make Recurring
              </Text>
            </div>
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
