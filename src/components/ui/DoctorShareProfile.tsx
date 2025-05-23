/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex, Text } from "@radix-ui/themes";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  // useGetDoctorAvailableSessions,
  useGetDoctorProfile,
} from "../../lib/apiCalls";
import { getCurrencySymbol } from "../../utils/util";
import Modal from "./Modal";
import { useState } from "react";
import { PricingModal } from "../modals/PricingModal";
// import { DoctorCalendar } from "./DoctorCalendar";
import { CompactCalendar } from "./CompactCalendar";

const DoctorShareProfile = () => {
  const [pricingModal, setPricingmodal] = useState(false);
  const { data: doctorProfile } = useGetDoctorProfile();
  // const { data: doctorAvailableSessions } = useGetDoctorAvailableSessions(
  //   doctorProfile?.data?.publicId
  // );
  const toggleModal = () => {
    setPricingmodal(!pricingModal);
  };

  // const scheduleData = {
  //   ...doctorAvailableSessions?.data,
  //   date: doctorAvailableSessions?.date,
  // };

  // Sample start date (October 1, 2023)
  const startDate = new Date(2023, 9, 1);

  // Sample available dates (YYYY-MM-DD format)
  const [availableDates, setAvailableDates] = useState([
    "2023-10-02",
    "2023-10-04",
    "2023-10-06",
    "2023-10-09",
    "2023-10-11",
    "2023-10-13",
  ]);

  const handleDayClick = (date: any) => {
    const dateStr = date.toISOString().split("T")[0];
    setAvailableDates(
      (prev) =>
        prev.includes(dateStr)
          ? prev.filter((d) => d !== dateStr) // Remove if exists
          : [...prev, dateStr] // Add if doesn't exist
    );
  };

  return (
    <div>
      <Box className="border border-gray3 rounded-xl px-4 py-3">
        <Text size="3" className="text-gray12 font-medium">
          Your Pricing
        </Text>

        <Flex justify="between" className="mt-4">
          <Text as="p" className="font-semibold" size="6">
            {`${getCurrencySymbol(doctorProfile?.data?.currency || "NAIRA")} ${
              doctorProfile?.data?.pricing || "0"
            }`}
            <Text weight="regular" size="4" className="pl-2">
              Per session
            </Text>
          </Text>

          <Button
            size="2"
            style={{
              border: "1px solid var(--border-gray)",
            }}
            onClick={toggleModal}
            className="font-medium text-sm text-black_contrast bg-white rounded cursor-pointer"
          >
            Update
          </Button>
        </Flex>
      </Box>

      <Box className="border border-gray3 rounded-xl px-4 py-3 mt-4">
        <Text size="3" className="text-gray12 font-medium">
          Share your profile, amplify your reach
        </Text>
        <Text as="p" size="1" weight="regular" className="text-gray10 pt-4">
          https://cureclick.com/fada12365
        </Text>

        <Button
          size="2"
          style={{
            border: "1px solid var(--border-gray)",
          }}
          className="bg-white mt-2 mb-6 font-semibold text-black_contrast pl-2 text-sm w-full rounded-md"
        >
          <CopyIcon className=" w-4 h-4" />
          Copy Link
        </Button>

        <Callout.Root className="bg-accent_alpha_3 mt-4">
          <Callout.Icon></Callout.Icon>
          <Callout.Text>
            80% of top Doctors have an increase in booking when they share their
            profile links.
          </Callout.Text>
        </Callout.Root>
      </Box>

      <Box className=" rounded-xl px-4 py-3 mt-4">
        {/* <DoctorCalendar scheduleData={scheduleData} /> */}
        <CompactCalendar
          startDate={startDate}
          availableDates={availableDates}
          onDayClick={handleDayClick}
        />
      </Box>

      <Modal show={pricingModal} toggleModal={toggleModal}>
        <div className="p-4">
          <PricingModal toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export { DoctorShareProfile };
