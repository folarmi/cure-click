import { Box, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import { reasonsForCancelling } from "../../utils/data";
import { CustomTextarea } from "../ui/CustomTextArea";
import MeetingCardTwo from "../cards/MeetingCardTwo";
import { useForm } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CancelAppointmentTwo = ({ toggleModal }: any) => {
  const { control } = useForm();
  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px] overflow-scroll h-[700px]">
      <Flex justify="between" align="center" className="mb-4">
        <Box>
          <Text as="p" className="font-semibold text-gray12" size="4">
            Cancel Appointment
          </Text>
          <Text as="p" weight="regular" className="text-gray11 pt-1" size="3">
            Are you sure you want to cancel the appointment scheduled below?
          </Text>
        </Box>
        <BiX onClick={toggleModal} className="cursor-pointer" />
      </Flex>

      <MeetingCardTwo
        title="Second Opinion on scheduled Cancer surge.."
        date="1 July 2023"
        time="11:30PM GMT+1"
        doctorName="Dr. Alison Ogaga"
        ifView={false}
        // onClick={toggleMeetingCardTwoModal}
        // cancelOnClick={toggleMeetingTwoCancel}
      />

      <Flex className="my-4 px-10" align="center" justify="between">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          Appointment Fee
        </Text>
        <Text as="p" weight="medium" size="3" className="text-gray12">
          NGN 30,500.00
        </Text>
      </Flex>

      <Box className="bg-iris3 rounded py-3 px-4">
        <Text as="p" weight="medium" size="3">
          Cancellation Policy
        </Text>
        <ul className="list-disc mt-2 ml-4">
          <li>
            <Text as="p" size="2" weight="regular" className="text-gray11">
              Policy 1
            </Text>
          </li>
          <li>
            <Text as="p" size="2" weight="regular" className="text-gray11">
              Policy 2
            </Text>
          </li>
          <li>
            <Text as="p" size="2" weight="regular" className="text-gray11">
              Policy 3
            </Text>
          </li>
        </ul>
      </Box>

      <Box className="mt-4">
        <Text as="p" size="4" className="font-semibold text-gray12">
          Reason for cancelling
        </Text>
        <Text as="p" size="4" weight="regular" className="pt-1 text-gray11">
          Help us Improve our service
        </Text>

        {reasonsForCancelling.map(({ reason }) => {
          return (
            <>
              <Flex
                className="p-3 border border-neutral_alpha_6 rounded-md mt-4"
                align="center"
                justify="between"
                itemID={reason}
                key={reason}
              >
                <Text as="p">{reason}</Text>
                <Checkbox />
              </Flex>
              {reason === "Other Reasons" && (
                <CustomTextarea
                  label="Input Reason*"
                  className="mt-2"
                  placeholder="Input your Reasons"
                  control={control}
                  name="biography"
                />
              )}
            </>
          );
        })}

        <Flex align="center" justify="between" mt="4" mb="4">
          <Button
            onClick={toggleModal}
            size="3"
            style={{
              border: "1px solid #8B8D98",
            }}
            className="font-medium text-neutral_9 bg-white  text-base w-1/2 mr-2"
          >
            Yes Cancel Appointment
          </Button>
          <Button
            onClick={toggleModal}
            variant="solid"
            size="3"
            className="font-medium text-white text-base bg-grass_9 w-1/2"
          >
            No
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export { CancelAppointmentTwo };
