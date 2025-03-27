/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
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
} from "../../lib/apiCalls";
import FileUploader from "../FileUploader";
import { useEffect, useMemo, useState } from "react";
import {
  filterObject,
  getAllCountryOptions,
  stringToNumber,
} from "../../utils/util";
import { Loader } from "../ui/Loader";

const UpdateDetails = ({ toggleModal }: any) => {
  const countryOptions = useMemo(() => getAllCountryOptions(), []);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { mutate: uploadFile, isPending } = useFileUpload({
    successToast: () => `File uploaded successfully!`,
    errorToast: (error) => error.response?.data?.message || "Upload failed",
    // errorToast: (error) => {
    //   console.log(error?.response?.data?.message);
    // },
    onSuccess: (data) => {
      console.log("Upload complete:", data);
      toggleModal();
      // Update your state here
    },
  });

  const { data: doctorProfile, isLoading: doctorProfileIsLoading } = useGetData(
    {
      url: `appointment/api/doctors/profile`,
      queryKey: ["GetSingleDoctorProfile"],
    }
  );

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
    const keysToRemove = [
      "publicId",
      "createdDate",
      "lastModifiedDate",
      "createdBy",
      "modifiedBy",
    ];
    let formData = filterObject(data, keysToRemove);

    formData = {
      ...formData,
      yearsOfExperience: stringToNumber(data?.yearsOfExperience),
    };

    updateDoctorProfileMutation.mutate(formData);
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
        <div className="bg-white w-[525px] p-4 overflow-scroll max-h-screen my-8">
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

              <FileUploader
                maxSizeMB={1}
                acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
                onFileUpload={setUploadedFile}
                // defaultFile={defaultValues?.image}
              />
              <Flex align="center" className="mt-8">
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
              </Flex>

              <form
                className="gap-y-4 flex flex-col mt-8"
                onSubmit={handleSubmit(submitForm)}
              >
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
                  options={gender}
                  placeholder="Select your Gender"
                  label="Gender"
                  ifGrayBg={false}
                  name="gender"
                  control={control}
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
                  options={sampleCurrencies}
                  placeholder="Select your currency"
                  label="Currency"
                  ifGrayBg={false}
                  name="currency"
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

                <CustomTextarea
                  control={control}
                  name="biography"
                  label="Your Bio"
                  className="mt-4"
                />

                <Button
                  disabled={updateDoctorProfileMutation.isPending}
                  loading={updateDoctorProfileMutation.isPending}
                  className="mt-4 bg-grass9 w-full font-medium"
                >
                  Update
                </Button>
              </form>
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
                control={control}
                name="pricing"
              />

              <CallOut
                text="CureClick charges you 0.3% for every session you hold"
                bgColor="bg-alpha_3"
              />

              <Button className="mt-4 bg-grass9 w-full font-medium">
                Update
              </Button>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      )}
    </>
  );
};

export { UpdateDetails };
