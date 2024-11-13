import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import CustomSelect from "../ui/CustomSelect";
import { options, sampleTime } from "../../utils/data";
import { useState } from "react";
import { useNavigate } from "react-router";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Availability = ({ toggleModal }: any) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="bg-white py-6 px-10 rounded-lg">
      <Flex justify="between" align="center" className="px-4">
        <Text weight="medium" size="3" className="text-gray12">
          View Availability
        </Text>
        <BiX className="w-6 h-6 cursor-pointer" onClick={toggleModal} />
      </Flex>

      <Box className="mt-8">
        <Flex justify="between" align="center" gap="6">
          <ChevronLeftIcon className="w-6 h-6" />
          <CustomSelect
            options={options}
            placeholder="Thursday , 5th February 2024"
            value={selectedValue}
            onValueChange={handleChange}
          />
          <ChevronRightIcon className="w-6 h-6" />
        </Flex>

        <Box className="mt-6">
          <Text as="p" size="3" weight="medium" className="text-gray12">
            Available Time Slots
          </Text>
          <Text as="p" size="3" weight="regular" className="text-gray11">
            Select a suitable meeting time
          </Text>

          {sampleTime.map(({ id, timeSlot }) => {
            return (
              <Box
                className="mt-2 border border-gray3 rounded-md hover:bg-grassA2 hover:border hover:border-grassA3 cursor-pointer"
                key={id}
              >
                <Text
                  as="p"
                  size="3"
                  weight="medium"
                  align="center"
                  className="text-gray11 py-2"
                >
                  {timeSlot}
                </Text>
              </Box>
            );
          })}

          <Button
            size="3"
            variant="solid"
            radius="medium"
            onClick={() => navigate("/dashboard/schedule")}
            // disabled
            className="bg-grass9 w-full font-medium mt-8 text-base cursor-pointer"
          >
            Schedule
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Availability;
