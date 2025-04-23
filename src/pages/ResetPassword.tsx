/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useCustomMutation } from "../lib/apiCalls";

const ResetPassword = () => {
  const { control, handleSubmit } = useForm();
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const resetPasswordMutation = useCustomMutation({
    endpoint: `appointment/api/${
      userType === "patient" ? "patients" : "doctors"
    }/password-reset`,
    successMessage: () => "Registration successful!",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: (data) => {
      console.log(data);
      // navigate("/login");
    },
  });

  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <AuthTwoLayout
      callToAction="Create an Account"
      authQuestion="New On Cure Click?"
      mainText="Reset your password"
      subText="Provide the necessary details required to create your account"
    >
      <form className="px-4" onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="New Password"
          placeholder="Input your new password"
          type="password"
          className="mb-6"
          control={control}
          name="firstname"
        />
        <CustomInput
          label="Re-Type Password"
          placeholder="Re-type your new password"
          type="password"
          control={control}
          name="firstname"
        />

        <CustomButton
          isLoading={resetPasswordMutation.isPending}
          disabled={resetPasswordMutation.isPending}
          variant="primary"
          className="w-full mt-8 mb-6"
        >
          Proceed
        </CustomButton>
      </form>
    </AuthTwoLayout>
  );
};

export { ResetPassword };
