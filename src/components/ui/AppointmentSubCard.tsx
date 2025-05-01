import { Badge, Box, Flex, Text } from "@radix-ui/themes";
// import { useSelector } from "react-redux";
// import { RootState } from "../../lib/store";
import { AppointmentStatus, getStatusClassName } from "../../utils/types";
import { capitalize } from "../../utils/util";
import {
  formatDateToReadableString,
  formatTimeTo12Hour,
} from "../../utils/calendarutil";

type Prop = {
  status?: AppointmentStatus;
  date: string;
  time: string;
};

const AppointmentSubCard = ({ status = "PENDING", date, time }: Prop) => {
  // const userType = useSelector((state: RootState) => state.auth.userType);

  // const getStatusStyles = () => {
  //   switch (status) {
  //     case "PENDING":
  //       return `bg-warning_9 text-black_contrast`;
  //     case "COMPLETED":
  //       return `${
  //         userType === "patient"
  //           ? "text-white bg-accent_9"
  //           : "bg-suc_alpha_3 text-suc_alpha_11"
  //       }`;
  //     case "CANCELLED":
  //       return "text-white bg-error_9";
  //     default:
  //       return "";
  //   }
  // };

  return (
    <Box className="mt-4">
      <Flex align="center" justify="between" className="mb-4">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          Status
        </Text>
        <Badge
          variant="solid"
          className={`${getStatusClassName(status)} font-medium text-xs`}
          size="1"
        >
          {capitalize(status)}
        </Badge>
      </Flex>

      <Flex align="center" justify="between" className="mb-4">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          Transaction Date
        </Text>
        <Text as="p" weight="medium" size="3" className="text-gray12">
          {formatDateToReadableString(date)} at {formatTimeTo12Hour(time)}
        </Text>
      </Flex>

      <Flex align="center" justify="between" className="mb-4">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          Appointment Fee
        </Text>
        <Text as="p" weight="medium" size="3" className="text-gray12">
          NGN 30,500.00
        </Text>
      </Flex>
    </Box>
  );
};

export { AppointmentSubCard };
