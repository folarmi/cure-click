/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@radix-ui/themes";
import { CustomInput } from "../components/ui/CustomInput";
import CustomSelect from "../components/ui/CustomSelect";
import { gender } from "../utils/data";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { DoctorAccountProfile } from "./DoctorAccountProfile";
import { useForm } from "react-hook-form";
import { useCustomMutation, useGetData } from "../lib/apiCalls";
import { Loader } from "../components/ui/Loader";
import {
  filterObject,
  getAllCountryOptions,
  keysToRemove,
} from "../utils/util";
import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AccountProfile = () => {
  const queryClient = useQueryClient();
  const countryOptions = useMemo(() => getAllCountryOptions(), []);

  const userType = useSelector((state: RootState) => state.auth.userType);

  const { data: patientProfile, isLoading: patientProfileIsLoading } =
    useGetData({
      url: `appointment/api/patients/profile`,
      queryKey: ["GetSinglePatientProfile"],
      enabled: userType === "patient",
    });

  const { control, reset, handleSubmit } = useForm({
    defaultValues: patientProfile?.data,
  });

  const updatePatientProfileMutation = useCustomMutation({
    endpoint: `appointment/api/patients/profile`,
    successMessage: () => "Profile Updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.message,
    method: "put",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetSinglePatientProfile"],
      });
    },
  });

  useEffect(() => {
    if (patientProfile?.data) {
      reset(patientProfile.data);
    }
  }, [patientProfile, reset]);

  const submitForm = (data: any) => {
    const formData = filterObject(data, keysToRemove);
    updatePatientProfileMutation.mutate(formData);
  };

  return (
    <>
      {userType === "patient" ? (
        <>
          {patientProfileIsLoading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(submitForm)}>
              <Box className="p-6 max-w-3xl mx-auto border border-gray3 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  label="First name"
                  control={control}
                  name="firstname"
                  disabled
                />
                <CustomInput
                  label="Last name"
                  control={control}
                  name="lastname"
                  disabled
                />
                <CustomInput
                  label="Username"
                  control={control}
                  name="username"
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
              </Box>
              <Button
                size="3"
                loading={updatePatientProfileMutation.isPending}
                disabled={updatePatientProfileMutation.isPending}
                className=" bg-grass_9 font-medium text-base cursor-pointer flex justify-center items-center mx-auto w-1/4 mt-0  md:mt-8 "
              >
                Save
              </Button>
            </form>
          )}
        </>
      ) : (
        <DoctorAccountProfile />
      )}
    </>
  );
};

export default AccountProfile;
