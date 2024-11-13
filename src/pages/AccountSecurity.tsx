import { Box, Button, Flex, Switch, Text } from "@radix-ui/themes";
import { CustomInput } from "../components/ui/CustomInput";
import { useState } from "react";
import { CopyIcon } from "@radix-ui/react-icons";
import UpperAndLowerText from "../components/atoms/UpperAndLowerText";

const AccountSecurity = () => {
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const handleSwitchChange = () => {
    setIsSwitchEnabled((prevState) => !prevState);
  };
  return (
    <Box className="p-6 max-w-[660px] mx-auto border border-gray3 rounded-lg">
      <UpperAndLowerText
        superText="Change password"
        subText="Update your account password"
      />

      <form action="" className="mt-4">
        <CustomInput
          label="Password"
          placeholder="Input your password"
          type="password"
        />
        <CustomInput
          label="Confirm Password"
          placeholder="re type new password"
          type="password"
          className="mt-6"
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
              className="bg-iris12 rounded-[10px] mx-auto h-[90px]"
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
            />

            <Button className="mt-10 bg-grass9 w-full font-medium">
              Set 2FA
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default AccountSecurity;
