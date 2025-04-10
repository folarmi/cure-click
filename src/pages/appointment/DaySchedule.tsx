/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, IconButton, Switch, Text } from "@radix-ui/themes";
import { useFieldArray } from "react-hook-form";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import CustomSelect from "../../components/ui/CustomSelect";
import {
  timeSlots,
  getEndTimeOptions,
  calculateEndTime,
  formatDayName,
} from "../../utils/util";
import { DaySchedule } from "../../utils/types";
import { toast } from "react-toastify";

interface DayScheduleItemProps {
  day: DaySchedule;
  control: any;
  watch: any;
  setValue: any;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

const DayScheduleItem = ({
  day,
  control,
  watch,
  isExpanded,
  onToggle,
  setValue,
}: DayScheduleItemProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `schedule.${day.publicId}.localTimes`,
  });

  const currentAvailability = watch(`schedule.${day.publicId}.available`);
  const currentLocalTimes = watch(`schedule.${day.publicId}.localTimes`);

  const handleAddPeriod = () => {
    append({
      startTime: "09:00:00",
      endTime: "10:00:00",
    });
    setValue(
      `schedule.${day.publicId}.availableTimes`,
      currentLocalTimes ? currentLocalTimes.length + 1 : 1
    );
  };

  const handleAvailabilityChange = (checked: boolean) => {
    if (checked && fields.length === 0) {
      toast.error(
        "Please add at least one time period before making this day available"
      );
      return;
    }
    setValue(`schedule.${day.publicId}.available`, checked);
  };

  const handleStartTimeChange = (value: string, index: number) => {
    setValue(`schedule.${day.publicId}.localTimes.${index}.startTime`, value);
    setValue(
      `schedule.${day.publicId}.localTimes.${index}.endTime`,
      calculateEndTime(value)
    );
  };

  return (
    <Box className="border-b border-gray-200">
      <Flex
        align="center"
        justify="between"
        className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
        onClick={() => onToggle(day.publicId)}
      >
        <Text as="p" weight="medium" size="2">
          {formatDayName(day.dayOfTheWeek)}
        </Text>
        <Text as="p" weight="regular" size="2" color="gray">
          {fields.length > 0
            ? `${fields.length} availability periods`
            : "No availability periods"}
        </Text>
        <Switch
          checked={currentAvailability}
          onCheckedChange={handleAvailabilityChange}
          onClick={(e) => e.stopPropagation()}
        />
      </Flex>

      {isExpanded && (
        <Box className="px-4 pb-3 bg-gray-50">
          {fields.length > 0 ? (
            fields.map((field, index) => {
              const startTime = watch(
                `schedule.${day.publicId}.localTimes.${index}.startTime`
              );
              const endTimeOptions = getEndTimeOptions(startTime);

              return (
                <Flex key={field.id} align="center" gap="3" className="my-2">
                  <CustomSelect
                    options={timeSlots}
                    placeholder="Start time"
                    name={`schedule.${day.publicId}.localTimes.${index}.startTime`}
                    control={control}
                    customOnChange={(value) =>
                      handleStartTimeChange(value, index)
                    }
                  />
                  <Text as="span" size="2">
                    to
                  </Text>
                  <CustomSelect
                    options={endTimeOptions}
                    placeholder="End time"
                    name={`schedule.${day.publicId}.localTimes.${index}.endTime`}
                    control={control}
                  />
                  <IconButton
                    style={{ border: "1px solid var(--border-gray)" }}
                    className="bg-transparent text-neutral_11 cursor-pointer"
                    size="1"
                    onClick={() => {
                      remove(index);
                      setValue(
                        `schedule.${day.publicId}.availableTimes`,
                        currentLocalTimes.length - 1
                      );
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Flex>
              );
            })
          ) : (
            <Text as="p" size="2" color="gray" className="py-2">
              No time periods added
            </Text>
          )}

          {/* <Button
            variant="soft"
            size="1"
            className="mt-2 w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleAddPeriod();
            }}
          >
            <PlusIcon /> Add Period
          </Button> */}

          <Button
            style={{ border: "1px solid var(--border-gray)" }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddPeriod();
            }}
            size="1"
            className="text-sm font-medium bg-transparent text-neutral_11 my-2 mx-4 cursor-pointer"
          >
            <PlusIcon /> Add Period
          </Button>
        </Box>
      )}
    </Box>
  );
};

export { DayScheduleItem };
