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
import { useEffect, useState } from "react";
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
  // getTimeZoneInfo,
} from "../../utils/util";
import { CustomCheckBox } from "../../components/ui/CustomCheckBox";
import { availableTimes } from "../../utils/data";
import { CalendarIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { DoctorDashboardHeader } from "../../components/ui/DoctorDashboardHeader";
import { AppointmentTab } from "../../components/atoms/AppointmentTab";

const Calendar = () => {
  const queryClient = useQueryClient();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
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
    },
  });

  const { control, watch, setValue, getValues, reset } =
    useForm<CalendarFormValues>({
      defaultValues: transformScheduleToFormDefaults(
        doctorAvailableSessions?.data?.sessions ?? []
      ),
    });

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

  const submitAvailableSessions = async () => {
    const scheduleData = getValues("schedule");
    const payload = {
      doctorPublicId: doctorProfile?.data?.publicId,
      dayOfTheWeek: getFullDayNameFromPublicId(expandedDay),
      localTimes:
        expandedDay &&
        scheduleData[expandedDay]?.localTimes.map(
          (slot: { startTime: string; endTime: string }) =>
            convertToLocalTimeFormat(slot.startTime)
        ),
      available: getValues(`schedule.${expandedDay}.available`) || false,
      recurring: getValues(`recurring`),
      // timeZone: getTimeZoneInfo(),
      timeZone: "Africa/Lagos",
    };

    updateDoctorAvailableSessionMutation.mutateAsync(payload);
  };

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
                      key={day.dayOfTheWeek}
                      day={day}
                      control={control}
                      watch={watch}
                      isExpanded={expandedDay === day.publicId}
                      onToggle={(id) =>
                        setExpandedDay(id === expandedDay ? null : id)
                      }
                      setValue={setValue}
                      submitAvailableSessions={submitAvailableSessions}
                    />
                  )
                )}
              </Box>

              <div className="flex items-center my-4">
                <CustomCheckBox
                  name={`recurring`}
                  control={control}
                  text="   Make Recurring"
                />
              </div>

              <Button
                className="bg-grass9 text-base font-medium my-4"
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
