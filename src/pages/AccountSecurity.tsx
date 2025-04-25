/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Switch, Text } from "@radix-ui/themes";
import { CustomInput } from "../components/ui/CustomInput";
import { useState } from "react";
import { CopyIcon } from "@radix-ui/react-icons";
import UpperAndLowerText from "../components/atoms/UpperAndLowerText";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../lib/apiCalls";

const AccountSecurity = () => {
  const { control, handleSubmit } = useForm();
  const userType = useSelector((state: RootState) => state.auth.userType);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const handleSwitchChange = () => {
    setIsSwitchEnabled((prevState) => !prevState);
  };

  const changePasswordMutation = useCustomMutation({
    endpoint: `appointment/api/${
      userType === "patient" ? "patients" : "doctors"
    }/reset-password`,
    method: "put",
    successMessage: () => "Registration successful!",
    onSuccessCallback: (data) => {
      console.log(data);
      // navigate("/login");
    },
  });

  const submitForm = (data: any) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <Box className="p-6 max-w-[660px] mx-auto border border-gray3 rounded-lg">
      {userType === "doctor" && (
        <>
          <UpperAndLowerText
            superText="Change Transaction Pin"
            subText="Update your transaction pin"
          />

          <CustomInput
            label="New Pin"
            placeholder="Input your pin"
            type="password"
            className="mt-6"
            control={control}
            name="firstname"
          />
          <CustomInput
            label="Confirm Pin"
            placeholder="re type new pin"
            type="password"
            className="mt-6 mb-10"
            control={control}
            name="firstname"
          />
        </>
      )}
      <UpperAndLowerText
        superText="Change password"
        subText="Update your account password"
      />

      <form onSubmit={handleSubmit(submitForm)} className="mt-4">
        <CustomInput
          label="Password"
          placeholder="Input your password"
          type="password"
          control={control}
          name="oldPassword"
          rules={{
            required: "Old Password is required",
          }}
        />
        <CustomInput
          label="Confirm Password"
          placeholder="re type new password"
          type="password"
          className="mt-6"
          control={control}
          name="password"
          rules={{
            required: "New Password is required",
          }}
        />

        <Flex className="mt-10" align="center" justify="between">
          <UpperAndLowerText
            superText="2 Factor Authentication"
            subText="Add an extra layer of security to your account"
          />

          <Text as="label" size="2">
            <Flex gap="2">
              <Switch
                variant="soft"
                size="2"
                checked={isSwitchEnabled}
                // className={`${isSwitchEnabled ? "bg-[#5b5bd6]" : ""}`}
                onCheckedChange={handleSwitchChange}
              />{" "}
              {isSwitchEnabled ? "Enabled" : "Disabled"}
            </Flex>
          </Text>
        </Flex>

        {isSwitchEnabled && (
          <Box className="mt-6">
            <Flex
              direction="column"
              justify="center"
              align="center"
              className={`${
                userType === "patient" ? "bg-iris12" : "bg-grass12"
              } rounded-[10px] mx-auto h-[90px]`}
            >
              <Text size="2" className="text-gray4">
                2FA Key
              </Text>
              <Flex justify="center" align="center" className="mt-[6px]">
                <Text as="p" className="font-semibold text-gray2 pr-1">
                  345678987654
                </Text>
                <CopyIcon className="text-gray2 w-4 h-4" />
              </Flex>
            </Flex>

            <Box className="mt-5 p-5 border border-gray3 rounded-xl">
              <Text as="p" size="2" className="font-semibold text-gray12">
                Instructions
              </Text>
              <ul className="list-disc pl-4">
                <li>
                  <Text size="3" weight="regular" className="text-gray11">
                    Copy your 2FA key and paste it into your 2FA app.
                  </Text>
                </li>
                <li>
                  <Text size="3" weight="regular" className="text-gray11">
                    Enter the generated code from your 2FA app in the field
                    below.
                  </Text>
                </li>
              </ul>
            </Box>

            <CustomInput
              label="Input Code"
              placeholder="code"
              type="text"
              className="mt-5"
              control={control}
              name="firstname"
            />

            <Button className="mt-10 bg-grass9 w-full font-medium">
              Set 2FA
            </Button>
          </Box>
        )}

        <Button
          size="3"
          className=" bg-grass_9 font-medium text-base cursor-pointer w-full mt-4"
          loading={changePasswordMutation.isPending}
          disabled={changePasswordMutation.isPending}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default AccountSecurity;
