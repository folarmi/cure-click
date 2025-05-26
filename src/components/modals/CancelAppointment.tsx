/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import { MeetingCard } from "../cards/MeetingCard";
import { CustomTextarea } from "../ui/CustomTextArea";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { useForm } from "react-hook-form";
import { Appointment } from "../../utils/types";
import { formatAppointmentTime } from "../../utils/calendarutil";
import { getFullName } from "../../utils/util";
import { useState } from "react";
import { CustomRadioGroup } from "../CustomRadioGroup";
import { getReasonLabels } from "../../utils/data";
import {
  useCustomMutation,
  useGetDoctorProfile,
  useGetPatientProfile,
} from "../../lib/apiCalls";

type Prop = {
  toggleModal: () => void;
  details: Appointment;
};

const CancelAppointment = ({ toggleModal, details }: Prop) => {
  const { control, getValues } = useForm();
  const [selectedReason, setSelectedReason] = useState("");
  const userType = useSelector((state: RootState) => state.auth.userType);
  const { data: patientProfileData } = useGetPatientProfile(
    userType === "patient"
  );
  const { data: doctorProfile } = useGetDoctorProfile(userType === "doctor");

  const cancelAppointmentMutation = useCustomMutation({
    endpoint: `/appointments/cancel/${
      userType === "patient"
        ? patientProfileData?.data?.publicId
        : doctorProfile?.data?.publicId
    }`,
    successMessage: () => "Profile Updated sucessfully",
    errorMessage: (error: any) => error?.response?.message,
    method: "put",
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = () => {
    const formData = {
      who: userType === "patient" ? "PATIENT" : "DOCTOR",
      reason:
        selectedReason === "Other Reasons"
          ? getValues("reason")
          : selectedReason,
    };
    cancelAppointmentMutation.mutate(formData);
  };

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
        <BiX onClick={toggleModal} className="cursor-pointer w-6 h-6" />
      </Flex>

      <MeetingCard
        title={details?.topic}
        date={details?.appointmentDate}
        time={formatAppointmentTime(
          details?.appointmentDate,
          details?.appointmentTime
        )}
        patientName={getFullName(
          details?.patient?.firstname,
          details?.patient?.lastname
        )}
        doctorName={getFullName(
          details?.doctor?.firstname,
          details?.doctor?.lastname
        )}
        speciality={details?.doctor?.specialization}
        onClick={toggleModal}
        ifButtons={false}
        ifModal
      />

      <Flex className="my-4 px-10" align="center" justify="between">
        <Text as="p" weight="regular" size="3" className="text-gray11">
          Appointment Fee
        </Text>
        <Text as="p" weight="medium" size="3" className="text-gray12">
          NGN 30,500.00
        </Text>
      </Flex>

      <Box
        className={`${
          userType === "patient" ? "bg-iris3" : "bg-grass3"
        } rounded py-3 px-4`}
      >
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

        <div className="mt-4">
          <CustomRadioGroup
            options={getReasonLabels(userType)}
            value={selectedReason}
            onValueChange={setSelectedReason}
            name="gender"
          />
        </div>

        {selectedReason === "Other Reasons" && (
          <CustomTextarea
            label="Input Reason*"
            className="mt-2"
            placeholder="Input your Reasons"
            control={control}
            name="reason"
          />
        )}

        <Flex align="center" justify="between" mt="4" mb="4">
          <Button
            onClick={() => submitForm()}
            disabled={cancelAppointmentMutation.isPending}
            loading={cancelAppointmentMutation.isPending}
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

export default CancelAppointment;
