/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  // Button,
  // ChevronDownIcon,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { CustomText } from "../../components/ui/CustomText";
import { RootState } from "../../lib/store";
import { useSelector } from "react-redux";
import Table from "../../components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import avatar from "../../assets/avatar.svg";
import { getFullName } from "../../utils/util";
import { format, parse } from "date-fns";
import { EmptyAppointment } from "../../components/emptyStates/EmptyAppointment";
import CustomSelect from "../../components/ui/CustomSelect";
import { useForm } from "react-hook-form";
import { testActions } from "../../utils/data";
import { useState } from "react";
import { useCustomMutation } from "../../lib/apiCalls";
import { useQueryClient } from "@tanstack/react-query";

type Prop = {
  appointmentsData: any;
  appointmentsDataIsLoading: boolean;
};

const TableContent = ({
  appointmentsData,
  appointmentsDataIsLoading,
}: Prop) => {
  const { control } = useForm();
  const queryClient = useQueryClient();

  const userType = useSelector((state: RootState) => state.auth.userType);

  const [selectedId, setSelectedId] = useState("");

  const acceptAppointmentMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/appointment/accept/${selectedId}`,
    successMessage: () => "Appointment Updated sucessfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllAppointments"] });
    },
  });

  const cancelAppointmentMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/appointment/decline/${selectedId}`,
    successMessage: () => "Appointment Updated sucessfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllAppointments"] });
    },
  });

  const handleAction = (item: string, id: string) => {
    setSelectedId(id);

    if (item === "Accept") {
      acceptAppointmentMutation.mutate({});
    } else if (item === "Cancel") {
      cancelAppointmentMutation.mutate({});
    }
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
          className={`font-medium ${
            info.getValue() === "UPCOMING"
              ? "bg-blueA3 text-blueA11"
              : "bg-tomatoA3 text-tomatoA11"
          }`}
        >
          {info.getValue().toLowerCase()}
        </Badge>
      ),
    }),

    columnHelper.accessor("publicId", {
      header: "",
      cell: (info) => (
        <CustomSelect
          options={testActions}
          placeholder="Actions"
          name="availabilityStatus"
          control={control}
          className="w-[346px]"
          customOnChange={(item) => {
            const id = info.getValue();
            handleAction(item, id);
          }}
        />
      ),
    }),
  ];

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
                // data={doctorSampleData}
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
