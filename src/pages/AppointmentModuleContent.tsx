import { Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
import { CustomText } from "../components/ui/CustomText";
import { MeetingCard } from "../components/cards/MeetingCard";
import { RootState } from "../lib/store";
import { useSelector } from "react-redux";
import { daysOfTheWeek } from "../utils/data";
import MeetingCardTwo from "../components/cards/MeetingCardTwo";

const AppointmentModuleContent = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <Flex justify="center" className="px-12 mt-10">
      <Box className="w-[28%]">
        {userType === "doctor" && (
          <>
            {" "}
            <Box className="border border-gray3 rounded-lg p-6 my-4">
              <Text
                as="p"
                size="2"
                weight="medium"
                className="text-gray12 pb-1"
              >
                Days Available
              </Text>

              <Flex align="center" justify="between">
                {daysOfTheWeek?.map(({ filled, id, name }) => {
                  return (
                    <Box
                      key={id}
                      className={`h-9 w-9 rounded-full border border-gray3 py-[6px] pr-3 px-[11px] ${
                        filled ? "bg-iris9" : ""
                      }`}
                    >
                      <Text
                        size="3"
                        weight="medium"
                        className={`text-center ${
                          filled ? "text-iris3" : "text-gray11"
                        }`}
                      >
                        {name}
                      </Text>
                    </Box>
                  );
                })}
              </Flex>

              <Text
                size="1"
                as="p"
                weight="regular"
                className="text-gray11 py-4"
              >
                You have 12 Sessions this week
              </Text>

              <Button
                style={{
                  border: "1px solid var(--border-gray)",
                }}
                size="2"
                className="font-medium text-sm bg-white text-neutral_11"
              >
                Update Days Available
              </Button>
            </Box>
          </>
        )}
        <div>
          <CustomText className="text-gray_12" size="large" weight="semibold">
            Upcoming Appointments
          </CustomText>
          <CustomText
            className="text-gray_11 pb-4"
            size="medium"
            weight="normal"
          >
            View your upcoming appointments.
          </CustomText>
        </div>

        <MeetingCard
          title="Second Opinion on scheduled Cancer surgery"
          date="Today"
          time="11:30PM GMT+1 ( In 30 min)"
          doctorName="Dr. Alison Ogaga"
          patientName="Kemi Ukpong"
          speciality="General Practioner"
          onClick={toggleModal}
          cancelOnClick={toggleCancel}
          rescheduleOnClick={toggleRescheduleModal}
        />
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          doctorName="Dr. Alison Ogaga"
          onClick={toggleMeetingCardTwoModal}
        />
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          doctorName="Dr. Alison Ogaga"
          onClick={toggleCompletedAppointment}
        />
      </Box>

      <Box className="w-[72%] ml-6">
        {userType === "doctor" && (
          <div className="bg-white border border-gray3 rounded-lg p-6 my-4">
            <Text as="p" size="2" weight="medium" className="pb-1">
              Achievements
            </Text>
            <Flex
              align="center"
              justify="between"
              className="w-full flex-wrap "
            >
              <img src={medalOne} />
              <img src={medalTwo} />
              <img src={medalThree} />
              <img src={medalFour} />
              <img src={medalOne} />
              <img src={medalTwo} />
              <img src={medalThree} />
              <img src={medalFour} />
            </Flex>
          </div>
        )}

        <CustomText className="text-gray_12" size="large" weight="semibold">
          Appointment History
        </CustomText>
        <CustomText className="text-gray_11 pb-4" size="medium" weight="normal">
          View your appointment history.
        </CustomText>

        <Tabs.Root className="" defaultValue="allAppointments">
          <Tabs.List>
            <Tabs.Trigger value="allAppointments">
              All Appointments
            </Tabs.Trigger>
            <Tabs.Trigger value="upcomingAppointments">
              Upcoming Appointments
            </Tabs.Trigger>
            <Tabs.Trigger value="completedAppointments">
              Completed Appointments
            </Tabs.Trigger>
            <Tabs.Trigger value="cancelledAppointments">
              Cancelled Appointments
            </Tabs.Trigger>
            {userType === "doctor" && (
              <Tabs.Trigger value="cancelledAppointments">
                Rescheduled
              </Tabs.Trigger>
            )}
          </Tabs.List>

          <Tabs.Content className=" w-full" value="allAppointments">
            {userType === "patient" && (
              <Table columns={columns} data={appointmentSampleData} />
            )}
            {userType === "doctor" && (
              <Table columns={doctorColumns} data={doctorSampleData} />
            )}
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Flex>
  );
};

export { AppointmentModuleContent };
