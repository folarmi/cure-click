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

// {
//   "exp": 1742898105,
//   "iat": 1742897445,
//   "jti": "e23da543-bb87-4b72-9d92-03f9c91495f8",
//   "iss": "http://host.docker.internal:9001/realms/cureClick",
//   "aud": "account",
//   "sub": "3e926615-3a65-49a3-859d-54515d8f328e",
//   "typ": "Bearer",
//   "azp": "cureclick",
//   "sid": "f2918d11-35cf-4d37-a2c2-87f5b0608864",
//   "acr": "1",
//   "allowed-origins": [
//       "http://localhost:8443"
//   ],
//   "realm_access": {
//       "roles": [
//           "default-roles-cureclick",
//           "offline_access",
//           "uma_authorization"
//       ]
//   },
// "resource_access": {
//     "cureclick": {
//         "roles": [
//             "ROLE_PATIENT"
//         ]
//     },
//       "account": {
//           "roles": [
//               "manage-account",
//               "manage-account-links",
//               "view-profile"
//           ]
//       }
//   },
//   "scope": "openid profile email phone",
//   "email_verified": true,
//   "name": "Cain Fleming",
//   "preferred_username": "hove@mailinator.com",
//   "given_name": "Cain",
//   "family_name": "Fleming",
//   "email": "hove@mailinator.com"
// }
