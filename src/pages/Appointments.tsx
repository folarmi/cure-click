/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Button,
  ChevronDownIcon,
  Flex,
  Tabs,
  Text,
} from "@radix-ui/themes";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { DashboardHeader } from "../components/ui/DashboardHeader";
import { MeetingCard } from "../components/cards/MeetingCard";
import { CustomText } from "../components/ui/CustomText";
import MeetingCardTwo from "../components/cards/MeetingCardTwo";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../components/ui/Table";
import avatar from "../assets/avatar.svg";

// import { useState } from "react";
import { appointmentSampleData } from "../utils/data";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import AppointmentDetails from "../components/modals/AppointmentDetails";
import { MeetingTwoDetailsCard } from "../components/modals/MeetingTwoDetailsCard";
import CancelAppointment from "../components/modals/CancelAppointment";
import CompletedAppointment from "../components/modals/CompletedAppointment";
import { CancelAppointmentTwo } from "../components/modals/CancelAppointmentTwo";
import { Reschedule } from "../components/modals/Reschedule";
import { RescheduleTwo } from "../components/modals/RescheduleTwo";

const Appointments = () => {
  const [modal, setModal] = useState(false);
  const [meetingCardTwoModal, setMeetingCardTwoModal] = useState(false);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [completedAppointment, setCompletedAppointment] = useState(false);
  const [meetingTwoCancel, setMeetingTwoCancel] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [rescheduleModalTwo, setRescheduleModalTwo] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleMeetingCardTwoModal = () => {
    setMeetingCardTwoModal(!meetingCardTwoModal);
  };

  const toggleCancel = () => {
    setCancelAppointment(!cancelAppointment);
  };

  const toggleCompletedAppointment = () => {
    setCompletedAppointment(!completedAppointment);
  };

  const toggleMeetingTwoCancel = () => {
    if (meetingCardTwoModal) {
      setMeetingCardTwoModal(false);
    }
    setMeetingTwoCancel(!meetingTwoCancel);
  };

  const toggleRescheduleModal = () => {
    setRescheduleModal(!rescheduleModal);
  };

  const toggleRescheduleTwoModal = () => {
    setRescheduleModalTwo(!rescheduleModalTwo);
  };

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("nameOfDoc", {
      header: "Name",
      cell: (info) => {
        const docName = info.getValue();
        const docType = info.row.original.docType;

        return (
          <div className="flex items-center">
            <img src={avatar} />
            <div className="ml-2">
              <CustomText
                className="text-iris12 font-semibold"
                weight="medium"
                size="medium"
              >
                {docName}
              </CustomText>
              <CustomText className="text-gray12" weight="normal" size="small">
                {docType}
              </CustomText>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("summaryTitle", {
      header: "Appointment Summary",
      cell: (info) => {
        const summaryTitle = info.getValue();
        const summaryText = info.row.original.summaryText;

        return (
          <Box>
            <Text size="3" className="text-iris12" weight="medium" as="p">
              {summaryTitle}
            </Text>
            <Text size="2" className="text-gray11" weight="regular" as="p">
              {summaryText}
            </Text>
          </Box>
        );
      },
    }),

    columnHelper.accessor("date", {
      header: "Date & Time",
      cell: (info) => {
        const date = info.getValue();
        const time = info.row.original.time;

        return (
          <Box>
            <Text size="2" className="text-gray12" weight="medium" as="p">
              {date}
            </Text>
            <Text size="2" className="text-gray10" weight="regular" as="p">
              {time}
            </Text>
          </Box>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge
          size="2"
          variant="soft"
          className={`font-medium ${
            info.getValue() === "Upcoming"
              ? "bg-blueA3 text-blueA11"
              : "bg-tomatoA3 text-tomatoA11"
          }`}
        >
          {info.getValue()}
        </Badge>
      ),
    }),

    // Display Column
    columnHelper.display({
      id: "actions",
      cell: () => (
        <Button variant="surface" className="">
          Actions
          <ChevronDownIcon />
        </Button>
      ),
    }),
  ];
  return (
    <DashboardLayout ifHeader={false}>
      <DashboardHeader ifNameAndWalletBalance={false} />

      <Flex justify="center" className="px-12 mt-10">
        <Box className="w-[24%]">
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

        <Box className="w-[76%] ml-6">
          <div>
            <CustomText className="text-gray_12" size="large" weight="semibold">
              Appointment History
            </CustomText>
            <CustomText
              className="text-gray_11 pb-4"
              size="medium"
              weight="normal"
            >
              View your appointment history.
            </CustomText>
          </div>

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
            </Tabs.List>

            <Tabs.Content className=" w-full" value="allAppointments">
              <Table columns={columns} data={appointmentSampleData} />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Flex>

      <Modal show={modal} toggleModal={toggleModal}>
        <div className="p-4">
          <AppointmentDetails toggleModal={toggleModal} />
        </div>
      </Modal>

      <Modal show={meetingCardTwoModal} toggleModal={toggleMeetingCardTwoModal}>
        <div className="p-4">
          <MeetingTwoDetailsCard
            toggleModal={toggleMeetingCardTwoModal}
            toggleMeetingTwoCancel={toggleMeetingTwoCancel}
          />
        </div>
      </Modal>

      <Modal
        show={completedAppointment}
        toggleModal={toggleCompletedAppointment}
      >
        <div className="p-4">
          <CompletedAppointment
            toggleModal={toggleCompletedAppointment}
            // ifCompleted={false}
          />
        </div>
      </Modal>

      <Modal show={cancelAppointment} toggleModal={toggleCancel}>
        <div className="p-4">
          <CancelAppointment toggleModal={toggleCancel} />
        </div>
      </Modal>

      <Modal show={meetingTwoCancel} toggleModal={toggleMeetingTwoCancel}>
        <div className="p-4">
          <CancelAppointmentTwo toggleModal={toggleMeetingTwoCancel} />
        </div>
      </Modal>

      <Modal show={rescheduleModal} toggleModal={toggleRescheduleModal}>
        <div className="p-4">
          <Reschedule toggleModal={toggleRescheduleModal} />
        </div>
      </Modal>

      <Modal show={rescheduleModalTwo} toggleModal={toggleRescheduleTwoModal}>
        <div className="p-4">
          <RescheduleTwo toggleModal={toggleRescheduleTwoModal} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export { Appointments };
