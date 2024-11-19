import { Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import { CircularDot } from "../ui/CircularDot";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AvailabilitySwitch = ({ toggleModal, isAvailable }: any) => {
  return (
    <div className="p-4 rounded-lg bg-white w-[396px]">
      <Flex justify="between">
        <Text size="4" className="font-semibold">
          Update Availability Status
        </Text>
        <BiX className="w-6 h-6 cursor-pointer" onClick={toggleModal} />
      </Flex>
      <Flex
        direction="column"
        justify="center"
        align="center"
        className={`mt-4 py-2 rounded ${
          isAvailable ? "bg-grassA3" : "bg-neutral_alpha_3 "
        }`}
      >
        <Text size="2" className="text-black_contrast" as="p">
          You are about to set your availability status to{" "}
          <Flex align="center" justify="center">
            <CircularDot
              bgColor={`${isAvailable ? "var(--grass9)" : "var(--gray11)"}`}
            />
            <Text
              className={`${
                isAvailable ? "text-grass9" : "text-gray11"
              } px-1 font-semibold`}
              size="3"
            >
              {isAvailable ? "Available" : "Currently Unavailable"}
            </Text>
          </Flex>
        </Text>
      </Flex>

      {isAvailable ? (
        <Text as="p" size="2" className="text-gray11 pt-4 text-center">
          Setting your status to Available will make your profile visible to
          patients, allowing new bookings and ensuring you're accessible for
          appointments.
        </Text>
      ) : (
        <Text as="p" size="2" className="text-gray11 pt-4 text-center">
          Setting your status to Unavailable will make your profile invisible to
          patients, preventing new bookings. If you’re temporarily unavailable,
          update accordingly to keep your schedule accurate.
        </Text>
      )}
      <Text as="p" size="2" className="text-gray11 pt-4 text-center">
        Click "I understand" to proceed.
      </Text>

      <Flex justify="center" className="mt-10">
        <Button
          style={{
            border: "1px solid var(--border-gray)",
          }}
          size="2"
          onClick={toggleModal}
          className="w-1/2 bg-white text-neutral_11 mr-4 whitespace-nowrap"
        >
          {isAvailable ? "Keep my profile In-active" : "I understand"}
        </Button>
        <Button className="w-1/2 bg-grass9 text-white I understand">
          {isAvailable ? "I understand" : "Keep my profile active"}
        </Button>
      </Flex>
    </div>
  );
};

export { AvailabilitySwitch };
