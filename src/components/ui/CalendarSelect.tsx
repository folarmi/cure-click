import { TrashIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Select, Text } from "@radix-ui/themes";

const CalendarSelect = () => {
  return (
    <Flex align="center" justify="between" className="my-4">
      <Flex align="center">
        <Select.Root size="1">
          <Select.Trigger placeholder="9:00am" className="w-[112px]" />
          <Select.Content variant="soft">
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="grape" disabled>
                Grape
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Text as="p" size="1" weight="regular" className="px-6">
          To
        </Text>
        <Select.Root size="1">
          <Select.Trigger className="w-[112px]" placeholder="9:00am" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Item value="apple">Apple</Select.Item>
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
  );
};

export { CalendarSelect };
