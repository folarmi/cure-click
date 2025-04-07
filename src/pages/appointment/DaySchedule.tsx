/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, IconButton, Switch, Text } from "@radix-ui/themes";
import { useFieldArray } from "react-hook-form";
import { TimePeriod } from "../../utils/types";
import { capitalize, getEndTimeOptions, timeSlots } from "../../utils/util";
import CustomSelect from "../../components/ui/CustomSelect";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

// DayScheduleItem.tsx
const DayScheduleItem = ({
  dayOfTheWeek,
  publicId,
  defaultPeriods,
  control,
  watch,
  isExpanded,
  onToggle,
}: {
  dayOfTheWeek: string;
  publicId: string;
  defaultPeriods: TimePeriod[];
  isExpanded: boolean;
  control: any;
  watch: any;
  onToggle: (id: string) => void;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `schedule.${publicId}.periods`,
  });

  useEffect(() => {
    if (fields.length === 0 && defaultPeriods.length > 0) {
      defaultPeriods.forEach((period) => {
        append(period);
      });
    }
  }, [defaultPeriods, append, fields.length]);

  console.log(timeSlots);

  return (
    <Box className="cursor-pointer" onClick={() => onToggle(publicId)}>
      <Flex
        align="center"
        justify="between"
        className="py-3 border-b border-gray3 px-4"
      >
        <Text as="p" weight="medium" size="2">
          {capitalize(dayOfTheWeek)}
        </Text>
        <Text as="p" weight="regular" size="2" className="text-left">
          {`${fields.length} availability periods`}
        </Text>
        <Switch variant="soft" size="2" />
      </Flex>

      {isExpanded && (
        <div className="px-4">
          {fields.map((item, index) => {
            const startTime = watch(
              `schedule.${publicId}.periods.${index}.startTime`
            );
            const endTimeOptions = getEndTimeOptions(index, startTime);

            return (
              <Flex
                key={item.id}
                align="center"
                justify="between"
                className="my-4"
              >
                <Flex align="center" className="w-full">
                  <div className="w-1/3">
                    <CustomSelect
                      options={timeSlots}
                      placeholder="9:00am"
                      ifGrayBg={false}
                      name={`schedule.${publicId}.periods.${index}.startTime`}
                      control={control}
                    />
                  </div>
                  <Text as="p" size="1" weight="regular" className="px-6">
                    To
                  </Text>
                  <div className="w-1/3">
                    <CustomSelect
                      options={endTimeOptions}
                      placeholder={endTimeOptions[0]?.label || "10:00 AM"}
                      name={`schedule.${publicId}.periods.${index}.endTime`}
                      control={control}
                    />
                  </div>
                </Flex>
                <IconButton
                  style={{ border: "1px solid var(--border-gray)" }}
                  className="bg-transparent text-neutral_11 cursor-pointer"
                  size="1"
                  onClick={() => remove(index)}
                >
                  <TrashIcon />
                </IconButton>
              </Flex>
            );
          })}
          <Button
            style={{ border: "1px solid var(--border-gray)" }}
            onClick={() => append({ startTime: "", endTime: "" })}
            size="1"
            className="text-sm font-medium bg-transparent text-neutral_11 my-2 mx-4 cursor-pointer"
          >
            <PlusIcon /> Add Period
          </Button>
        </div>
      )}
    </Box>
  );
};

export { DayScheduleItem };
