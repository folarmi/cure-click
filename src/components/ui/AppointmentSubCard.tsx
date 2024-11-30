import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";

type Status = "Pending" | "Completed" | "Cancelled";

type Prop = {
  status?: Status;
};

const AppointmentSubCard = ({ status = "Pending" }: Prop) => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  const getStatusStyles = () => {
    switch (status) {
      case "Pending":
        return `bg-warning_9 text-black_contrast`;
      case "Completed":
        return `${
          userType === "patient"
            ? "text-white bg-accent_9"
            : "bg-suc_alpha_3 text-suc_alpha_11"
        }`;
      case "Cancelled":
        return "text-white bg-error_9";
      default:
        return "";
    }
  };

  return (
    <Box className="mt-4">
      <Flex align="center" justify="between" className="mb-4">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          Status
        </Text>
        <Badge
          variant="solid"
          className={`${getStatusStyles()} font-medium text-xs`}
          size="1"
        >
          {status}
        </Badge>
      </Flex>

      <Flex align="center" justify="between" className="mb-4">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          Transaction Date
        </Text>
        <Text as="p" weight="medium" size="3" className="text-gray12">
          12 September 2023 at 06:32pm
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

      <Button
        size="3"
        style={{
          border: "1px solid #00062E32",
        }}
        className="mb-4 w-full bg-white text-neutral_11 text-base font-medium"
      >
        Report
      </Button>
    </Box>
  );
};

export { AppointmentSubCard };
