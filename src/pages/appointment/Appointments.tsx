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
import { useGetData, useGetDoctorAvailableSessions } from "../../lib/apiCalls";
import {
  getTotalAvailableTimes,
  transformAvailabilityToDays,
} from "../../utils/calendarutil";
import { Link } from "react-router-dom";
import { Loader } from "../../components/ui/Loader";
import { useState } from "react";
import { Appointment, emptyAppointment } from "../../utils/types";
import { useForm } from "react-hook-form";

const Appointments = () => {
  const { control, getValues } = useForm();

  const [modal, setModal] = useState(false);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [cancelledDetails, setCancelledDetails] = useState(false);
  const [upcomingDetails, setUpcomingDetails] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [rescheduleModalTwo, setRescheduleModalTwo] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment>(emptyAppointment);

  const { userType, publicId } = useSelector((state: RootState) => state.auth);

  const { data: doctorAvailableSessions } = useGetDoctorAvailableSessions(
    publicId,
    userType === "doctor"
  );

  const { data: appointmentsData, isLoading: appointmentsDataIsLoading } =
    useGetData({
      url: `appointment/api/appointments?patient=${publicId}&appointmentStatus=${activeTab}&page=0&size=20&sort=DESC`,
      queryKey: ["GetAllAppointments", activeTab],
      enabled: !!publicId && userType === "patient",
    });

  const { data: bookingsData, isLoading: bookingsDataIsLoading } = useGetData({
    // url: `appointment/api/doctors/${publicId}/bookings`,
    url: `appointment/api/appointments?doctor=${publicId}&appointmentStatus=${activeTab}&page=0&size=20&sort=DESC`,
    queryKey: ["GetAllAppointments", activeTab],
    enabled: !!publicId && userType === "doctor",
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleCancel = () => {
    setCancelAppointment(!cancelAppointment);
  };

  const toggleCancelledDetails = () => {
    setCancelledDetails(!cancelledDetails);
  };

  const toggleUpcomingDetails = () => {
    setUpcomingDetails(!upcomingDetails);
  };

  const toggleRescheduleTwoModal = () => {
    setRescheduleModalTwo(!rescheduleModalTwo);
  };

  const toggleRescheduleModal = () => {
    setRescheduleModal(!rescheduleModal);
  };

  return (
    <>
      {appointmentsDataIsLoading || bookingsDataIsLoading ? (
        <Loader />
      ) : (
        <DashboardLayout ifHeader={false}>
          {userType === "patient" ? (
            <DashboardHeader
              routeName="Appointments"
              Icon={CalendarIcon}
              ifNameAndWalletBalance={false}
              control={control}
              getValues={getValues}
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
                  <ModuleContent
                    appointmentsData={bookingsData?.data?.content}
                    modal={modal}
                    toggleModal={toggleModal}
                    selectedAppointment={selectedAppointment}
                    cancelAppointment={cancelAppointment}
                    toggleCancel={toggleCancel}
                    cancelledDetails={cancelledDetails}
                    upcomingDetails={upcomingDetails}
                    rescheduleModalTwo={rescheduleModalTwo}
                    rescheduleModal={rescheduleModal}
                    toggleCancelledDetails={toggleCancelledDetails}
                    toggleRescheduleTwoModal={toggleRescheduleTwoModal}
                    toggleUpcomingDetails={toggleUpcomingDetails}
                    toggleRescheduleModal={toggleRescheduleModal}
                  />
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

                  <TableContent
                    appointmentsData={bookingsData?.data?.content}
                    appointmentsDataIsLoading={bookingsDataIsLoading}
                    toggleModal={toggleModal}
                    toggleCancel={toggleCancel}
                    toggleCancelledDetails={toggleCancelledDetails}
                    toggleUpcomingDetails={toggleUpcomingDetails}
                    setSelectedAppointment={setSelectedAppointment}
                    toggleRescheduleTwoModal={toggleRescheduleTwoModal}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    selectedAppointment={selectedAppointment}
                  />
                </Box>
              </Flex>
            </>
          )}

          {/* Patient */}
          {userType === "patient" && (
            <Flex
              justify="center"
              className="flex-col md:flex-row px-4 md:px-10 mt-10"
            >
              <Box className="w-[28%]">
                <ModuleContent
                  appointmentsData={appointmentsData?.data?.content}
                  modal={modal}
                  toggleModal={toggleModal}
                  selectedAppointment={selectedAppointment}
                  cancelAppointment={cancelAppointment}
                  toggleCancel={toggleCancel}
                  cancelledDetails={cancelledDetails}
                  upcomingDetails={upcomingDetails}
                  rescheduleModalTwo={rescheduleModalTwo}
                  rescheduleModal={rescheduleModal}
                  toggleCancelledDetails={toggleCancelledDetails}
                  toggleRescheduleTwoModal={toggleRescheduleTwoModal}
                  toggleUpcomingDetails={toggleUpcomingDetails}
                  toggleRescheduleModal={toggleRescheduleModal}
                />
              </Box>

              <Box className="w-full md:w-[72%] md:ml-6">
                <TableContent
                  appointmentsData={appointmentsData?.data?.content}
                  appointmentsDataIsLoading={appointmentsDataIsLoading}
                  toggleModal={toggleModal}
                  toggleCancel={toggleCancel}
                  toggleCancelledDetails={toggleCancelledDetails}
                  toggleUpcomingDetails={toggleUpcomingDetails}
                  setSelectedAppointment={setSelectedAppointment}
                  toggleRescheduleTwoModal={toggleRescheduleTwoModal}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  selectedAppointment={selectedAppointment}
                />
              </Box>
            </Flex>
          )}
        </DashboardLayout>
      )}
    </>
  );
};

export { Appointments };
