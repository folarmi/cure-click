import { FcGoogle } from "react-icons/fc";
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomText } from "../components/ui/CustomText";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

const Login = () => {
  const navigate = useNavigate();
  const userType = useSelector((state: RootState) => state.auth.userType);
  console.log(userType);

  return (
    <AuthTwoLayout
      authQuestion="New On Cure Click?"
      callToAction="Create an Account"
      mainText="Login to Your Account"
      subText="Provide the necessary details required to create your account"
    >
      <form className="px-4">
        <CustomInput
          label="Email"
          placeholder="Input your email"
          className="mb-6"
        />
        <CustomInput
          label="Password"
          placeholder="Input your password"
          type="password"
        />
        <CustomText
          size="medium"
          weight="normal"
          className="pt-8 pb-10 text-neutral_11 text-center cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot your Password?
        </CustomText>
        {/* <div className="w-full"> */}
        <CustomButton variant="primary" className="w-full">
          Proceed
        </CustomButton>
        <CustomButton
          icon={<FcGoogle />}
          variant="secondary"
          className="my-6 w-full"
        >
          Login with Google
        </CustomButton>
        {/* </div> */}
      </form>
    </AuthTwoLayout>
  );
};

export { Login };
