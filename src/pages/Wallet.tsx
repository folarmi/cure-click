import DashboardLayout from "../components/layouts/DashboardLayout";
import { Badge, Box, Flex, Tabs, Text, TextField } from "@radix-ui/themes";
import { tableHeader, tableSample } from "../utils/data";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Modal from "../components/ui/Modal";
import { TransactionDetails } from "../components/modals/TransactionDetails";
import { useState } from "react";
import Breadcrumb from "../components/ui/BreadCrumb";
import { IoWalletOutline } from "react-icons/io5";
import { BackgroundHeader } from "../components/ui/BackgroundHeader";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { DoctorWalletHeader } from "../components/ui/DoctorWalletHeader";
import { WalletHeader } from "../components/ui/WalletHeader";

const Wallet = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <DashboardLayout ifHeader={false}>
      {userType === "patient" ? (
        <BackgroundHeader>
          <Breadcrumb Icon={IoWalletOutline} route="Wallet" />
          <Text
            size="7"
            as="p"
            className="pt-6 text-tokens_colors_text font-semibold"
          >
            Wallet
          </Text>

          <Flex
            align="center"
            justify="between"
            className="mt-6 bg-white p-6 rounded-lg"
          >
            <WalletHeader balance="NGN 18,908.00" title="Wallet Balance" />

            <Box className="hidden md:block bg-iris3 p-4 w-[60%] rounded ml-6">
              <Text as="p" weight="regular" size="3">
                Your balance are pre-paid funds you have available to spend on
                your sessions. Your available balance will be used to pay for
                your sessions before any other payment method is used.You can
                add money to your balance through the Deposit button, Funds
                added are non-refundable.
              </Text>
            </Box>
          </Flex>
        </BackgroundHeader>
      ) : (
        <DoctorWalletHeader />
      )}

      <main className="mt-8 flex flex-col">
        <Text
          as="p"
          className="font-semibold md:w-[900px] pl-6 md:pl-0 md:mx-auto text-sm md:text-3xl"
        >
          Recent Transactions
        </Text>

        <Flex
          justify="between"
          className="md:w-[900px] mx-auto mt-6 flex-col md:flex-row"
        >
          {/* Tabs Root */}
          <Tabs.Root className="w-full" defaultValue="all">
            {/* Tabs List */}
            <Flex className="flex-col md:flex-row md:items-center w-full md:w-1/2 mb-4 md:mb-0">
              <Tabs.List className="flex-grow md:flex-grow-0 mb-2 md:mb-0">
                <Tabs.Trigger value="all">All</Tabs.Trigger>
                <Tabs.Trigger value="appointments">Appointments</Tabs.Trigger>
                <Tabs.Trigger value="deposits">Deposits</Tabs.Trigger>
                <Tabs.Trigger value="refunds">Refunds</Tabs.Trigger>
              </Tabs.List>

              {/* Search Bar */}
              <TextField.Root
                size="3"
                className="bg-accent_alpha_3 font-normal w-full md:w-[300px]"
                placeholder="Search"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Flex>

            {/* Tabs Content */}
            <Tabs.Content className="w-full mt-4" value="all">
              <Box className="mt-[27px] mb-3 hidden md:grid grid-cols-4">
                {tableHeader.map(({ id, name }) => {
                  return (
                    <Text size="1" className="uppercase text-gray10" key={id}>
                      {name}
                    </Text>
                  );
                })}
              </Box>

              {tableSample?.map(({ amt, date, desc, id, type }) => {
                return (
                  <Box
                    key={id}
                    onClick={toggleModal}
                    className="bg-white border border-gray3 p-3 rounded mb-3 grid grid-cols-1 sm:grid-cols-4 gap-3 cursor-pointer mx-8 md:mx-0"
                  >
                    <Text
                      weight="regular"
                      as="p"
                      size="2"
                      className="text-gray12 whitespace-nowrap sm:col-span-1"
                    >
                      {desc}
                    </Text>
                    <Text
                      as="p"
                      size="2"
                      className="text-gray12 font-medium sm:col-span-1"
                    >
                      {amt}
                    </Text>
                    <Badge
                      size="2"
                      className={`w-fit ${
                        type === "Wallet Deposit"
                          ? "bg-grassA3 text-grassA11"
                          : "bg-skyA3 text-skyA11"
                      } sm:col-span-1 hidden md:block`}
                    >
                      {type}
                    </Badge>
                    <Flex align="center" className="sm:col-span-1">
                      <Text
                        as="p"
                        weight="regular"
                        size="2"
                        className="text-gray11 whitespace-nowrap"
                      >
                        {date}
                      </Text>
                      <ChevronRightIcon className="w-6 h-6" />
                    </Flex>
                  </Box>
                );
              })}
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </main>

      <Modal show={modal} toggleModal={toggleModal}>
        <div className="p-4">
          <TransactionDetails toggleModal={toggleModal} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Wallet;
