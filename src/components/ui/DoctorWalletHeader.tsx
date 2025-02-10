import { Box, Flex, Text } from "@radix-ui/themes";
import Breadcrumb from "./BreadCrumb";
import { IoWalletOutline } from "react-icons/io5";
import { WalletHeader } from "./WalletHeader";

//
const DoctorWalletHeader = () => {
  return (
    <Flex
      direction="column"
      justify="between"
      className="bg-grass12 py-8 px-8 "
    >
      <Breadcrumb Icon={IoWalletOutline} route="Wallet" />
      <Text
        className="text-grass1 font-semibold pt-[10px] pb-1"
        size="6"
        as="p"
      >
        Wallet
      </Text>
      <Text className="text-grass4 font-semibold" size="3" as="p">
        View and manage your wallet
      </Text>

      <Flex className="flex-col md:flex-row mt-2 md:mt-[10px] bg-grass2 p-6 rounded-lg justify-between">
        <WalletHeader
          balance="$ 0.00"
          title="Pending Wallet Balance"
          ifButton={false}
          ifFull
          className="mr-6"
        />
        <WalletHeader
          balance="$ 340,000.00"
          title="Wallet Balance"
          buttonText="Withdraw"
          ifFull
          className="mt-4 md:mb-0"
        />
      </Flex>

      <Box className="hidden md:block mt-6 bg-grass4 rounded p-4">
        <Text size="2" as="p" weight="regular" className="text-grass12">
          Your pending wallet balance are funds paid for sessions still pending
          or funds held as a result of a conflict, these funds will reflect
          after the session has been completed or conflict has been resolved
        </Text>
      </Box>
    </Flex>
  );
};

export { DoctorWalletHeader };
