import {
  Box,
  Button,
  Flex,
  IconButton,
  Select,
  Switch,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { availableTimes } from "../../utils/data";

const Calendar = () => {
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [selectedID, setSelectedID] = useState(1);
  const [selectedBlockOutDates, setSelectedBlockOutDates] = useState();

  const handleSwitchChange = (id: number) => {
    setIsSwitchEnabled((prevState) => !prevState);
    setSelectedID(id);
  };

  const selectData = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    label: `Select ${index + 1}`,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  }));

  return (
    <Flex className="mt-10">
      <Box>
        <Text as="p" size="4" className="text-gray12 font-semibold">
          Availability Hours
        </Text>
        <Text
          as="p"
          size="3"
          className="text-gray11 font-medium pt-1 w-[316px]"
        >
          Setup your Schedule to assist patients know when to book sessions
        </Text>

        <Box className="mt-4 border border-gray3  w-[564px]">
          <div className="px-4 py">
            {availableTimes?.map(({ day, id, status }) => {
              return (
                <Box>
                  <Flex
                    key={id}
                    align="center"
                    justify="between"
                    className="py-3 border-b border-gray3"
                  >
                    <Text as="p" weight="medium" size="2">
                      {day}
                    </Text>
                    <Text
                      as="p"
                      weight="regular"
                      size="2"
                      className="text-left"
                    >
                      {status}
                    </Text>
                    <Switch
                      variant="soft"
                      size="2"
                      checked={isSwitchEnabled && selectedID === id}
                      onCheckedChange={() => handleSwitchChange(id)}
                    />
                  </Flex>

                  {isSwitchEnabled && selectedID === id && (
                    <>
                      <div className="">
                        {selectData.map(({ id }) => (
                          <Flex
                            align="center"
                            justify="between"
                            className="my-4"
                          >
                            <Flex key={id} align="center">
                              <Select.Root size="1">
                                <Select.Trigger
                                  placeholder="9:00am"
                                  className="w-[112px]"
                                />
                                <Select.Content variant="soft">
                                  <Select.Group>
                                    <Select.Label>Fruits</Select.Label>
                                    <Select.Item value="orange">
                                      Orange
                                    </Select.Item>
                                    <Select.Item value="apple">
                                      Apple
                                    </Select.Item>
                                    <Select.Item value="grape" disabled>
                                      Grape
                                    </Select.Item>
                                  </Select.Group>
                                </Select.Content>
                              </Select.Root>
                              <Text
                                as="p"
                                size="1"
                                weight="regular"
                                className="px-6"
                              >
                                To
                              </Text>
                              <Select.Root size="1">
                                <Select.Trigger
                                  className="w-[112px]"
                                  placeholder="9:00am"
                                />
                                <Select.Content>
                                  <Select.Group>
                                    <Select.Label>Fruits</Select.Label>
                                    <Select.Item value="orange">
                                      Orange
                                    </Select.Item>
                                    <Select.Item value="apple">
                                      Apple
                                    </Select.Item>
                                    <Select.Item value="grape" disabled>
                                      Grape
                                    </Select.Item>
                                  </Select.Group>
                                </Select.Content>
                              </Select.Root>
                            </Flex>

                            <IconButton
                              style={{
                                border: "1px solid var(--border-gray)",
                              }}
                              className="bg-transparent text-neutral_11"
                              size="1"
                            >
                              <TrashIcon />
                            </IconButton>
                          </Flex>
                        ))}
                      </div>

                      <Button
                        style={{
                          border: "1px solid var(--border-gray)",
                        }}
                        size="1"
                        className="text-sm font-medium bg-transparent text-neutral_11 mb-4"
                      >
                        <PlusIcon /> Add Period
                      </Button>
                    </>
                  )}
                </Box>
              );
            })}
          </div>
        </Box>

        <Button className="bg-grass9 text-base font-medium my-4">
          Save Schedule{" "}
        </Button>
      </Box>

      <Flex direction="column" align="center" className=" w-full mx-auto">
        <Text as="p" size="4" className="text-gray12 font-semibold">
          Blockout Dates
        </Text>

        <Text
          as="p"
          size="3"
          className="text-gray11 font-medium pt-1 w-[546px]"
        >
          Add days you do not want to get bookings. This will be applied to all
          sessions immediately.
        </Text>

        <Box className="mt-4 border border-gray3  w-[564px]">
          <div className="px-4 py">
            {availableTimes?.slice(0, 1).map(({ day, id, status }) => {
              return (
                <Box>
                  <Flex
                    key={id}
                    align="center"
                    justify="between"
                    className="py-3 border-b border-gray3"
                  >
                    <Text as="p" weight="medium" size="2">
                      {day}
                    </Text>
                    <Text
                      as="p"
                      weight="regular"
                      size="2"
                      className="text-left"
                    >
                      {status}
                    </Text>
                    <Switch
                      variant="soft"
                      size="2"
                      checked={isSwitchEnabled && selectedID === id}
                      onCheckedChange={() => handleSwitchChange(id)}
                    />
                  </Flex>
                </Box>
              );
            })}
          </div>
        </Box>
      </Flex>
    </Flex>
  );
};

export { Calendar };
