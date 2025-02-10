import AuthLayout from "../components/layouts/AuthLayout";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomButton } from "../components/ui/CustomButton";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <AuthLayout
      mainText="Create Your Account"
      subText="Provide the necessary details required to create your account"
    >
      <form className="flex flex-col justify-center w-full md:w-1/2 mx-auto px-4 md:px-0">
        <CustomInput
          label="First name"
          placeholder="Input your first name"
          className="mb-6"
        />
        <CustomInput
          label="Last name"
          placeholder="Input your last name"
          className="mb-6"
        />
        <CustomInput
          label="Email"
          placeholder="Input your email"
          type="email"
          className="mb-6"
        />
        <CustomInput
          label="Password"
          placeholder="Input your password"
          type="password"
        />

        <CustomButton variant="primary" className="mt-8">
          Proceed
        </CustomButton>
        <CustomButton icon={<FcGoogle />} variant="secondary" className="mt-6">
          Sign Up with Google
        </CustomButton>
      </form>
    </AuthLayout>
  );
};

export { Register };
