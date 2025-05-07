/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";
import { useCustomMutation } from "../lib/apiCalls";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const [searchParams] = useSearchParams();
  const [password, confirmPassword] = watch(["password", "confirmPassword"]);

  const resetPasswordMutation = useCustomMutation({
    endpoint: `appointment/api/auth/reset-password?token=${searchParams.get(
      "token"
    )},`,
    successMessage: () => "Password reset successful!",
    errorMessage: (error: any) => error?.response?.data?.remark,
    method: "put",
    onSuccessCallback: (data) => {
      console.log(data);
      navigate("/login");
    },
  });

  const submitForm = (data: any) => {
    const formData = {
      password: data.password,
    };
    resetPasswordMutation.mutate(formData);
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
          name="password"
        />
        <CustomInput
          label="Re-Type Password"
          placeholder="Re-type your new password"
          type="password"
          control={control}
          name="confirmPassword"
          rules={{
            required: "Confirm Password is required",
            minLength: {
              value: 8,
              message: "Minimum of 8 characters",
            },
            validate: () =>
              password === confirmPassword || "Passwords do not match",
          }}
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
