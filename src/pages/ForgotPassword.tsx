import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";
import bannerTwo from "../assets/bannerTwo.svg";

const ForgotPassword = () => {
  return (
    <AuthTwoLayout
      mainText="Forgot password"
      subText="Provide the necessary details required to create your account"
      banner={bannerTwo}
    >
      <form className="px-4">
        <CustomInput
          label="Email"
          placeholder="Input your email"
          className="mb-6"
        />

        <CustomButton variant="primary" className="w-full mb-6">
          Proceed
        </CustomButton>
      </form>
    </AuthTwoLayout>
  );
};

export { ForgotPassword };
