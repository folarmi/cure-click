import DashboardLayout from "../components/layouts/DashboardLayout";
import sampleDoctor from "../assets/sampleDoctorOne.svg";
import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import { IoBriefcaseOutline } from "react-icons/io5";
import { HiOutlineTranslate } from "react-icons/hi";
import PricePerSession from "../components/atoms/PricePerSession";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomTextarea } from "../components/ui/CustomTextArea";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { PaymentBox } from "../components/ui/PaymentBox";

const Schedule = () => {
  return (
    <DashboardLayout>
      <Flex className="w-full px-12 bg-gray_bg" justify="end">
        <Box className="flex flex-col items-center ml-auto ">
          <Box className="w-[100px] h-[100px] overflow-hidden rounded-lg">
            <img
              src={sampleDoctor}
              className="w-full h-full object-cover rounded-lg"
            />
          </Box>

          <Text as="p" size="7" className="text-indigo_12 pt-4 font-semibold">
            Dr Franklin Chang
          </Text>

          <Flex className="space-x-2 mt-3">
            <Badge variant="soft" size="2" className="text-accent_alpha_11">
              <IoBriefcaseOutline className="w-4 h-4 " />
              Geriatric
            </Badge>
            <Badge variant="soft" size="2" className="text-blueA11 ml-2">
              <HiOutlineTranslate className="w-4 h-4 " />
              English, French, Dutch, German
            </Badge>
            <Badge variant="soft" size="2" className="text-cyanA11 bg-cyanA3">
              <HiOutlineTranslate className="w-4 h-4 " />
              Aberdeen Royal Infirmary Abe.., UK
            </Badge>
          </Flex>

          <Flex
            align="center"
            justify="between"
            className="mt-3 border border-gray2 p-4 w-full"
          >
            <Text size="2" className="text-gray11">
              7 years Experience
            </Text>
            <Text size="2" className="text-gray11">
              Male
            </Text>
            <Text size="2" className="text-gray11">
              He/Him
            </Text>
          </Flex>

          <Flex
            justify="between"
            className="bg-white border border-gray3 p-4 mt-3 w-full"
          >
            <Text as="p" className="text-gray11">
              Pricing
            </Text>
            <PricePerSession />
          </Flex>

          <Box className="mt-3 bg-white border border-gray2 p-4 justify-start w-full rounded-md mx-4">
            <Text as="p" weight="medium" className="text-gray12">
              Appointment Date
            </Text>

            <Flex align="center" justify="between" className="mt-2 ">
              <Box className="bg-irisA2 border border-irisA3 py-2 w-[261px] mr-4">
                <Text
                  as="p"
                  weight="medium"
                  size="2"
                  align="center"
                  className="text-iris9"
                >
                  Thursday , 5th February 2024
                </Text>
              </Box>
              <Box className="bg-irisA2 border border-irisA3 py-2 w-[261px]">
                <Text
                  as="p"
                  weight="medium"
                  size="2"
                  align="center"
                  className="text-iris9"
                >
                  12:00 - 1:00 PM
                </Text>
              </Box>

              <Text
                as="p"
                weight="regular"
                size="2"
                align="center"
                className="text-accent_alpha_11"
              >
                Change
              </Text>
            </Flex>
          </Box>

          <Box className="mt-3 bg-white border border-gray2 p-4 justify-start w-full rounded-md">
            <Text size="2" as="p" weight="medium" className="text-gray12">
              Appointment Details
            </Text>

            <Box className="mt-4">
              <CustomInput
                label="Appointment Topic*"
                placeholder="Geriatric"
                type="text"
              />
              <CustomTextarea
                label="Reason for Appointment*"
                placeholder="Brief summary of what the doctor should expect"
                className="mt-3 mb-4"
              />
            </Box>
          </Box>

          <Flex
            align="center"
            className="mt-3 mb-8 w-full bg-white p-4"
            justify="between"
          >
            <Box>
              <Text size="2" as="p" weight="medium" className="text-gray12">
                Upload Files
              </Text>
              <Text
                size="2"
                as="p"
                weight="regular"
                className="text-gray11 w-[371px]"
              >
                Provide any document or image that would assist this specialist
                in rendering professional service to you
              </Text>
            </Box>

            <Button
              className="text-accent_alpha_11 font-medium tex-sm bg-accent_alpha_3"
              size="2"
            >
              <PaperPlaneIcon />
              Upload
            </Button>
          </Flex>
        </Box>

        <Box className="">
          <PaymentBox />
        </Box>
      </Flex>
    </DashboardLayout>
  );
};

export default Schedule;
