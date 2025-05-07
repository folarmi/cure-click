/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";
import bannerTwo from "../assets/bannerTwo.svg";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../lib/apiCalls";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const forgotPasswordMutation = useCustomMutation({
    endpoint: `appointment/api/auth/forget-password`,
    successMessage: () => "A Reset password link has been sent to your email",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      navigate("/login");
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
