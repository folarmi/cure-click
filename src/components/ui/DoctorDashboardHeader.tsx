import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Box, ChevronDownIcon, Flex, Text } from "@radix-ui/themes";
import { IoWalletOutline } from "react-icons/io5";

const DoctorDashboardHeader = () => {
  return (
    <Flex justify="between" className="bg-grass12 py-8 px-8">
      <Box>
        <Text as="p" size="6" className="text-grass1 font-semibold w-[226px]">
          Hello 👋 Dr. Emmanuel
        </Text>
        <Text as="p" size="3" weight="regular" className="text-grass4 pt-1">
          You have <span className="font-semibold">4</span> upcoming sessions
          today
        </Text>
      </Box>

      <Flex align="center">
        <Flex
          align="center"
          className="bg-grass1 rounded-md py-[10px] px-4 mr-6"
        >
          <Text className="text-gray11 pr-2" weight="medium" size="3">
            Availability
          </Text>

          <Flex align="center">
            <Box className="bg-grass9 w-2 h-2 rounded-full"></Box>
            <Text className="text-grass9 px-1 font-semibold" size="3">
              Available
            </Text>
            <ChevronDownIcon className="w-4 h-4" />
          </Flex>
        </Flex>
        <Flex
          align="center"
          className="space-x-3 border border-gray4 h-11 px-2 rounded"
        >
          <IoWalletOutline className="text-iris1" />
          <Text as="p" size="3" weight="medium" className="text-iris1">
            Wallet Balance
          </Text>
          <Text as="p" size="3" className="text-iris2" weight="bold">
            $340,000.00
          </Text>
          <ChevronRightIcon className="w-5 h-5 text-iris1" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export { DoctorDashboardHeader };
