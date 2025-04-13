/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Button,
  ChevronDownIcon,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { CustomText } from "../../components/ui/CustomText";
import { RootState } from "../../lib/store";
import { useSelector } from "react-redux";
import Table from "../../components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import avatar from "../../assets/avatar.svg";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { appointmentSampleData, doctorSampleData } from "../../utils/data";
import { useGetData } from "../../lib/apiCalls";
import { Loader } from "../../components/ui/Loader";

const TableContent = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);
  const { data: profileData, isLoading: profileDataIsLoading } = useGetData({
    url: `appointment/api/patients/profile`,
    queryKey: ["GetPatientProfile"],
    enabled: userType === "patient",
  });

  const { data: appointmentsData, isLoading: appointmentsDataIsLoading } =
    useGetData({
      url: `appointment/api/appointments?publicId=${profileData?.data?.publicId}f&page=0&size=20`,
      queryKey: ["GetAllDoctors"],
      enabled: userType === "patient",
    });

  console.log(appointmentsData?.data?.content);
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

  const doctorColumns = [
    columnHelper.accessor("nameOfPatient", {
      header: "Patient Name",
      cell: (info) => {
        return (
          <div>
            <Text size="3" className="text-iris12 font-semibold" as="p">
              {info.getValue()}
            </Text>
            <div className="flex items-center">
              <StarFilledIcon className="text-orange_10" />
              <Text as="p" className="text-gray11 pl-1" size="2">
                3.0
              </Text>
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
    <>
      {profileDataIsLoading || appointmentsDataIsLoading ? (
        <Loader />
      ) : (
        <div>
          <CustomText
            className="text-gray_12 mt-6 md:mt-0"
            size="large"
            weight="semibold"
          >
            Appointment History
          </CustomText>
          <CustomText
            className="text-gray_11 pb-4"
            size="medium"
            weight="normal"
          >
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
        </div>
      )}
    </>
  );
};

export { TableContent };
