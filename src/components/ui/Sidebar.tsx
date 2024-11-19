import logo from "../../assets/icons/logo.svg";
import avatar from "../../assets/avatar.svg";
import { navBarItems, sampleNotifications } from "../../utils/data";
import { BellIcon } from "@radix-ui/react-icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  ChevronDownIcon,
  DropdownMenu,
  Flex,
  SegmentedControl,
  Text,
} from "@radix-ui/themes";
import { BiX } from "react-icons/bi";

import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState("unread");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const pathName = location.pathname;
  return (
    <nav className="flex items-center justify-between py-5 px-16 bg-white border border-gray3">
      <img
        src={logo}
        className="cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />

      <div className="flex items-center space-x-4">
        {navBarItems.map(({ icon: Icon, id, name, path }) => {
          return (
            <NavLink end to={path} className={`flex items-center`} key={id}>
              <Icon
                className={`${
                  pathName.startsWith(path)
                    ? "text-[var(--color-primary)] fill-current"
                    : "text-neutral_11"
                }`}
              />

              <Text
                size="3"
                className={`pl-2 ${
                  pathName.startsWith(path)
                    ? "text-[var(--color-primary)] font-medium"
                    : "text-neutral_11 font-normal"
                }`}
              >
                {name}
              </Text>
            </NavLink>
          );
        })}
      </div>

      <div className="flex items-center">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <BellIcon className="w-6 h-6 cursor-pointer" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="mt-4 w-[432px]">
            <Flex justify="between" align="center">
              <Text as="p" className="font-semibold text-gray12" size="4">
                Notifications
              </Text>
              <BiX className="cursor-pointer" />
            </Flex>

            <SegmentedControl.Root
              className="mt-4"
              defaultValue="unread"
              size="1"
              onValueChange={handleValueChange}
            >
              <SegmentedControl.Item value="unread">
                Unread
              </SegmentedControl.Item>
              <SegmentedControl.Item value="read">Read</SegmentedControl.Item>
            </SegmentedControl.Root>

            {selectedValue === "unread" && (
              <>
                <div className="mt-4">
                  <Text size="2" weight="regular" className="text-gray11 mb-4">
                    Today
                  </Text>

                  <Box className="border border-gray3 p-4 rounded-lg mt-4">
                    {sampleNotifications?.map(({ id, img, text, time }) => {
                      return (
                        <Flex
                          key={id}
                          align="center"
                          justify="between"
                          className="mt-2"
                        >
                          <img src={img} />
                          <Text
                            size="2"
                            weight="regular"
                            className="text-gray11 w-[272px]"
                          >
                            {text}
                          </Text>
                          <Text
                            size="1"
                            weight="regular"
                            className="text-gray11"
                          >
                            {time}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Box>
                </div>

                <div className="mt-4">
                  <Text size="2" weight="regular" className="text-gray11 mb-4">
                    Yesterday
                  </Text>

                  <Box className="border border-gray3 p-4 rounded-lg mt-4">
                    {sampleNotifications?.map(({ id, img, text, time }) => {
                      return (
                        <Flex
                          key={id}
                          align="center"
                          justify="between"
                          className="mt-2"
                        >
                          <img src={img} />
                          <Text
                            size="2"
                            weight="regular"
                            className="text-gray11 w-[272px]"
                          >
                            {text}
                          </Text>
                          <Text
                            size="1"
                            weight="regular"
                            className="text-gray11"
                          >
                            {time}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Box>
                </div>
              </>
            )}

            {selectedValue === "read" && (
              <div className="mt-4">
                <p>This is the content for Read messages.</p>
                {/* Render Read Content Here */}
              </div>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <img src={avatar} alt="avatar" className="w-10 h-10 ml-6" />
        <Text size="2" className="text-gray12 px-2" weight="medium">
          Emmanuel Ekpenyong
        </Text>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <ChevronDownIcon className="cursor-pointer" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="mt-4">
            {" "}
            <DropdownMenu.Item>
              <Link to="/dashboard/account-settings">Account Settings</Link>{" "}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Text size="2" className="text-error_alpha_9">
                Logout
              </Text>
            </DropdownMenu.Item>{" "}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
};

export default Sidebar;
