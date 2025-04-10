/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, IconButton, Switch, Text } from "@radix-ui/themes";
import { useFieldArray } from "react-hook-form";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import CustomSelect from "../../components/ui/CustomSelect";
import {
  timeSlots,
  getEndTimeOptions,
  // calculateEndTime,
} from "../../utils/util";
import { DaySchedule } from "../../utils/types";
import { useEffect } from "react";
import { showErrorToast } from "../../utils/toastUtils";

interface DayScheduleItemProps {
  day: DaySchedule;
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
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

  const currentLocalTimes = watch(`schedule.${day.publicId}.localTimes`);
  const currentAvailability = watch(`schedule.${day.publicId}.available`);

  const handleAddPeriod = () => {
    // append({ startTime: "09:00:00", endTime: "10:00:00" }); // Default time period
    append({ startTime: "", endTime: "" }); // Default time period
  };

  const handleAvailabilityChange = (checked: boolean) => {
    if (checked && fields.length === 0) {
      showErrorToast(
        "Please add at least one time period before making this day available"
      );
      return;
    }
    setValue(`schedule.${day.publicId}.available`, checked);
  };

  // Disable switch when no periods exist
  const isSwitchDisabled = fields.length === 0;

  useEffect(() => {
    if (!currentLocalTimes) return;

    const subscription = watch((value: any, { name }: { name: string }) => {
      if (name && name.includes("startTime")) {
        const index = Number(name.split(".")[3]);
        const startTime =
          value.schedule[day.publicId].localTimes[index]?.startTime;

        if (startTime) {
          const [startHour, startMinute] = startTime.split(":").map(Number);
          const endTime = `${(startHour + 1)
            .toString()
            .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}:00`;

          setValue(
            `schedule.${day.publicId}.localTimes.${index}.endTime`,
            endTime
          );
        }

        // if (startTime) {
        //   const endTime = calculateEndTime(startTime);
        //   setValue(
        //     `schedule.${day.publicId}.localTimes.${index}.endTime`,
        //     endTime
        //   );
        // }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, day.publicId, currentLocalTimes]);

  const formattedDayName =
    day.dayOfTheWeek.charAt(0) + day.dayOfTheWeek.slice(1).toLowerCase();

  return (
    <Box className="border-b border-gray-200">
      <Flex
        align="center"
        justify="between"
        className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
        onClick={() => onToggle(day.publicId)}
      >
        <Text as="p" weight="medium" size="2">
          {formattedDayName} {/* Display as "Monday" instead of "MONDAY" */}
        </Text>
        <Text as="p" weight="regular" size="2" color="gray">
          {fields.length > 0 ? `${fields.length} period(s)` : "Not available"}
        </Text>
        <Switch
          checked={currentAvailability}
          onCheckedChange={handleAvailabilityChange}
          onClick={(e) => e.stopPropagation()}
          disabled={isSwitchDisabled && !fields.length}
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
                    variant="ghost"
                    color="gray"
                    size="1"
                    onClick={() => remove(index)}
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

          <Button
            variant="soft"
            size="1"
            className="mt-2 w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleAddPeriod();
            }}
          >
            <PlusIcon /> Add Period
          </Button>
        </Box>
      )}
    </Box>
  );
};

export { DayScheduleItem };

// Auto-update end time when start time changes
// useEffect(() => {
//   if (!currentLocalTimes) return;

//   const subscription = watch((value: any, { name }: { name: string }) => {
//     if (name && name.includes("startTime")) {
//       const index = Number(name.split(".")[3]);
//       const startTime =
//         value.schedule[day.publicId].timeSlots[index]?.startTime;

// if (startTime) {
//   const endTime = calculateEndTime(startTime);
//   setValue(
//     `schedule.${day.publicId}.timeSlots.${index}.endTime`,
//     endTime
//   );
// }
//     }
//   });

//   return () => subscription.unsubscribe();
// }, [watch, setValue, day.publicId, currentLocalTimes]);

// <Box className="border-b border-gray-200">
//   <Flex
//     align="center"
//     justify="between"
//     className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
//     onClick={() => onToggle(day.publicId)}
//   >
//     <Text as="p" weight="medium" size="2">
//       {day.dayOfTheWeek}
//     </Text>
//     <Text as="p" weight="regular" size="2" color="gray">
//       {fields.length > 0 ? `${fields.length} period(s)` : "Not available"}
//     </Text>
//     <Switch
//       checked={watch(`schedule.${day.publicId}.isAvailable`)}
//       onCheckedChange={handleAvailabilityChange}
//       onClick={(e) => e.stopPropagation()}
//       disabled={isSwitchDisabled && !fields.length}
//     />
//   </Flex>

//   {isExpanded && (
//     <Box className="px-4 pb-3 bg-gray-50">
//       {fields.length > 0 ? (
//         fields.map((field, index) => {
//           const startTime = watch(
//             `schedule.${day.publicId}.timeSlots.${index}.startTime`
//           );
//           const endTimeOptions = getEndTimeOptions(startTime);

//           return (
//             <Flex key={field.id} align="center" gap="3" className="my-2">
//               <CustomSelect
//                 options={timeSlots}
//                 placeholder="Start time"
//                 name={`schedule.${day.publicId}.timeSlots.${index}.startTime`}
//                 control={control}
//               />
//               <Text as="span" size="2">
//                 to
//               </Text>
//               <CustomSelect
//                 options={endTimeOptions}
//                 placeholder="End time"
//                 name={`schedule.${day.publicId}.timeSlots.${index}.endTime`}
//                 control={control}
//               />
//               <IconButton
//                 variant="ghost"
//                 color="gray"
//                 size="1"
//                 onClick={() => remove(index)}
//               >
//                 <TrashIcon />
//               </IconButton>
//             </Flex>
//           );
//         })
//       ) : (
//         <Text as="p" size="2" color="gray" className="py-2">
//           No time periods added
//         </Text>
//       )}

//       <Button
//         variant="soft"
//         size="1"
//         className="mt-2 w-full"
//         onClick={(e) => {
//           e.stopPropagation();
//           handleAddPeriod();
//         }}
//       >
//         <PlusIcon /> Add Period
//       </Button>
//     </Box>
//   )}
// </Box>
