/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Text } from "@radix-ui/themes";
import { getCurrencySymbol } from "../../utils/util";
type Prop = {
  toggleModal: any;
  price: string;
  currency: string;
  className?: string;
};

const PaymentBox = ({ toggleModal, className, price, currency }: Prop) => {
  return (
    <Box
      className={`bg-white p-4 border border-gray3 w-auto md:w-[318px] h-[124px] ${className}`}
    >
      <Text as="p" className="font-semibold" size="6">
        {`${getCurrencySymbol(currency || "NAIRA")} ${price || "0"}`}
        <Text weight="regular" size="4" className="pl-2">
          Per session
        </Text>
      </Text>

      <Button
        size="3"
        variant="solid"
        radius="medium"
        onClick={toggleModal}
        className="bg-grass9 w-full mt-8 font-semibold text-base cursor-pointer"
      >
        Book a Session
      </Button>
    </Box>
  );
};

export { PaymentBox };
