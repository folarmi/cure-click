/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";

const TransactionDetails = ({ toggleModal }: any) => {
  return (
    <div className="bg-white w-auto md:w-[522px] p-4 rounded-lg">
      <Flex justify="between" align="center">
        <Text size="4" className="text-gray12 font-semibold">
          Transaction Details
        </Text>
        <BiX className="w-6 h-6 cursor-pointer" onClick={toggleModal} />
      </Flex>

      <Flex
        align="center"
        justify="between"
        className="mt-4 bg-iris2 py-2 px-4 rounded-lg"
      >
        <Text as="p" size="3" weight="medium" className="text-iris12">
          Appointment With Dr King
        </Text>
        <Text as="p" size="3" weight="medium" className="text-tomato9">
          -NGN 30,000.00
        </Text>
      </Flex>

      <Flex align="center" justify="between" className="mt-4">
        <Text as="p" size="3" weight="regular" className="text-gray11">
          Transaction Date
        </Text>
        <Text as="p" size="3" weight="medium" className="text-gray12">
          12 September 2023 at 06:32pm
        </Text>
      </Flex>

      <Flex align="center" justify="between" className="mt-4">
        <Text as="p" size="3" weight="regular" className="text-gray11">
          Transaction Type
        </Text>
        <Badge className="bg-skyA3 text-skyA11 font-medium" size="3">
          Appointment
        </Badge>
      </Flex>

      <Flex align="center" justify="between" className="mt-4">
        <Text as="p" size="3" weight="regular" className="text-gray11">
          Payment Gateway
        </Text>
        <Text as="p" size="3" weight="medium" className="text-gray12">
          Flutterwave
        </Text>
      </Flex>

      <Flex align="center" justify="between" className="mt-4">
        <Text as="p" size="3" weight="regular" className="text-gray11">
          Platform Fees
        </Text>
        <Text as="p" size="3" weight="medium" className="text-gray11">
          NGN 2,500.00
        </Text>
      </Flex>

      <Flex align="center" justify="between" className="mt-4">
        <Text as="p" size="3" weight="regular" className="text-gray11">
          Amount Paid
        </Text>
        <Text as="p" size="3" weight="medium" className="text-gray11">
          NGN 30,000.00
        </Text>
      </Flex>

      <Box className="mt-4 rounded-lg border border-gray3 p-4">
        <Flex align="center" justify="between">
          <Text as="p" size="3" weight="regular" className="text-gray11">
            Status
          </Text>
          <Badge className="bg-greenA3 text-greenA11 font-medium" size="3">
            Completed
          </Badge>
        </Flex>

        <Flex align="center" justify="between" className="mt-4">
          <Text as="p" size="3" weight="regular" className="text-gray11">
            Reference ID
          </Text>
          <Text className="uppercase text-gray11 font-medium" size="3">
            QEDHYTRF1W3D
          </Text>
        </Flex>
      </Box>

      <Button
        variant="surface"
        className="font-medium text-base text-neutral_11 my-4 w-full border border-neutral_7"
      >
        Report Transaction
      </Button>

      <Text
        as="p"
        weight="regular"
        className="text-accent_alpha_11"
        align="center"
      >
        Share
      </Text>
    </div>
  );
};

export { TransactionDetails };
