import DashboardLayout from "../components/layouts/DashboardLayout";
import { Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
import AccountProfile from "./AccountProfile";
import AccountSecurity from "./AccountSecurity";
import { Preferences } from "./Preferences";
import Breadcrumb from "../components/ui/BreadCrumb";
import { CalendarIcon, DashboardIcon } from "@radix-ui/react-icons";
import { BackgroundHeader } from "../components/ui/BackgroundHeader";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { DoctorDashboardHeader } from "../components/ui/DoctorDashboardHeader";
import { useState } from "react";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("Account Settings");
  const userType = useSelector((state: RootState) => state.auth.userType);
  const tabs = {
    accountProfile: "Account Profile",
    security: "Security",
    preferences: "Preferences",
    emr: "Payments",
  };

  return (
    <DashboardLayout ifHeader={false}>
      <Tabs.Root defaultValue="accountProfile" className="">
        {userType === "patient" ? (
          <BackgroundHeader>
            <Breadcrumb Icon={DashboardIcon} route="Account Settings" />

            <Tabs.List className="w-full md:w-1/2">
              <Tabs.Trigger value="accountProfile">
                Account Profile
              </Tabs.Trigger>
              <Tabs.Trigger value="security">Security</Tabs.Trigger>
              <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
              <Tabs.Trigger value="emr">
                Electronic Medical Records
              </Tabs.Trigger>
            </Tabs.List>
          </BackgroundHeader>
        ) : (
          <>
            <DoctorDashboardHeader
              name="Account Settings"
              Icon={CalendarIcon}
              ifBreadCrumb
              routeName="Account Settings"
              ifString={true}
              subText="Manage your account settings from here"
            >
              <Tabs.List className="md:w-1/2 flex space-x-4">
                {Object.entries(tabs).map(([value, label]) => (
                  <Tabs.Trigger
                    key={value}
                    value={value}
                    className={`py-2 px-4 rounded-lg data-[state=active]:text-grass1 ${
                      value === activeTab ? " text-white" : "text-grass7"
                    }`}
                    onClick={() => setActiveTab(value)}
                  >
                    {label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </DoctorDashboardHeader>
          </>
        )}

        {userType === "patient" && (
          <Flex
            justify="between"
            align="center"
            className="mt-10 px-12 border-b border-gray3 pb-4 hidden md:flex"
          >
            <Box>
              <Text
                as="p"
                size="4"
                className="font-semibold text-gray12 cursor-pointer"
              >
                Account Profile Settings
              </Text>
              <Text
                as="p"
                size="3"
                weight="regular"
                className="text-gray11 pt-1"
              >
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
        )}

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
    </DashboardLayout>
  );
};

export { AccountSettings };
