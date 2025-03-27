/* eslint-disable @typescript-eslint/no-explicit-any */
import { FcGoogle } from "react-icons/fc";
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomText } from "../components/ui/CustomText";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../lib/apiCalls";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { setUserType } from "../lib/features/authSlice";
import { decodeLogin } from "../utils/util";

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const { loginFromContext } = useAuth();
  const dispatch = useDispatch();

  const loginMutation = useCustomMutation({
    endpoint: `auth/${import.meta.env.VITE_KEY_CLOAK}/token`,
    contentType: "application/x-www-form-urlencoded",
    successMessage: () => "Login Successful",
    errorMessage: (error: any) => error?.response?.data?.error_description,
    onSuccessCallback: (data: any) => {
      loginFromContext(data?.access_token, data?.refresh_token);
      navigate("/dashboard");
      dispatch(
        setUserType(
          decodeLogin()?.resource_access?.cureclick?.roles[0] === "ROLE_PATIENT"
            ? "patient"
            : "doctor"
        )
      );
    },
  });

  const submitForm = (data: any) => {
    const params = new URLSearchParams();
    params.append("username", data.email);
    params.append("password", data.password);
    params.append("client_id", import.meta.env.VITE_CLIENT_ID);
    params.append("client_secret", import.meta.env.VITE_ClIENT_SECRET);
    params.append("grant_type", import.meta.env.VITE_GRANT_TYPE);
    loginMutation.mutate(params);
  };

  return (
    <AuthTwoLayout
      authQuestion="New On Cure Click?"
      callToAction="Create an Account"
      mainText="Login to Your Account"
      subText="Provide the necessary details required to create your account"
    >
      <form className="px-4" onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="Email"
          placeholder="user@mail.com"
          className="mb-6"
          type="email"
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
        />
        <CustomInput
          label="Password"
          placeholder="Input your password"
          type="password"
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
        />
        <CustomText
          size="medium"
          weight="normal"
          className="pt-8 pb-10 text-neutral_11 text-center cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot your Password?
        </CustomText>

        <CustomButton
          isLoading={loginMutation.isPending}
          disabled={loginMutation.isPending}
          variant="primary"
          className="w-full"
          type="submit"
        >
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
