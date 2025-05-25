/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Box, Tabs, Text } from "@radix-ui/themes";
import { CustomText } from "../../components/ui/CustomText";
import { RootState } from "../../lib/store";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { getFullName } from "../../utils/util";
import { format, parse } from "date-fns";
import { EmptyAppointment } from "../../components/emptyStates/EmptyAppointment";
import {
  Appointment,
  appointmentStatusLabels,
  getStatusClassName,
  handleStatusAction,
} from "../../utils/types";
import { tabItems } from "../../utils/data";
import Modal from "../../components/ui/Modal";
import { Review } from "../../components/modals/Review";
import { useState } from "react";
import { getFirstAndLastInitials } from "../../utils/randomUtil";
import { DefaultProfile } from "../../components/ui/DefaultProfile";
import {
  triggerToggleCancelAppointment,
  triggerToggleCancelledDetails,
  triggerToggleCompletedAppointment,
  triggerToggleModal,
  triggerToggleRescheduleModalTwo,
  triggerToggleUpcomingDetails,
} from "../../utils/toggleFunctions";

type Prop = {
  appointmentsData: any;
  appointmentsDataIsLoading: boolean;
  selectedAppointment: Appointment;
  activeTab: string;
  setActiveTab: (arg0: string) => void;
  setSelectedAppointment?: (appointment: Appointment) => void;
};

const TableContent = ({
  appointmentsData,
  appointmentsDataIsLoading,
  setSelectedAppointment,
  activeTab,
  setActiveTab,
  selectedAppointment,
}: Prop) => {
  const dispatch = useDispatch();
  const userType = useSelector((state: RootState) => state.auth.userType);
  const [reviewModal, setReviewModal] = useState(false);

  const toggleReviewModal = () => {
    setReviewModal(!reviewModal);
  };

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
        const doctorFirstName = info.row.original?.doctor?.firstname;
        const doctorLastName = info.row.original?.doctor?.lastname;
        const patientProfilePicture =
          info.row.original?.patient?.profilePictureUrl;
        const doctorProfilePicture =
          info.row.original?.doctor?.profilePictureUrl;

        const profilePicture =
          userType === "patient"
            ? patientProfilePicture || null // leave null to handle fallback in JSX
            : doctorProfilePicture || null;

        const initials =
          userType === "patient"
            ? getFirstAndLastInitials(doctorFirstName, doctorLastName)
            : getFirstAndLastInitials(patientFirstName, patientLastName);

        return (
          <div className="flex items-center">
            {profilePicture ? (
              <img
                className="w-16 h-16 rounded-full object-cover p-0.5"
                src={profilePicture}
                alt="User profile avatar"
                loading="lazy"
                width={64}
                height={64}
              />
            ) : (
              <DefaultProfile size="w-12 h-12" initials={initials} />
            )}
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
          <div className="flex items-center">
            <p
              className="cursor-pointer"
              onClick={() => {
                handleAction(info.row.original);
                handleStatusAction(status, {
                  toggleModal: () => triggerToggleModal(dispatch),
                  toggleCancel: () => triggerToggleCancelAppointment(dispatch),
                  toggleCancelledDetails: () =>
                    triggerToggleCancelledDetails(dispatch),
                  toggleUpcomingDetails: () =>
                    triggerToggleUpcomingDetails(dispatch),
                  toggleRescheduleTwoModal: () =>
                    triggerToggleRescheduleModalTwo(dispatch),
                  toggleCompletedAppointment: () =>
                    triggerToggleCompletedAppointment(dispatch),
                });
              }}
            >
              View
            </p>
            <p
              className="cursor-pointer pl-4"
              onClick={() => {
                toggleReviewModal();
                handleAction(info.row.original);
              }}
            >
              Review
            </p>
          </div>
        );
      },
    }),
  ];

  const renderTable = () => {
    return (
      <Table
        // emptyState={userType === "patient" ? <EmptyAppointment /> : undefined}
        emptyState={<EmptyAppointment />}
        columns={columns}
        data={appointmentsData}
        isLoading={appointmentsDataIsLoading}
      />
    );
  };

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

        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue=""
        >
          <Tabs.List>
            {tabItems
              .filter((item) => !item.onlyFor || item.onlyFor === userType)
              .map((item) => (
                <Tabs.Trigger key={item.value} value={item.value}>
                  {item.label}
                </Tabs.Trigger>
              ))}
          </Tabs.List>

          {tabItems
            .filter((item) => !item.onlyFor || item.onlyFor === userType)
            .map((item) => (
              <Tabs.Content
                key={item.value}
                className="w-full"
                value={item.value}
              >
                {renderTable()}
              </Tabs.Content>
            ))}
        </Tabs.Root>

        <Modal show={reviewModal} toggleModal={toggleReviewModal}>
          <div className="p-4">
            <Review
              details={selectedAppointment}
              toggleModal={toggleReviewModal}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export { TableContent };
