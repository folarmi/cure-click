/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Flex,
  IconButton,
  Select,
  Switch,
  Text,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import {
  useCallback,
  useEffect,
  // useLayoutEffect,
  useRef,
  useState,
} from "react";
import { DayScheduleItem } from "./DaySchedule";
import { CalendarFormValues, DaySchedule } from "../../utils/types";
import {
  useCustomMutation,
  useGetDoctorAvailableSessions,
  useGetDoctorProfile,
} from "../../lib/apiCalls";
import { Loader } from "../../components/ui/Loader";
import {
  convertToLocalTimeFormat,
  getFullDayNameFromPublicId,
  transformScheduleToFormDefaults,
} from "../../utils/util";
import { CustomCheckBox } from "../../components/ui/CustomCheckBox";
import { availableTimes } from "../../utils/data";
import { CalendarIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { DoctorDashboardHeader } from "../../components/ui/DoctorDashboardHeader";
import { AppointmentTab } from "../../components/atoms/AppointmentTab";
import { RootState } from "../../lib/store";
import { useAppSelector } from "../../lib/hook";
import api from "../../lib/axios";
import { toast } from "react-toastify";

const Calendar = () => {
  const queryClient = useQueryClient();
  const { publicId } = useAppSelector((state: RootState) => state.auth);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  // const expandedDayRef = useRef(expandedDay);

  const [isBlockedOutDaysSwitchEnabled, setIsBlockedOutDaysSwitchEnabled] =
    useState(true);

  const handleBlockedOutSwitchChange = () => {
    setIsBlockedOutDaysSwitchEnabled((prevState) => !prevState);
  };

  const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
    useGetDoctorProfile();
  const {
    data: doctorAvailableSessions,
    isLoading: doctorAvailableSessionsIsLoading,
  } = useGetDoctorAvailableSessions(doctorProfile?.data?.publicId);

  const updateDoctorAvailableSessionMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/available-sessions`,
    successMessage: () => "Available Sessions Updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "put",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetDoctorAvailableSessions"],
      });
      // setValue(`schedule.${day.publicId}.available`, checked);
    },
  });

  const { control, watch, setValue, getValues, reset } =
    useForm<CalendarFormValues>({
      defaultValues: transformScheduleToFormDefaults(
        doctorAvailableSessions?.data?.sessions ?? []
      ),
    });

  const getValuesRef = useRef(getValues);
  getValuesRef.current = getValues;

  const updateRecurringSessionMutation = useCustomMutation({
    // endpoint: `appointment/api/doctors/${publicId}/available-sessions/recurring-sessions?recurring=true`,
    endpoint: "dummy-endpoint",
    successMessage: () => "Reoccurrence updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "patch",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetDoctorAvailableSessions"],
      });
    },
  });

  const handleRecurringToggle = () => {
    const currentRecurring = getValues("recurring");
    const actualEndpoint = `appointment/api/doctors/${publicId}/available-sessions/recurring-sessions?recurring=${currentRecurring}`;

    // 3. Use axios directly with the mutation's options
    api
      .patch(
        actualEndpoint,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        updateRecurringSessionMutation.isSuccess;
      })
      .catch(() => {
        updateRecurringSessionMutation.isError;
      });
  };

  useEffect(() => {
    if (doctorAvailableSessions?.data) {
      // Assuming doctorAvailableSessions.data is the raw data from the backend
      const transformedData = transformScheduleToFormDefaults(
        doctorAvailableSessions.data
      );

      // Reset the form values after transforming the data
      reset(transformedData);
    }
  }, [doctorAvailableSessions?.data, reset]);

  // const submitAvailableSessions = async () => {
  //   const scheduleData = getValues("schedule");
  //   const dayIdOrder = Object.keys(getValues("schedule"));
  //   const day = expandedDayRef.current;

  //   if (!day) {
  //     console.warn("No expanded day selected");
  //     return;
  //   }

  //   const payload = {
  //     doctorPublicId: doctorProfile?.data?.publicId,
  //     dayOfTheWeek: getFullDayNameFromPublicId(day, dayIdOrder),
  //     localTimes:
  //       expandedDay &&
  //       scheduleData[day]?.localTimes.map(
  //         (slot: { startTime: string; endTime: string }) =>
  //           convertToLocalTimeFormat(slot.startTime)
  //       ),
  //     available: getValues(`schedule.${day}.available`) || false,
  //     timeZone: "Africa/Lagos",
  //   };
  //   console.log(scheduleData[day]);
  // };

  const submitAvailableSessions = useCallback(
    async (specificDay?: string) => {
      // Use parameter if provided, otherwise fall back to state
      const targetDay = specificDay ?? expandedDay;

      if (!targetDay) {
        console.warn("No day selected");
        return;
      }

      const scheduleData = getValues("schedule");
      const dayIdOrder = Object.keys(scheduleData);

      const payload = {
        doctorPublicId: doctorProfile?.data?.publicId,
        dayOfTheWeek: getFullDayNameFromPublicId(targetDay, dayIdOrder),
        localTimes: scheduleData[targetDay]?.localTimes?.map((slot) =>
          convertToLocalTimeFormat(slot.startTime)
        ),
        available: getValues(`schedule.${targetDay}.available`) || false,
        timeZone: "Africa/Lagos",
      };

      await updateDoctorAvailableSessionMutation.mutateAsync(payload);
    },
    [expandedDay, doctorProfile?.data?.publicId, getValues]
  );

  return (
    <>
      {doctorAvailableSessionsIsLoading || doctorProfileIsLoading ? (
        <Loader />
      ) : (
        <DashboardLayout ifHeader={false}>
          <DoctorDashboardHeader
            name="Appointments"
            Icon={CalendarIcon}
            ifBreadCrumb
            routeName="Appointments"
          />
          <div className="mx-12">
            <AppointmentTab />
          </div>
          <Flex className="mt-10 mx-12">
            <Box>
              <Text as="p" size="4" className="text-gray12 font-semibold">
                Availability Hours
              </Text>
              <Text
                as="p"
                size="3"
                className="text-gray11 font-medium pt-1 w-[316px]"
              >
                Setup your Schedule to assist patients know when to book
                sessions
              </Text>

              <Box className="border rounded-lg mt-4 w-[564px]">
                {doctorAvailableSessions?.data?.sessions?.map(
                  (day: DaySchedule) => (
                    <DayScheduleItem
                      key={day?.dayOfTheWeek}
                      day={day}
                      control={control}
                      watch={watch}
                      isExpanded={expandedDay === day?.publicId}
                      onToggle={(id) =>
                        setExpandedDay(id === expandedDay ? null : id)
                      }
                      setValue={setValue}
                      // submitAvailableSessions={submitAvailableSessions}
                      submitAvailableSessions={(dayId: string | undefined) =>
                        submitAvailableSessions(dayId)
                      }
                      isAvailable={day?.available}
                    />
                  )
                )}
              </Box>

              <div className="flex items-center my-4">
                <CustomCheckBox
                  name={`recurring`}
                  control={control}
                  text="Make Recurring"
                  onClick={handleRecurringToggle}
                />
              </div>

              <Button
                className="bg-grass9 text-base font-medium my-4"
                loading={updateDoctorAvailableSessionMutation.isPending}
                disabled={updateDoctorAvailableSessionMutation.isPending}
                onClick={() => {
                  if (!expandedDay) {
                    toast.warn("No day selected");
                    return;
                  }
                  submitAvailableSessions(expandedDay);
                }}
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
                Add days you do not want to get bookings. This will be applied
                to all sessions immediately.
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
        </DashboardLayout>
      )}
    </>
  );
};

export { Calendar };
