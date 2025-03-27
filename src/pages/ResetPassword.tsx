import { useForm } from "react-hook-form";
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";

const ResetPassword = () => {
  const { control } = useForm();
  return (
    <AuthTwoLayout
      callToAction="Create an Account"
      authQuestion="New On Cure Click?"
      mainText="Reset your password"
      subText="Provide the necessary details required to create your account"
    >
      <form className="px-4">
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

        <CustomButton variant="primary" className="w-full mt-8 mb-6">
          Proceed
        </CustomButton>
      </form>
    </AuthTwoLayout>
  );
};

export { ResetPassword };
