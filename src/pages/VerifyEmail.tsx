import { Flex, TextField } from "@radix-ui/themes";
import AuthLayout from "../components/layouts/AuthLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomText } from "../components/ui/CustomText";

const VerifyEmail = () => {
  return (
    <AuthLayout
      mainText="Verify your Email"
      subText="we sent a code to ekpenyong2510@gmail.com"
    >
      <form className="flex flex-col justify-center w-1/2 mx-auto">
        <Flex align="center" justify="center" className="space-x-6 rounded-md">
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
          />
          <TextField.Root
            size="3"
            variant="surface"
            className="w-10 h-10"
            placeholder="-"
          />
        </Flex>
        <CustomButton variant="primary" className="mt-8">
          Proceed
        </CustomButton>
        <CustomText
          size="medium"
          weight="normal"
          className={`text-neutral_11 mt-8 text-center`}
        >
          Resend Code in <span className="text-grass_9 font-semibold">10s</span>
        </CustomText>
      </form>
    </AuthLayout>
  );
};

export { VerifyEmail };
