import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Box,
  ChevronDownIcon,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { IoWalletOutline } from "react-icons/io5";
import Modal from "./Modal";
import { AvailabilitySwitch } from "../modals/AvailabilitySwitch";
import { useState } from "react";
import { CircularDot } from "./CircularDot";
import Breadcrumb from "./BreadCrumb";

interface Prop {
  name?: string;
  ifBreadCrumb?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  routeName?: string;
}

const DoctorDashboardHeader = ({
  name = "Hello 👋 Dr. Emmanuel",
  ifBreadCrumb,
  Icon,
  routeName,
}: Prop) => {
  const [modal, setModal] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <Flex justify="between" className="bg-grass12 py-8 px-8">
      <Box>
        {ifBreadCrumb && <Breadcrumb Icon={Icon} route={routeName} />}
        <Text
          as="p"
          size="6"
          className={`text-grass1 font-semibold w-[226px] ${
            ifBreadCrumb && "pt-[10px]"
          }`}
        >
          {name}
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
          <Text className="text-gray11 pr-2 " weight="medium" size="3">
            Availability
          </Text>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Flex>
                <Flex align="center">
                  <CircularDot
                    bgColor={`${
                      isAvailable ? "var(--grass9)" : "var(--gray11)"
                    }`}
                  />
                  <Text
                    className={`${
                      isAvailable ? "text-grass9" : "text-gray11"
                    } px-1 font-semibold`}
                    size="3"
                  >
                    {isAvailable ? "Available" : "Currently Unavailable"}
                  </Text>
                  <ChevronDownIcon className="cursor-pointer" />
                </Flex>
              </Flex>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="mt-4">
              <DropdownMenu.Item
                className="hover:bg-grassA3"
                onClick={() => setIsAvailable(true)}
              >
                <Flex align="center">
                  <CircularDot bgColor="var(--grass9)" />
                  <Text className="text-grass9 px-1 font-semibold" size="3">
                    Available
                  </Text>
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="hover:bg-neutral_alpha_3"
                onClick={() => setIsAvailable(false)}
              >
                <Flex align="center">
                  <CircularDot bgColor="var(--gray11)" />
                  <Text className="text-gray11 px-1 font-semibold" size="3">
                    Unavailable
                  </Text>
                </Flex>
              </DropdownMenu.Item>{" "}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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

      <Modal show={modal} toggleModal={toggleModal}>
        <div className="p-4">
          <AvailabilitySwitch
            isAvailable={isAvailable}
            toggleModal={toggleModal}
          />
        </div>
      </Modal>
    </Flex>
  );
};

export { DoctorDashboardHeader };
