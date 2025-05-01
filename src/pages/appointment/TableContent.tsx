/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Box, Tabs, Text } from "@radix-ui/themes";
import { CustomText } from "../../components/ui/CustomText";
import { RootState } from "../../lib/store";
import { useSelector } from "react-redux";
import Table from "../../components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import avatar from "../../assets/avatar.svg";
import { getFullName } from "../../utils/util";
import { format, parse } from "date-fns";
import { EmptyAppointment } from "../../components/emptyStates/EmptyAppointment";
import {
  Appointment,
  appointmentStatusLabels,
  getStatusClassName,
  handleStatusAction,
} from "../../utils/types";

type Prop = {
  appointmentsData: any;
  appointmentsDataIsLoading: boolean;
  selectedAppointment?: Appointment;
  toggleModal: () => void;
  toggleCancel: () => void;
  toggleCancelledDetails: () => void;
  toggleUpcomingDetails: () => void;
  toggleRescheduleTwoModal: () => void;
  setSelectedAppointment?: (appointment: Appointment) => void;
};

const TableContent = ({
  appointmentsData,
  appointmentsDataIsLoading,
  toggleModal,
  toggleCancel,
  toggleCancelledDetails,
  toggleUpcomingDetails,
  toggleRescheduleTwoModal,
  setSelectedAppointment,
}: Prop) => {
  // const { control } = useForm();
  const userType = useSelector((state: RootState) => state.auth.userType);

  const handleAction = (item: Appointment) => {
    setSelectedAppointment?.(item);
  };

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("doctor", {
      header: "Name",
      cell: (info) => {
        const docFirstName = info.row.original?.doctor?.firstname;
        const doclastName = info.row.original?.doctor?.lastname;
        const docType = info.row.original?.doctor?.specialization;
        const patientFirstName = info.row.original?.patient?.firstname;
        const patientLastName = info.row.original?.patient?.lastname;

        return (
          <div className="flex items-center">
            <img src={avatar} />
            <div className="ml-2">
              <CustomText
                className="text-iris12 font-semibold"
                weight="medium"
                size="medium"
              >
                {userType === "patient"
                  ? getFullName(docFirstName, doclastName)
                  : getFullName(patientFirstName, patientLastName)}
              </CustomText>
              {userType === "patient" && (
                <CustomText
                  className="text-gray12"
                  weight="normal"
                  size="small"
                >
                  {docType || "N/A"}
                </CustomText>
              )}
            </div>
          </div>
        );
      },
    }),

    columnHelper.accessor("details", {
      header: "Appointment Summary",
      cell: (info) => {
        const summaryText = info.row.original?.topic;
        return (
          <Box>
            <Text size="3" className="text-iris12" weight="medium" as="p">
              {info.getValue()}
            </Text>
            <Text size="2" className="text-gray11" weight="regular" as="p">
              {summaryText}
            </Text>
          </Box>
        );
      },
    }),

    columnHelper.accessor("appointmentDate", {
      header: "Date & Time",
      cell: (info) => {
        const time = format(
          parse(info.row.original?.appointmentTime, "HH:mm:ss", new Date()),
          "h:mm a"
        );
        return (
          <Box>
            <Text size="2" className="text-gray12" weight="medium" as="p">
              {/* {info.getValue()} */}
              {format(new Date(info.getValue()), "d MMM, yyyy")}
            </Text>
            <Text size="2" className="text-gray10" weight="regular" as="p">
              {time}
            </Text>
          </Box>
        );
      },
    }),

    columnHelper.accessor("appointmentStatus", {
      header: "Status",
      cell: (info) => (
        <Badge
          size="2"
          variant="soft"
          className={getStatusClassName(info.getValue())}
        >
          {appointmentStatusLabels[info.getValue()]}
        </Badge>
      ),
    }),

    columnHelper.accessor("publicId", {
      header: "",
      cell: (info) => {
        const status = info.row.original?.appointmentStatus;

        return (
          <p
            className="cursor-pointer"
            onClick={() => {
              handleAction(info.row.original);
              handleStatusAction(status, {
                toggleModal: () => toggleModal(),
                toggleCancel: () => toggleCancel(),
                toggleCancelledDetails: () => toggleCancelledDetails(),
                toggleUpcomingDetails: () => toggleUpcomingDetails(),
                toggleRescheduleTwoModal: () => toggleRescheduleTwoModal(),
              });
            }}
          >
            View
          </p>
        );
      },
    }),
  ];

  // const testAppointments = [
  //   ...appointmentsData?.data,
  //   {
  //     doctor: {
  //       publicId: "131738A1205K6988",
  //       createdDate: null,
  //       lastModifiedDate: "2025-04-17T16:30:19.931603",
  //       createdBy: null,
  //       modifiedBy: null,
  //       username: "raqaxines",
  //       firstname: "Hayes",
  //       lastname: "Hayes",
  //       biography: "I am who i am by God",
  //       email: "doctorTwo@mailinator.com",
  //       profilePictureUrl:
  //         "http://res.cloudinary.com/dkkelxvme/image/upload/v1744921812/meikzybqlnuwtt4ickxd.png",
  //       yearsOfExperience: 8,
  //       pricing: "1000",
  //       specialization: "Endocrinology",
  //       currency: "EURO",
  //       country: null,
  //       gender: "FEMALE",
  //       availabilityStatus: "AVAILABLE",
  //       hospitalWorkPlace: "Test workplace",
  //       languages: ["Arabic", "Armenian"],
  //       files: {},
  //     },
  //     patient: {
  //       publicId: "10085709HO7F27468",
  //       createdDate: "2025-04-16T10:08:57.217555",
  //       lastModifiedDate: "2025-04-16T10:08:57.217555",
  //       createdBy: null,
  //       modifiedBy: null,
  //       username: "hijic",
  //       firstname: "Phillip",
  //       lastname: "Slater",
  //       email: "realPatient@mailinator.com",
  //       country: null,
  //       gender: null,
  //       profilePictureUrl: null,
  //       files: {},
  //     },
  //     topic: "ggg",
  //     details: "jbhjbjh",
  //     active: true,
  //     appointmentStatus: "REQUESTED_RESCHEDULE",
  //     meetingLink: null,
  //     transactionId: "string",
  //     appointmentDate: "2025-04-30",
  //     appointmentTime: "07:00:00",
  //     doctorCancellationReason: null,
  //     patientCancellationReason: null,
  //     doctorReschedulingReason: null,
  //     patientReschedulingReason: null,
  //     publicId: "1253229Z7MN514112",
  //     createdDate: "2025-04-28T12:53:22.95947",
  //     lastModifiedDate: "2025-04-28T13:13:00.842133",
  //     createdBy: "hijic",
  //     modifiedBy: null,
  //     attachments: [],
  //   },
  // ];

  return (
    <>
      <div>
        <CustomText
          className="text-gray_12 mt-6 md:mt-0"
          size="large"
          weight="semibold"
        >
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
              <Table
                emptyState={<EmptyAppointment />}
                columns={columns}
                data={appointmentsData?.data}
                isLoading={appointmentsDataIsLoading}
              />
            )}
            {userType === "doctor" && (
              <Table
                columns={columns}
                // data={testAppointments}
                data={appointmentsData?.data}
                isLoading={appointmentsDataIsLoading}
              />
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export { TableContent };
