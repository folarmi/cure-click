import DashboardLayout from "../components/layouts/DashboardLayout";
import headerBg from "../assets/headerBg.svg";
import {
  Badge,
  Box,
  Button,
  Flex,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
// import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { tableHeader, tableSample } from "../utils/data";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Modal from "../components/ui/Modal";
import { TransactionDetails } from "../components/modals/TransactionDetails";
import { useState } from "react";

const Wallet = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <DashboardLayout ifHeader={false}>
      <div
        className="bg-cover bg-center px-12 py-8"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
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
          <Flex
            align="center"
            justify="between"
            className="bg-iris12 rounded-lg p-6 w-[40%]"
          >
            <Box>
              <Text
                size="3"
                as="p"
                weight="regular"
                className=" text-iris3 pb-1"
              >
                Wallet Balance
              </Text>
              <Text size="7" as="p" className=" text-iris2 font-semibold">
                NGN 18,908.00
              </Text>
            </Box>

            <Button
              size="3"
              className="bg-grass9 font-semibold"
              variant="solid"
            >
              Deposit
            </Button>
          </Flex>

          <Box className="bg-iris3 p-4 w-[60%] rounded ml-6">
            <Text as="p" weight="regular" size="3">
              Your balance are pre-paid funds you have available to spend on
              your sessions. Your available balance will be used to pay for your
              sessions before any other payment method is used.You can add money
              to your balance through the Deposit button, Funds added are
              non-refundable.
            </Text>
          </Box>
        </Flex>
      </div>

      <main className="mt-8 flex flex-col">
        <Text as="p" size="6" className="font-semibold w-[900px] mx-auto">
          Recent Transactions
        </Text>

        <Flex justify="between" className="w-[900px] mx-auto mt-6">
          <Tabs.Root className="" defaultValue="all">
            <Tabs.List className="w-1/2">
              <Tabs.Trigger value="all">All</Tabs.Trigger>
              <Tabs.Trigger value="appointments">Appointments</Tabs.Trigger>
              <Tabs.Trigger value="deposits">Deposits</Tabs.Trigger>
              <Tabs.Trigger value="refunds">Refunds</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content className=" w-full" value="all">
              <Box className="mt-[27px] mb-3 grid grid-cols-4">
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
                    className="bg-white border border-gray3 p-3 rounded mb-3 grid grid-cols-4 cursor-pointer"
                  >
                    <Text
                      weight="regular"
                      as="p"
                      size="2"
                      className="text-gray12 whitespace-nowrap"
                    >
                      {desc}
                    </Text>
                    <Text as="p" size="2" className="text-gray12 font-medium">
                      {amt}
                    </Text>
                    <Badge
                      size="2"
                      className={`w-fit ${
                        type === "Wallet Deposit"
                          ? "bg-grassA3 text-grassA11"
                          : "bg-skyA3 text-skyA11"
                      }`}
                    >
                      {type}
                    </Badge>

                    <Flex align="center">
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

          <TextField.Root
            size="3"
            className="bg-accent_alpha_3 font-normal"
            placeholder="Search"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
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