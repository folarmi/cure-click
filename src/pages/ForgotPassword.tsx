/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";
import bannerTwo from "../assets/bannerTwo.svg";
import { useForm } from "react-hook-form";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import { useCustomMutation } from "../lib/apiCalls";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const forgotPasswordMutation = useCustomMutation({
    endpoint: `appointment/api/${
      userType === "patient" ? "patients" : "doctors"
    }/forget-password`,
    successMessage: () => "Registration successful!",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: (data) => {
      // navigate("/login");
    },
  });

  const submitForm = (data: any) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <AuthTwoLayout
      mainText="Forgot password"
      subText="Provide the necessary details required to create your account"
      banner={bannerTwo}
    >
      <form className="px-4" onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="Email"
          placeholder="Input your email"
          className="mb-6"
          control={control}
          name="email"
        />

        <CustomButton
          isLoading={forgotPasswordMutation.isPending}
          disabled={forgotPasswordMutation.isPending}
          variant="primary"
          className="w-full mb-6"
        >
          Proceed
        </CustomButton>
      </form>
    </AuthTwoLayout>
  );
};

export { ForgotPassword };
