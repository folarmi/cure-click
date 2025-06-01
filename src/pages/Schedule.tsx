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
import { BackgroundHeader } from "../components/ui/BackgroundHeader";
import Breadcrumb from "../components/ui/BreadCrumb";
import Modal from "../components/ui/Modal";
import Availability from "../components/modals/Availability";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import {
  useCustomMutation,
  useFileUpload,
  useGetPatientProfile,
  useGetSingleDoctorData,
} from "../lib/apiCalls";
import { useLocation, useNavigate } from "react-router";
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
import { DefaultProfile } from "../components/ui/DefaultProfile";
import { getFirstAndLastInitials } from "../utils/randomUtil";
import { PaymentConfirmationModal } from "../components/modals/PaymentConfirmationModal";
import { useDispatch } from "react-redux";
import {
  updateAppointmentDetails,
  updateAppointmentTopic,
} from "../lib/features/scheduleSlice";

const Schedule = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(search);
  const { control, handleSubmit, getValues } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File[]>([]);
  const [modal, setModal] = useState(false);

  const handleOpenNewTab = (url: string) => {
    window.open(url, "_self", "noopener,noreferrer");
  };

  const status = queryParams.get("status");
  const txRef = queryParams.get("tx_ref");
  const transactionId = queryParams.get("transaction_id");

  const userType = useAppSelector((state: RootState) => state.auth.userType);
  const {
    doctorId,
    timeSlot,
    selectedDate,
    appointmentDetails,
    appointmentTopic,
  } = useAppSelector((state: RootState) => state.schedule);

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
    doctorId || ""
  );

  // const singleDoctorData = {};
  const { data: patientProfileData } = useGetPatientProfile(
    userType === "patient"
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  const togglePaymentModal = () => {
    setShowModal(!showModal);
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

  const createPaymentLinkMutation = useCustomMutation({
    endpoint: "payment/api/flutterwave/payment-link",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
  });

  const generatePaymentLink = () => {
    const paymentFormData = {
      amount: singleDoctorData?.data?.pricing,
      senderEmail: patientProfileData?.data?.email,
      senderPhone: patientProfileData?.data?.email,
      senderNames: getFullName(
        patientProfileData?.data?.firstname,
        patientProfileData?.data?.lastname
      ),
      currency: "NGN",
    };

    dispatch(updateAppointmentDetails(getValues("details")));
    dispatch(updateAppointmentTopic(getValues("topic")));

    createPaymentLinkMutation.mutate(paymentFormData, {
      onSuccess: (data) => {
        handleOpenNewTab(data?.data?.data?.link);
      },
    });
  };
  const bookAppointment = (formValues: any) => {
    const formData = {
      doctorPublicId: doctorId,
      topic: formValues.topic,
      transactionReference: txRef,
      details: formValues.details,
      appointmentDate: format(parseISO(selectedDate), "yyyy-MM-dd"),
      appointmentTime: convertStartTimeToBackendFormat(timeSlot),
      timezone: getTimeZoneInfo().id,
    };

    if (!isUploadedFileEmpty(uploadedFile)) {
      uploadFile(
        { file: uploadedFile },
        {
          onSuccess: (uploadResponse) => {
            bookAppointmentMutation.mutate({
              ...formData,
              attachments: uploadResponse.data.url,
            });
          },
        }
      );
    } else {
      bookAppointmentMutation.mutate(formData);
    }
  };

  useEffect(() => {
    if (status && txRef && transactionId) {
      setShowModal(true);
    }
  }, [status, txRef, transactionId]);

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
        <Box className="flex flex-col items-center mx-auto ">
          {/* <Box className="w-[100px] h-[100px] overflow-hidden rounded-lg">
            <img
              src={sampleDoctor}
              className="w-[100px] h-[100px] md:top-52 object-cover rounded-lg absolute"
            />
          </Box> */}

          {singleDoctorData?.data?.profilePictureUrl ? (
            <Box className="w-[100px] h-[100px] relative rounded-lg">
              <img
                src={singleDoctorData?.data?.profilePictureUrl || sampleDoctor}
                className="w-[100px] h-[100px] object-cover rounded-lg absolute md:-top-6"
              />
            </Box>
          ) : (
            <DefaultProfile
              size="w-16 h-16"
              initials={getFirstAndLastInitials(
                singleDoctorData?.data?.firstname,
                singleDoctorData?.data?.lastname
              )}
            />
          )}

          <Text as="p" size="7" className="text-indigo_12 font-semibold">
            {getFullName(
              singleDoctorData?.data?.firstname,
              singleDoctorData?.data?.lastname
            )}
          </Text>

          <Flex className="space-x-2 mt-3 flex-wrap md:flex-nowrap md:justify-center w-full">
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
              className="text-cyanA11 bg-cyanA3 md:mt-0"
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

          <form className="w-full" onSubmit={handleSubmit(generatePaymentLink)}>
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
                    className="text-gray11 w-full max-w-[371px]"
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
                  multiple
                />
              </Flex>

              {/* The previews will automatically render here */}
            </div>

            <Button
              size="3"
              variant="solid"
              radius="medium"
              disabled={
                isPending ||
                bookAppointmentMutation.isPending ||
                createPaymentLinkMutation.isPending
              }
              loading={
                isPending ||
                bookAppointmentMutation.isPending ||
                createPaymentLinkMutation.isPending
              }
              className="bg-grass9 w-full lg:w-full mb-6 font-semibold text-base cursor-pointer lg:mx-6"
            >
              Proceed to Pay
            </Button>
          </form>
        </Box>
      </Flex>

      <Modal show={modal} toggleModal={toggleModal}>
        <div className="p-4">
          <Availability toggleModal={toggleModal} />
        </div>
      </Modal>

      <Modal show={showModal} toggleModal={togglePaymentModal}>
        <div className="p-4">
          <PaymentConfirmationModal
            status={status}
            toggleModal={togglePaymentModal}
            createAppointment={() =>
              bookAppointment({
                details: appointmentDetails,
                topic: appointmentTopic,
              })
            }
            transactionID={transactionId}
            serviceFee={singleDoctorData?.data?.pricing}
            customerEmail={singleDoctorData?.data?.email}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Schedule;
