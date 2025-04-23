/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "../components/layouts/AuthLayout";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomButton } from "../components/ui/CustomButton";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../lib/apiCalls";
import { useNavigate } from "react-router";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const Register = () => {
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const registerMutation = useCustomMutation({
    endpoint: `appointment/api/${
      userType === "patient" ? "patients" : "doctors"
    }/create-account`,
    successMessage: () => "Registration successful!",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      navigate("/login");
    },
  });

  const submitForm = (data: any) => {
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout
      mainText="Create Your Account"
      subText="Provide the necessary details required to create your account"
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col justify-center w-full md:w-1/2 mx-auto px-4 md:px-0"
      >
        <CustomInput
          label="First name"
          placeholder="Input your first name"
          className="mb-6"
          control={control}
          name="firstname"
          // rules={{ required: "Firstname is required" }}
        />
        <CustomInput
          label="Last name"
          placeholder="Input your last name"
          className="mb-6"
          control={control}
          name="lastname"
          // rules={{ required: "Lastname is required" }}
        />
        <CustomInput
          label="Email"
          placeholder="Input your email"
          type="email"
          className="mb-6"
          control={control}
          name="email"
          // rules={{ required: "Email is required" }}
        />
        <CustomInput
          label="Username"
          placeholder="Input your username"
          className="mb-6"
          control={control}
          name="username"
          // rules={{ required: "Firstname is required" }}
        />
        <CustomInput
          label="Password"
          placeholder="Input your password"
          type="password"
          control={control}
          name="password"
          // rules={{ required: "Password is required" }}
        />

        <CustomButton
          isLoading={registerMutation.isPending}
          disabled={registerMutation.isPending}
          variant="primary"
          className="mt-8"
        >
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
