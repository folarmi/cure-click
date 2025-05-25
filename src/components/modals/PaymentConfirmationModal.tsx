/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@radix-ui/themes";
import { useCustomMutation } from "../../lib/apiCalls";

type Prop = {
  toggleModal: () => void;
  status: string | null;
  createAppointment: () => void;
  transactionID: string | null;
  serviceFee: string | null;
  customerEmail: string | null;
};

const PaymentConfirmationModal = ({
  toggleModal,
  status,
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
  console.log(serviceFee);
  const handleAppointmentBooking = () => {
    verifyPaymentMutation.mutate({
      serviceFee: serviceFee,
      currency: "NGN",
      customerEmail,
    });
  };

  return (
    <div className="bg-white rounded-md shadow-md">
      <p>{status}</p>
      <Button
        onClick={handleAppointmentBooking}
        color="grass"
        size="2"
        className=" text-white"
      >
        Create Appointment
      </Button>
    </div>
  );
};

export { PaymentConfirmationModal };
