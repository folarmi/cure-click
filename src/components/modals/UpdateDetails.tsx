/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Flex, Text } from "@radix-ui/themes";
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
import { DashboardIcon as DashboardFilled } from "@radix-ui/react-icons";

const UpdateDetails = ({ toggleModal }: any) => {
  const countryOptions = useMemo(() => getAllCountryOptions(), []);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendFileUrl, setBackendFileUrl] = useState("");
  const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
    useGetDoctorProfile();

  const { mutate: uploadFile, isPending } = useFileUpload({
    successToast: () => `File uploaded successfully!`,
    errorToast: (error) => error.response?.data?.message || "Upload failed",
    onSuccess: (data) => {
      setBackendFileUrl(data?.data?.url);
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

  const submitForm = (data: any) => {
    let formData = filterObject(data, keysToRemove);

    formData = {
      ...formData,
      yearsOfExperience: stringToNumber(data?.yearsOfExperience),
      profilePictureUrl: backendFileUrl,
    };

    updateDoctorProfileMutation.mutate(formData);
  };

  const updateProfilePicture = () => {
    // console.log(uo)
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

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
          <div
            onClick={() => toggleModal()}
            className="flex items-center cursor-pointer"
          >
            <DashboardFilled
              fill="#838383"
              className="text-gray10 w-5 h-5 pr-1"
            />
            <Text as="p" weight="medium" className=" text-gray10" size="2">
              Account Settings / Account Profile
            </Text>
            <Text as="p" weight="medium" className=" text-gray12 pl-2" size="2">
              Update Profile
            </Text>
          </div>

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
          </Flex>

          <div className="mt-8 mx-auto w-[66%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray_3 rounded-lg p-6">
              <Text
                as="p"
                className="font-semibold text-gray12 col-span-2"
                size="4"
              >
                Basic Information
              </Text>

              <Flex align="center" className="col-span-2">
                <img
                  src={doctorProfile?.data?.profilePictureUrl || avatar}
                  className="w-16 h-16 object-fit"
                />
                <Box className="ml-4">
                  <FileUploader
                    maxSizeMB={5}
                    acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
                    onFileUpload={setUploadedFile}
                    // defaultFile={defaultValues?.image}
                  />

                  <Button
                    size="2"
                    className="bg-white text-neutral_11 font-medium text-sm mt-4"
                    style={{
                      border: "1px solid #00083046",
                    }}
                    type="button"
                    onClick={() => updateProfilePicture()}
                    loading={isPending}
                  >
                    Update Image
                  </Button>
                  <Text as="p" size="1" className="text-gray10 pt-1">
                    Profile image should be less than 5mb
                  </Text>
                </Box>
              </Flex>

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
                className="mt-6 mb-10"
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
