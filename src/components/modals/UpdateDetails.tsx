/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import sampleImage from "../../assets/avatar.svg";
import { CustomInput } from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";
import { options } from "../../utils/data";
import { useState } from "react";
import { CustomTextarea } from "../ui/CustomTextArea";
import CallOut from "../atoms/CallOut";

const UpdateDetails = ({ toggleModal }: any) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div className="bg-white w-[525px] p-4">
      <Flex justify="between" align="center">
        <Text as="p" className="font-semibold text-gray12" size="4">
          Update your details
        </Text>
        <BiX onClick={toggleModal} className="cursor-pointer" />
      </Flex>
      <Tabs.Root defaultValue="basicInformation">
        <Tabs.List className="border-b">
          <Tabs.Trigger value="basicInformation">
            Basic Information
          </Tabs.Trigger>
          <Tabs.Trigger value="pricingInformation">
            Pricing Information
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="basicInformation" className="">
          <CallOut
            text="Make changes to your profile information"
            bgColor="bg-grass4"
          />

          <Flex align="center">
            <img src={sampleImage} className="w-16 h-16" />
            <Box className="ml-4">
              <Button
                size="2"
                className="bg-white text-neutral_11 font-medium text-sm"
                style={{
                  border: "1px solid #00083046",
                }}
              >
                Update Image
              </Button>
              <Text as="p" size="1" className="text-gray10 pt-1">
                Profile image should be less than 5mb
              </Text>
            </Box>
          </Flex>

          <CustomInput
            label="Full name"
            placeholder="Input your email"
            className="my-4 w-full"
          />

          <CustomSelect
            options={options}
            placeholder="Select Speciality"
            value={selectedValue}
            label="Gender"
            onValueChange={handleChange}
            // className="mb-4"
          />

          <div className="mt-4">
            <CustomSelect
              options={options}
              placeholder="Country"
              value={selectedValue}
              label="Country"
              onValueChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <CustomSelect
              options={options}
              placeholder="Country"
              value={selectedValue}
              label="Languages you speak"
              onValueChange={handleChange}
            />
          </div>

          <CustomTextarea label="Your Bio" className="mt-4" />

          <Button className="mt-4 bg-grass9 w-full font-medium">Update</Button>
        </Tabs.Content>
        <Tabs.Content value="pricingInformation">
          <CallOut
            text="Make changes to your profile information"
            bgColor="bg-grass4"
          />

          <CustomInput
            label="Pricing Per Session"
            placeholder="Input your email"
            className="my-4 w-full "
          />

          <CallOut
            text="CureClick charges you 0.3% for every session you hold"
            bgColor="bg-alpha_3"
          />

          <Button className="mt-4 bg-grass9 w-full font-medium">Update</Button>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export { UpdateDetails };
