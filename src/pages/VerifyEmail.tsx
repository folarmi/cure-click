/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@radix-ui/themes";
import AuthLayout from "../components/layouts/AuthLayout";
import { CustomButton } from "../components/ui/CustomButton";
// import { CustomText } from "../components/ui/CustomText";
import { CustomInput } from "../components/ui/CustomInput";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCustomMutation } from "../lib/apiCalls";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: searchParams.get("email"),
    },
  });

  const verifyEmailMutation = useCustomMutation({
    endpoint: `appointment/api/auth/verify-email?token=${searchParams.get(
      "token"
    )}&email=${searchParams.get("email")}`,
    successMessage: () => "Email verified succesfully",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      navigate("/login");
    },
  });

  const submitForm = () => {
    verifyEmailMutation.mutate({});
  };
  return (
    <AuthLayout
      mainText="Verify your Email"
      subText={`we sent a token to ${searchParams.get("email")}`}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col justify-center w-full md:w-1/2 px-4 md:px-0 mx-auto"
      >
        <Flex align="center" justify="center" className="space-x-6 rounded-md">
          {/* <TextField.Root
            size="3"
            variant="surface"
            className="w-10 h-10"
            placeholder="-"
          />
          <TextField.Root
            size="3"
            variant="surface"
            className="w-10 h-10"
            placeholder="-"
          />
          <TextField.Root
            size="3"
            variant="surface"
            className="w-10 h-10"
            placeholder="-"
          />
          <TextField.Root
            size="3"
            variant="surface"
            className="w-10 h-10"
            placeholder="-"
          />
          <TextField.Root
            size="3"
            variant="surface"
            className="w-10 h-10"
            placeholder="-"
          />
          <TextField.Root
            size="3"
            variant="surface"
            className="w-10 h-10"
            placeholder="-"
          /> */}
          <CustomInput
            label="Email"
            placeholder=""
            className="mb-2"
            control={control}
            disabled
            name="email"
          />
        </Flex>
        <CustomButton
          variant="primary"
          className="mt-8"
          isLoading={verifyEmailMutation.isPending}
          disabled={verifyEmailMutation.isPending}
        >
          Verify Email
        </CustomButton>
        {/* <CustomText
          size="medium"
          weight="normal"
          className={`text-neutral_11 mt-8 text-center`}
        >
          Resend Code in <span className="text-grass_9 font-semibold">10s</span>
        </CustomText> */}
      </form>
    </AuthLayout>
  );
};

export { VerifyEmail };
