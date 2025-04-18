import { Box, Button, Flex, Text } from "@radix-ui/themes";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { DashboardHeader } from "../../components/ui/DashboardHeader";
import { CalendarIcon } from "@radix-ui/react-icons";
import { RootState } from "../../lib/store";
import { useSelector } from "react-redux";
import { DoctorDashboardHeader } from "../../components/ui/DoctorDashboardHeader";
import medalOne from "../../assets/medalOne.svg";
import medalTwo from "../../assets/medalTwo.svg";
import medalFour from "../../assets/medalFour.svg";
import medalThree from "../../assets/medalThree.svg";
import { ModuleContent } from "./ModuleContent";
import { TableContent } from "./TableContent";
// import { Calendar } from "./Calendar";

import { AppointmentTab } from "../../components/atoms/AppointmentTab";
import {
  useGetData,
  useGetDoctorAvailableSessions,
  useGetDoctorProfile,
} from "../../lib/apiCalls";
import {
  getTotalAvailableTimes,
  transformAvailabilityToDays,
} from "../../utils/calendarutil";
import { Link } from "react-router-dom";
import { Loader } from "../../components/ui/Loader";

const Appointments = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  const { data: doctorProfile } = useGetDoctorProfile(userType === "doctor");

  const { data: doctorAvailableSessions } = useGetDoctorAvailableSessions(
    doctorProfile?.data?.publicId,
    userType === "doctor"
  );

  const { data: profileData, isLoading: profileDataIsLoading } = useGetData({
    url: `appointment/api/patients/profile`,
    queryKey: ["GetPatientProfile"],
    enabled: userType === "patient",
  });

  const { data: appointmentsData, isLoading: appointmentsDataIsLoading } =
    useGetData({
      url: `appointment/api/patients/${profileData?.data?.publicId}/appointments`,
      queryKey: ["GetAllAppointments"],
      enabled: !!profileData?.data?.publicId && userType === "patient",
    });

  return (
    <>
      {profileDataIsLoading || appointmentsDataIsLoading ? (
        <Loader />
      ) : (
        <DashboardLayout ifHeader={false}>
          {userType === "patient" ? (
            <DashboardHeader
              routeName="Appointments"
              Icon={CalendarIcon}
              ifNameAndWalletBalance={false}
            />
          ) : (
            <DoctorDashboardHeader
              name="Appointments"
              Icon={CalendarIcon}
              ifBreadCrumb
              routeName="Appointments"
            />
          )}

          {/* Doctor */}
          {userType === "doctor" && (
            <>
              <div className="mx-12">
                <AppointmentTab />
              </div>

              {/* {activeTab === "Appointment History" && ( */}
              <Flex justify="center" className="px-12">
                <Box className="w-[28%]">
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
                      {transformAvailabilityToDays(
                        doctorAvailableSessions?.data?.sessions
                      )?.map(({ filled, id, name }) => {
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
                      You have{" "}
                      {getTotalAvailableTimes(
                        doctorAvailableSessions?.data?.sessions
                      )}{" "}
                      Sessions this week
                    </Text>

                    <Link to="/dashboard/appointments/calendar">
                      <Button
                        style={{
                          border: "1px solid var(--border-gray)",
                        }}
                        size="2"
                        className="font-medium text-sm bg-white text-neutral_11"
                      >
                        Update Days Available
                      </Button>
                    </Link>
                  </Box>
                  <ModuleContent />
                </Box>

                <Box className="w-[72%] ml-6">
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
                  <TableContent />
                </Box>
              </Flex>
              {/* )} */}

              {/* {activeTab === "Appointment Calendar" && <Calendar />} */}
            </>
          )}

          {/* Patient */}
          {userType === "patient" && (
            <Flex
              justify="center"
              className="flex-col md:flex-row px-4 md:px-10 mt-10"
            >
              <Box className="w-[28%]">
                <ModuleContent appointmentsData={appointmentsData} />
              </Box>

              <Box className="w-full md:w-[72%] md:ml-6">
                <TableContent appointmentsData={appointmentsData} />
              </Box>
            </Flex>
          )}
        </DashboardLayout>
      )}
    </>
  );
};

export { Appointments };
