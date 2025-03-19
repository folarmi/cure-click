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

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const { loginFromContext } = useAuth();

  const loginMutation = useCustomMutation({
    endpoint: `/realms/cureClick/protocol/openid-connect/token`,
    contentType: "application/x-www-form-urlencoded",
    successMessage: () => "Login Successful",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: (data: any) => {
      loginFromContext(data?.access_token, data?.refresh_token);
      navigate("/dashboard");
    },
  });

  // async function sendJsonRequest() {
  //   const url =
  //     "http://biyartech-svr01.biyartech.com:8443/auth/realms/cureClick/protocol/openid-connect/token";

  //   const params = new URLSearchParams();
  //   params.append("username", "superadmin");
  //   params.append("password", "superadmin");
  //   params.append("client_id", "cureclick");
  //   params.append("client_secret", "a1CrgMpknrBzYV4hRGTmcgcgS7TgDT9S");
  //   params.append("grant_type", "password");

  //   try {
  //     const response = await axios.post(url, params, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Accept: "application/json",
  //       },
  //     });

  //     console.log("Response:", response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Request failed:", error.response.status);
  //       console.error("Error Response:", error.response.data);
  //     } else {
  //       console.error("Error:", error.message);
  //     }
  //   }
  // }

  const submitForm = (data: any) => {
    const params = new URLSearchParams();
    params.append("username", data.username);
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
      <form className="px-4" onClick={handleSubmit(submitForm)}>
        <CustomInput
          label="Username"
          placeholder="Input your username"
          className="mb-6"
          control={control}
          name="username"
          rules={{ required: "Username is required" }}
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
