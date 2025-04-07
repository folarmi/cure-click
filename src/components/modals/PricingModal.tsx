/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Text } from "@radix-ui/themes";
import CallOut from "../atoms/CallOut";
import { BiX } from "react-icons/bi";
import { CustomInput } from "../ui/CustomInput";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../../lib/apiCalls";
import { useQueryClient } from "@tanstack/react-query";

const PricingModal = ({ toggleModal }: any) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm();

  const updateDoctorPricingMutation = useCustomMutation({
    endpoint: `appointment/api/doctors/pricing`,
    successMessage: () => "Pricing Updated sucessfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "patch",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetDoctorProfile"],
      });
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    updateDoctorPricingMutation.mutate(data.pricing);
  };

  return (
    <div className="w-[525px] rounded-lg bg-white p-4">
      <div className="flex justify-between">
        <Text as="p" className="font-semibold text-gray12 pb-4" size="4">
          Update Pricing Information
        </Text>
        <BiX onClick={toggleModal} className="w-6 h-6" />
      </div>
      <CallOut
        bgColor="#DAF1DB"
        text="Make changes to your pricing information"
      />

      <form onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="Pricing Per Session"
          placeholder="$1300"
          className="my-4"
          control={control}
          name="pricing"
        />

        <CallOut
          bgColor="rgba(0, 0, 51, 0.06)"
          text="CureClick charges you 0.3% for every session you hold"
        />

        <Button
          disabled={updateDoctorPricingMutation.isPending}
          loading={updateDoctorPricingMutation.isPending}
          className="bg-grass9 font-medium w-full my-4"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export { PricingModal };
