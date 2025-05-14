/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from "../components/layouts/DashboardLayout";
import sampleDoctor from "../assets/sampleDoctorOne.svg";
import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import { IoBriefcaseOutline } from "react-icons/io5";
import { HiOutlineTranslate } from "react-icons/hi";
import PricePerSession from "../components/atoms/PricePerSession";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomTextarea } from "../components/ui/CustomTextArea";
import { DashboardIcon } from "@radix-ui/react-icons";
import { PaymentBox } from "../components/ui/PaymentBox";
import { BackgroundHeader } from "../components/ui/BackgroundHeader";
import Breadcrumb from "../components/ui/BreadCrumb";
import Modal from "../components/ui/Modal";
import Availability from "../components/modals/Availability";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import {
  useCustomMutation,
  useFileUpload,
  useGetSingleDoctorData,
} from "../lib/apiCalls";
import { useNavigate, useParams } from "react-router";
import {
  capitalize,
  convertStartTimeToBackendFormat,
  getFullName,
  getTimeZoneInfo,
  isUploadedFileEmpty,
  renderCommaSeparatedSpans,
} from "../utils/util";
import { format, parseISO } from "date-fns";
import { getDayWithSuffix } from "../utils/calendarutil";
import FileUploader from "../components/FileUploader";

const Schedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const [modal, setModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File[]>([]);

  const userType = useAppSelector((state: RootState) => state.auth.userType);
  const { doctorId, timeSlot, selectedDate } = useAppSelector(
    (state: RootState) => state.schedule
  );
  const date =
    typeof selectedDate === "string" ? parseISO(selectedDate) : selectedDate;
  const formatted =
    date instanceof Date && !isNaN(date.getTime())
      ? `${format(date, "EEEE")}, ${getDayWithSuffix(date.getDate())} ${format(
          date,
          "MMMM yyyy"
        )}`
      : "";
  const { data: singleDoctorData } = useGetSingleDoctorData(
    userType === "patient",
    id || ""
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  const { mutate: uploadFile, isPending } = useFileUpload({
    url: "appointment/api/files/upload-multiple",
    successToast: () => `File uploaded successfully!`,
  });

  const bookAppointmentMutation = useCustomMutation({
    endpoint: `appointment/api/appointments`,
    successMessage: () => "Appointment booked sucessfully",
    errorMessage: (error: any) => error?.response?.data?.message,
    onSuccessCallback: () => {
      navigate("/dashboard");
    },
  });

  const bookAppointment = (data: any) => {
    const formData = {
      doctorPublicId: doctorId,
      topic: data.topic,
      transactionId: "string",
      details: data.details,
      appointmentDate: format(parseISO(selectedDate), "yyyy-MM-dd"),
      appointmentTime: convertStartTimeToBackendFormat(timeSlot),
      timezone: getTimeZoneInfo().id,
    };

    if (!isUploadedFileEmpty(uploadedFile)) {
      // First upload file, then update profile
      uploadFile(
        { file: uploadedFile },
        {
          onSuccess: (uploadResponse) => {
            console.log(uploadResponse);
            bookAppointmentMutation.mutate({
              ...formData,
              attachments: uploadResponse.data.url,
            });
          },
        }
      );
    } else {
      // No file to upload, just update profile
      bookAppointmentMutation.mutate(formData);
    }
  };

  return (
    <DashboardLayout ifHeader={false}>
      <BackgroundHeader ifDoctor className="hidden md:block h-full">
        <Breadcrumb
          Icon={DashboardIcon}
          route={`Dashboard / Find a Specialist /  ${getFullName(
            singleDoctorData?.data?.firstname,
            singleDoctorData?.data?.lastname
          )} / Schedule`}
        />
        {/* <Flex justify="end" className="absolute right-0 bottom-0">
          <img src={doctors} className="h-auto object-cover -mr-6" />
        </Flex> */}
      </BackgroundHeader>
      <Flex
        className="w-full px-4 md:px-12 bg-gray_bg flex-col md:flex-row"
        justify="end"
      >
        <Box className="flex flex-col items-center ml-auto ">
          <Box className="w-[100px] h-[100px] overflow-hidden rounded-lg">
            <img
              src={sampleDoctor}
              className="w-[100px] h-[100px] md:top-52 object-cover rounded-lg absolute"
            />
          </Box>

          <Text as="p" size="7" className="text-indigo_12 font-semibold">
            {getFullName(
              singleDoctorData?.data?.firstname,
              singleDoctorData?.data?.lastname
            )}
          </Text>

          <Flex className="space-x-2 mt-3 flex-wrap md:flex-nowrap justify-center">
            <Badge variant="soft" size="2" className="text-accent_alpha_11">
              <IoBriefcaseOutline className="w-4 h-4 " />
              {singleDoctorData?.data?.specialization || "N/A"}
            </Badge>
            <Badge variant="soft" size="2" className="text-blueA11 ml-2">
              <HiOutlineTranslate className="w-4 h-4 " />
              {(singleDoctorData?.data?.languages &&
                renderCommaSeparatedSpans(singleDoctorData.data.languages)) ||
                "N/A"}
            </Badge>
            <Badge
              variant="soft"
              size="2"
              className="text-cyanA11 bg-cyanA3 mt-4 md:mt-0"
            >
              <HiOutlineTranslate className="w-4 h-4 " />
              {singleDoctorData?.data?.hospitalWorkPlace || "N/A"}
            </Badge>
          </Flex>

          <Flex
            align="center"
            justify="between"
            className="mt-3 border border-gray2 p-4 w-full"
          >
            <Text size="2" className="text-gray11">
              {singleDoctorData?.data?.yearsOfExperience || "0"} years
              Experience
            </Text>
            <Text size="2" className="text-gray11">
              {capitalize(singleDoctorData?.data?.gender) || "N/A"}
            </Text>
            <Text size="2" className="text-gray11">
              {singleDoctorData?.data?.gender === "MALE" ? "He/Him" : "She/Her"}
            </Text>
          </Flex>

          <Flex
            justify="between"
            className="bg-white border border-gray3 p-4 mt-3 w-full"
          >
            <Text as="p" className="text-gray11">
              Pricing
            </Text>
            <PricePerSession
              price={singleDoctorData?.data?.pricing}
              currency={singleDoctorData?.data?.currency}
            />
          </Flex>

          <Box className="mt-3 bg-white border border-gray2 p-4 justify-start w-full rounded-md mx-4">
            <Text as="p" weight="medium" className="text-gray12">
              Appointment Date
            </Text>

            <Text
              as="p"
              weight="regular"
              size="2"
              align="center"
              className="text-accent_alpha_11 md:hidden cursor-pointer"
              onClick={() => navigate("-1")}
            >
              Change
            </Text>

            <Flex className="mt-2 flex-col md:flex-row md:justify-between md:items-center">
              <Box className="bg-irisA2 border border-irisA3 py-2 w-auto md:w-[261px] md:mr-4">
                <Text
                  as="p"
                  weight="medium"
                  size="2"
                  align="center"
                  className="text-iris9"
                >
                  {formatted}
                </Text>
              </Box>
              <Box className="bg-irisA2 border border-irisA3 py-2 md:w-[261px] mt-3 md:mt-0">
                <Text
                  as="p"
                  weight="medium"
                  size="2"
                  align="center"
                  className="text-iris9"
                >
                  {timeSlot}
                </Text>
              </Box>

              <Text
                as="p"
                weight="regular"
                size="2"
                align="center"
                className="text-accent_alpha_11 hidden md:block"
              >
                Change
              </Text>
            </Flex>
          </Box>

          <form className="w-full" onSubmit={handleSubmit(bookAppointment)}>
            <Box className="mt-3 bg-white border border-gray2 p-4 justify-start  rounded-md">
              <Text size="2" as="p" weight="medium" className="text-gray12">
                Appointment Details
              </Text>

              <Box className="mt-4">
                <CustomInput
                  label="Appointment Topic*"
                  placeholder="Geriatric"
                  type="text"
                  control={control}
                  name="topic"
                />
                <CustomTextarea
                  label="Reason for Appointment*"
                  placeholder="Brief summary of what the doctor should expect"
                  className="mt-3 mb-4"
                  control={control}
                  name="details"
                />
              </Box>
            </Box>

            <div className="upload-section-container">
              <Flex
                align="center"
                className="mt-3 w-full bg-white p-4"
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
                    Provide any document or image that would assist this
                    specialist in rendering professional service to you
                  </Text>
                </Box>

                {/* Only the upload button part renders here */}
                <FileUploader
                  maxSizeMB={5}
                  acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
                  onFileUpload={setUploadedFile}
                />
              </Flex>

              {/* The previews will automatically render here */}
            </div>

            <Button
              size="3"
              variant="solid"
              radius="medium"
              onClick={toggleModal}
              className="bg-grass9 w-full mb-6 font-semibold text-base cursor-pointer md:hidden mx-6"
            >
              Proceed to Pay
            </Button>
            <Button
              size="3"
              variant="solid"
              radius="medium"
              disabled={isPending || bookAppointmentMutation.isPending}
              loading={isPending || bookAppointmentMutation.isPending}
              className="bg-grass9 w-full mb-6 font-semibold text-base cursor-pointer mx-6"
            >
              Proceed to Pay
            </Button>
          </form>
        </Box>

        <Box className="">
          <PaymentBox
            toggleModal={toggleModal}
            className="hidden md:block"
            price={singleDoctorData?.data?.pricing}
            currency={singleDoctorData?.data?.currency}
          />
        </Box>
      </Flex>

      <Modal show={modal} toggleModal={toggleModal}>
        <div className="p-4">
          <Availability toggleModal={toggleModal} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Schedule;

// {
//   "date": "2025-05-09T03:50:25.0897541",
//   "data": {
//       "doctorCredentials": {
//           "room_id": null,
//           "nbf": "Fri May 09 09:00:00 EDT 2025",
//           "user_id": "053013N42HSF25472",
//           "secret": "77545aebf428ee6ca2b4d6e6842b5729",
//           "app_id": "576590338",
//           "email": "bestDoc@mailinator.com",
//           "username": "fygabubuh"
//       },
//       "patientCredentials": {
//           "room_id": null,
//           "nbf": "Fri May 09 09:00:00 EDT 2025",
//           "user_id": "10085709HO7F27468",
//           "secret": "77545aebf428ee6ca2b4d6e6842b5729",
//           "app_id": "576590338",
//           "email": "realPatient@mailinator.com",
//           "username": "hijic"
//       }
//   },
//   "isSuccess": true,
//   "isError": false,
//   "message": "Operation Completed Successfully",
//   "status": "SUCCESS"
// }
