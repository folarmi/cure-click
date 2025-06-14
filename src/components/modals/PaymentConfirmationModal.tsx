/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import { useCustomMutation } from "../../lib/apiCalls";
import mark from "../../assets/paymentSuccess.svg";

type Prop = {
  toggleModal: () => void;
  status: string | null;
  createAppointment: () => void;
  transactionID: string | null;
  serviceFee: string | null;
  customerEmail: string | null;
};

const PaymentConfirmationModal = ({
  // toggleModal,
  // status,
  createAppointment,
  transactionID,
  serviceFee,
  customerEmail,
}: Prop) => {
  const verifyPaymentMutation = useCustomMutation({
    endpoint: `payment/api/flutterwave/verify-payment?transactionId=${transactionID}`,
    errorMessage: (error: any) => error?.response?.data?.message,
    onSuccessCallback: () => {
      createAppointment();
    },
  });

  const handleAppointmentBooking = () => {
    verifyPaymentMutation.mutate({
      // serviceFee: serviceFee,
      serviceFee: "90,000",
      currency: "NGN",
      // customerEmail,
      customerEmail: "realPatient@mailinator.com",
    });
    console.log(serviceFee, customerEmail);
  };

  return (
    <div className="flex justify-center items-center px-4 flex-col bg-white rounded-lg shadow-md w-full lg:max-w-[454px] pt-14">
      <div className="">
        <img src={mark} />
      </div>

      <Text as="p" className="py-4 text-gray12 font-semibold">
        Payment Successful
      </Text>
      <Text as="p" weight="regular" className=" text-gray11" align="center">
        Your payment for an appointment has been confirmed proceed to the
        appointments page to see your booking
      </Text>

      <Box className="mt-4 w-full">
        <Flex justify="between" className="mb-4">
          <Text as="p" weight="regular" size="3" className="text-gray11">
            Transaction Date
          </Text>
          <Text as="p" weight="medium" size="3" className="text-gray12">
            12 September 2023 at 06:32pm
          </Text>
        </Flex>

        <Flex justify="between" className="mb-4">
          <Text as="p" weight="regular" size="3" className="text-gray11">
            Appointment Fee
          </Text>
          <Text as="p" weight="medium" size="3" className="text-gray12">
            NGN {serviceFee}
          </Text>
        </Flex>

        <Flex justify="between" className="mb-4">
          <Text as="p" weight="regular" size="3" className="text-gray11">
            Status
          </Text>
          <Badge
            variant="solid"
            className={`font-medium text-xs bg-suc_alpha_3 text-suc_alpha_11`}
            size="1"
          >
            Success
          </Badge>
        </Flex>
      </Box>

      <Button
        onClick={handleAppointmentBooking}
        color="grass"
        size="2"
        className=" text-white mt-4 mb-8 w-full cursor-pointer"
        // loading={verifyPaymentMutation.isPending}
      >
        Create Appointment
      </Button>
    </div>
  );
};

export { PaymentConfirmationModal };
