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
import { ReactNode, useState } from "react";
import { CircularDot } from "./CircularDot";
import Breadcrumb from "./BreadCrumb";
import { useGetDoctorProfile } from "../../lib/apiCalls";
import { isAvailable } from "../../utils/util";

interface Prop {
  name?: string;
  ifString?: boolean;
  subText?: string;
  ifBreadCrumb?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  routeName?: string;
  children?: ReactNode;
}

const DoctorDashboardHeader = ({
  name = "Dr. Emmanuel",
  ifBreadCrumb,
  Icon,
  routeName,
  ifString = false,
  subText,
  children,
}: Prop) => {
  const [modal, setModal] = useState(false);
  const { data: doctorProfile } = useGetDoctorProfile();
  const [selected, setSelected] = useState(
    doctorProfile?.data?.availabilityStatus
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="bg-grass12 px-4 md:px-8">
      <Flex justify="between" className="pt-4 md:pt-8">
        <Box>
          {ifBreadCrumb && <Breadcrumb Icon={Icon} route={routeName} />}

          <div className="flex items-center mb-4 md:mb-0 w-full">
            <Text
              as="p"
              size="6"
              className={`text-grass1 font-semibold text-sm md:text-2xl w-auto md:w-[226px] ${
                ifBreadCrumb && "pt-[10px]"
              }`}
            >
              {`${name}`}
            </Text>

            <Flex
              align="center"
              className="space-x-1 border px-2 border-gray4 h-11 rounded md:hidden"
            >
              <IoWalletOutline className="text-iris1" />

              <Text as="p" size="3" className="text-iris2" weight="bold">
                $0.00
              </Text>
              <ChevronRightIcon className="w-5 h-5 text-iris1" />
            </Flex>
          </div>

          {ifString ? (
            <Text as="p" size="3" weight="regular" className="text-grass4 pt-1">
              {subText}
            </Text>
          ) : (
            <Text as="p" size="3" weight="regular" className="text-grass4 pt-1">
              You have <span className="font-semibold">4</span> upcoming
              sessions today
            </Text>
          )}
        </Box>

        <Flex className="mt-16 mb-8" align="center">
          <Flex
            align="center"
            className="md:bg-grass1 rounded-md py-[10px] px-4 mr-6"
          >
            <Text
              className="hidden md:block text-gray11 pr-2 "
              weight="medium"
              size="3"
            >
              Availability
            </Text>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Flex className="">
                  <Flex align="center">
                    <CircularDot
                      bgColor={`${
                        isAvailable(doctorProfile?.data?.availabilityStatus)
                          ? "var(--grass9)"
                          : "var(--gray11)"
                      }`}
                    />
                    <Text
                      className={`hidden md:block ${
                        isAvailable(doctorProfile?.data?.availabilityStatus)
                          ? "text-grass9"
                          : "text-gray11"
                      } px-1 font-semibold`}
                      size="3"
                    >
                      {isAvailable(doctorProfile?.data?.availabilityStatus)
                        ? "Available"
                        : "Currently Unavailable"}
                    </Text>
                    <ChevronDownIcon className="cursor-pointer ml-2 md:ml-0 text-white md:text-black" />
                  </Flex>
                </Flex>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="mt-4 md:mt-0">
                <DropdownMenu.Item
                  className="hover:bg-grassA3"
                  onClick={() => {
                    setSelected("Available");
                    toggleModal();
                  }}
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
                  onClick={() => {
                    setSelected("Unavailable");
                    toggleModal();
                  }}
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
            className="space-x-3 border border-gray4 h-11 px-2 rounded hidden md:flex"
          >
            <IoWalletOutline className="text-iris1" />
            <Text as="p" size="3" weight="medium" className="text-iris1">
              Wallet Balance
            </Text>
            <Text as="p" size="3" className="text-iris2" weight="bold">
              $0.00
            </Text>
            <ChevronRightIcon className="w-5 h-5 text-iris1" />
          </Flex>
        </Flex>

        <Modal show={modal} toggleModal={toggleModal}>
          <div className="p-4">
            <AvailabilitySwitch
              isAvailable={isAvailable(doctorProfile?.data?.availabilityStatus)}
              toggleModal={toggleModal}
              selected={selected}
            />
          </div>
        </Modal>
      </Flex>
      {children}
    </div>
  );
};

export { DoctorDashboardHeader };
