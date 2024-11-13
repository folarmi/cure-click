import DashboardLayout from "../components/layouts/DashboardLayout";
import headerBg from "../assets/headerBg.svg";
import { Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
import AccountProfile from "./AccountProfile";
import AccountSecurity from "./AccountSecurity";
import { Preferences } from "./Preferences";

// type Prop = {
//   sectionHeader: string;
//   subHeader: string;
// };

const AccountSettings = () => {
  return (
    <DashboardLayout ifHeader={false}>
      <Tabs.Root defaultValue="preferences">
        {/* Background Section for Tabs List */}
        <div
          className="bg-cover bg-center px-12 py-8"
          style={{ backgroundImage: `url(${headerBg})` }}
        >
          <Tabs.List>
            <Tabs.Trigger value="accountProfile">Account Profile</Tabs.Trigger>
            <Tabs.Trigger value="security">Security</Tabs.Trigger>
            <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
            <Tabs.Trigger value="emr">Electronic Medical Records</Tabs.Trigger>
          </Tabs.List>
        </div>

        <Flex
          justify="between"
          align="center"
          className="mt-10 px-12 border-b border-gray3 pb-4"
        >
          <Box>
            <Text as="p" size="4" className="font-semibold text-gray12">
              Account Profile Settings
            </Text>
            <Text as="p" size="3" weight="regular" className="text-gray11 pt-1">
              Update your account profile settings
            </Text>
          </Box>

          <Button
            size="3"
            className="bg-grass_9 font-medium text-base cursor-pointer"
          >
            Save
          </Button>
        </Flex>

        {/* Tabs Content Section */}
        <Tabs.Content className="w-full mt-10" value="accountProfile">
          <AccountProfile />
        </Tabs.Content>
        <Tabs.Content className="w-full mt-10" value="security">
          <AccountSecurity />
        </Tabs.Content>
        <Tabs.Content className="w-full mt-10" value="preferences">
          <Preferences />
        </Tabs.Content>
        <Tabs.Content className="w-full" value="emr">
          <p>Content for Electronic Medical Records</p>
        </Tabs.Content>
      </Tabs.Root>

      {/* <p>AccountSettings</p> */}
    </DashboardLayout>
  );
};

export { AccountSettings };
