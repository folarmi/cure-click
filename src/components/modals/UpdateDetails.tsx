/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import { CustomInput } from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";
import avatar from "../../assets/avatar.svg";
import {
  availability,
  gender,
  sampleCurrencies,
  sampleLanguages,
  sampleSpecializations,
} from "../../utils/data";
import { CustomTextarea } from "../ui/CustomTextArea";
import CallOut from "../atoms/CallOut";
import { useForm } from "react-hook-form";
import {
  useCustomMutation,
  useFileUpload,
  useGetData,
  useGetDoctorProfile,
} from "../../lib/apiCalls";
import FileUploader from "../FileUploader";
import { useEffect, useMemo, useState } from "react";
import {
  filterObject,
  getAllCountryOptions,
  keysToRemove,
  stringToNumber,
} from "../../utils/util";
import { Loader } from "../ui/Loader";
import Breadcrumb from "../ui/BreadCrumb";
import { DashboardIcon } from "@radix-ui/react-icons";

const UpdateDetails = ({ toggleModal }: any) => {
  const countryOptions = useMemo(() => getAllCountryOptions(), []);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
    useGetDoctorProfile();

  const { mutate: uploadFile, isPending } = useFileUpload({
    successToast: () => `File uploaded successfully!`,
    errorToast: (error) => error.response?.data?.message || "Upload failed",
    onSuccess: () => {
      toggleModal();
    },
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: doctorProfile?.data,
  });

  const updateDoctorProfileMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/profile`,
    successMessage: () => "Profile Updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "put",
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const updateDoctorPricingMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/pricing`,
    successMessage: () => "Pricing Updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "patch",
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    let formData = filterObject(data, keysToRemove);

    formData = {
      ...formData,
      yearsOfExperience: stringToNumber(data?.yearsOfExperience),
    };

    updateDoctorProfileMutation.mutate(formData);
  };

  const submitPricingForm = (data: any) => {
    updateDoctorPricingMutation.mutate(data?.pricing);
  };

  const updateProfilePicture = () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // // Append additional data
      // Object.entries(additionalData).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      uploadFile({ file: uploadedFile });
    }
  };

  useEffect(() => {
    if (doctorProfile?.data) {
      reset(doctorProfile.data);
    }
  }, [doctorProfile, reset]);

  return (
    <>
      {doctorProfileIsLoading ? (
        <Loader />
      ) : (
        <form className="mb-8" onSubmit={handleSubmit(submitForm)}>
          <Breadcrumb Icon={DashboardIcon} route="Account Settings" />
          <Flex
            justify="between"
            align="center"
            className="border-b border-gray_3 pb-2 mt-8"
          >
            <div className="">
              <Text as="p" className="font-semibold text-gray12" size="4">
                Update your details
              </Text>
              <Text as="p" className="font-normal text-gray11" size="3">
                Update your account profile details
              </Text>
            </div>

            <Button
              disabled={updateDoctorProfileMutation.isPending}
              loading={updateDoctorProfileMutation.isPending}
              className="bg-grass9 font-medium"
            >
              Save
            </Button>
            {/* <BiX onClick={toggleModal} className="cursor-pointer" /> */}
          </Flex>

          {/* <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
            onFileUpload={setUploadedFile}
            // defaultFile={defaultValues?.image}
          /> */}
          {/* <Flex align="center" className="mt-8">
            <img src={avatar} className="w-16 h-16" />
            <Box className="ml-4">
              <Button
                size="2"
                className="bg-white text-neutral_11 font-medium text-sm"
                style={{
                  border: "1px solid #00083046",
                }}
                onClick={() => updateProfilePicture()}
                loading={isPending}
              >
                Update Image
              </Button>
              <Text as="p" size="1" className="text-gray10 pt-1">
                Profile image should be less than 5mb
              </Text>
            </Box>
          </Flex> */}

          <div className="mt-8 mx-auto w-[66%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray_3 rounded-lg p-6">
              <Text
                as="p"
                className="font-semibold text-gray12 col-span-2"
                size="4"
              >
                Basic Information
              </Text>

              <CustomInput
                label="First name"
                placeholder="Input your firstname"
                control={control}
                name="firstname"
                disabled
              />
              <CustomInput
                label="Last name"
                placeholder="Input your lastname"
                control={control}
                name="lastname"
                disabled
              />
              <CustomInput
                label="Email"
                placeholder="test@email.com"
                control={control}
                name="email"
                disabled
              />
              <CustomSelect
                options={countryOptions}
                placeholder="Select your country"
                label="Country"
                ifGrayBg={false}
                name="country"
                control={control}
              />
              <CustomSelect
                options={gender}
                placeholder="Select your Gender"
                label="Gender"
                ifGrayBg={false}
                name="gender"
                control={control}
              />
              <CustomInput
                label="Username"
                placeholder="Input your username"
                control={control}
                name="username"
                disabled
              />

              <CustomInput
                label="Years of Experience"
                placeholder="0"
                control={control}
                name="yearsOfExperience"
              />

              <CustomSelect
                options={sampleCurrencies}
                placeholder="Select your currency"
                label="Currency"
                ifGrayBg={false}
                name="currency"
                control={control}
              />

              <CustomSelect
                options={sampleSpecializations}
                placeholder="What is your speciality"
                label="Speciality?"
                ifGrayBg={false}
                name="specialization"
                control={control}
              />

              <CustomInput
                label="Current Workplace"
                placeholder="What hospital do you work in?"
                control={control}
                name="hospitalWorkPlace"
              />

              <CustomSelect
                options={availability}
                placeholder="Availability"
                label="Availability"
                ifGrayBg={false}
                name="availabilityStatus"
                control={control}
              />

              <CustomSelect
                options={sampleLanguages}
                placeholder="What language(s) do you speak"
                label="Language(s)"
                ifGrayBg={false}
                name="languages"
                control={control}
                isMulti
                className="col-span-2"
              />

              <CustomTextarea
                control={control}
                name="biography"
                label="Your Bio"
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-1 border border-gray_3 rounded-lg p-6 mt-6">
              <Text as="p" className="font-semibold text-gray12" size="4">
                Pricing Information
              </Text>

              <CustomInput
                label="Pricing Per Session"
                placeholder="$1300"
                className="mt-6"
                control={control}
                name="pricing"
              />
              <CallOut
                text="CureClick charges you 0.3% for every session you hold"
                bgColor="bg-neutral_alpha_3"
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export { UpdateDetails };
