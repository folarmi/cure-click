/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Box, Button, Flex, IconButton, Switch, Text } from "@radix-ui/themes";
// import { useFieldArray } from "react-hook-form";
// import { TimePeriod } from "../../utils/types";
// import { capitalize, getEndTimeOptions, timeSlots } from "../../utils/util";
// import CustomSelect from "../../components/ui/CustomSelect";
// import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
// import { useEffect } from "react";

// // DayScheduleItem.tsx
// const DayScheduleItem = ({
//   dayOfTheWeek,
//   publicId,
//   defaultPeriods,
//   control,
//   watch,
//   isExpanded,
//   onToggle,
// }: {
//   dayOfTheWeek: string;
//   publicId: string;
//   defaultPeriods: TimePeriod[];
//   isExpanded: boolean;
//   control: any;
//   watch: any;
//   onToggle: (id: string) => void;
// }) => {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `schedule.${publicId}.periods`,
//   });

//   useEffect(() => {
//     if (fields.length === 0 && defaultPeriods.length > 0) {
//       defaultPeriods.forEach((period) => {
//         append(period);
//       });
//     }
//   }, [defaultPeriods, append, fields.length]);

//   return (
//     <Box className="cursor-pointer" onClick={() => onToggle(publicId)}>
//       <Flex
//         align="center"
//         justify="between"
//         className="py-3 border-b border-gray3 px-4"
//       >
//         <Text as="p" weight="medium" size="2">
//           {capitalize(dayOfTheWeek)}
//         </Text>
//         <Text as="p" weight="regular" size="2" className="text-left">
//           {`${fields.length} availability periods`}
//         </Text>
//         <Switch variant="soft" size="2" />
//       </Flex>

//       {isExpanded && (
//         <div className="px-4">
//           {fields.map((item, index) => {
//             const startTime = watch(
//               `schedule.${publicId}.periods.${index}.startTime`
//             );
//             const endTimeOptions = getEndTimeOptions(index, startTime);

//             return (
//               <Flex
//                 key={item.id}
//                 align="center"
//                 justify="between"
//                 className="my-4"
//               >
//                 <Flex align="center" className="w-full">
//                   <div className="w-1/3">
//                     <CustomSelect
//                       options={timeSlots}
//                       placeholder="9:00am"
//                       ifGrayBg={false}
//                       name={`schedule.${publicId}.periods.${index}.startTime`}
//                       control={control}
//                     />
//                   </div>
//                   <Text as="p" size="1" weight="regular" className="px-6">
//                     To
//                   </Text>
//                   <div className="w-1/3">
//                     <CustomSelect
//                       options={endTimeOptions}
//                       placeholder={endTimeOptions[0]?.label || "10:00 AM"}
//                       name={`schedule.${publicId}.periods.${index}.endTime`}
//                       control={control}
//                     />
//                   </div>
//                 </Flex>
//                 <IconButton
//                   style={{ border: "1px solid var(--border-gray)" }}
//                   className="bg-transparent text-neutral_11 cursor-pointer"
//                   size="1"
//                   onClick={() => remove(index)}
//                 >
//                   <TrashIcon />
//                 </IconButton>
//               </Flex>
//             );
//           })}
//           <Button
//             style={{ border: "1px solid var(--border-gray)" }}
//             onClick={() => append({ startTime: "", endTime: "" })}
//             size="1"
//             className="text-sm font-medium bg-transparent text-neutral_11 my-2 mx-4 cursor-pointer"
//           >
//             <PlusIcon /> Add Period
//           </Button>
//         </div>
//       )}
//     </Box>
//   );
// };

// export { DayScheduleItem };
import { Box, Button, Flex, IconButton, Switch, Text } from "@radix-ui/themes";
import { useFieldArray } from "react-hook-form";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import CustomSelect from "../../components/ui/CustomSelect";
import { timeSlots, getEndTimeOptions } from "../../utils/util";
import { DaySchedule } from "../../utils/types";
import { useEffect } from "react";

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
    name: `schedule.${day.publicId}.timeSlots`,
  });

  const startTimes = watch(`schedule.${day.publicId}.timeSlots`);

  const handleAddPeriod = () => {
    append({ startTime: "", endTime: "" });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    if (checked && fields.length === 0) {
      handleAddPeriod();
    } else if (!checked) {
      remove(); // Remove all periods when switched off
    }
  };

  // Auto-update end time when start time changes

  // useEffect(() => {
  //   if (!startTimes) return;

  //   startTimes.forEach((slot: any, index: number) => {
  //     if (slot.startTime && !slot.endTime) {
  //       const [startHour] = slot.startTime.split(":").map(Number);
  //       const endHour = startHour + 1;
  //       const endTime = `${endHour}:00`;
  //       setValue(
  //         `schedule.${day.publicId}.timeSlots.${index}.endTime`,
  //         endTime
  //       );
  //     }
  //   });
  // }, [startTimes, setValue, day.publicId]);

  useEffect(() => {
    if (!startTimes) return;

    startTimes.forEach((slot: any, index: number) => {
      if (slot.startTime) {
        const [startHour] = slot.startTime.split(":").map(Number);
        const endHour = startHour + 1;
        const endTime = `${endHour}:00`;

        // Only update if different from current value
        if (slot.endTime !== endTime) {
          setValue(
            `schedule.${day.publicId}.timeSlots.${index}.endTime`,
            endTime
          );
        }
      }
    });
  }, [startTimes, setValue, day.publicId]);

  return (
    <Box className="border-b border-gray-200">
      <Flex
        align="center"
        justify="between"
        className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
        onClick={() => onToggle(day.publicId)}
      >
        <Text as="p" weight="medium" size="2">
          {day.dayOfTheWeek}
        </Text>
        <Text as="p" weight="regular" size="2" color="gray">
          {fields.length > 0 ? `${fields.length} period(s)` : "Not available"}
        </Text>
        <Switch
          checked={fields.length > 0}
          onCheckedChange={handleAvailabilityChange}
          onClick={(e) => e.stopPropagation()}
        />
      </Flex>

      {isExpanded && (
        <Box className="px-4 pb-3 bg-gray-50">
          {fields.length > 0 ? (
            fields.map((field, index) => {
              const startTime = watch(
                `schedule.${day.publicId}.timeSlots.${index}.startTime`
              );
              const endTimeOptions = getEndTimeOptions(startTime);

              return (
                <Flex key={field.id} align="center" gap="3" className="my-2">
                  <CustomSelect
                    options={timeSlots}
                    placeholder="Start time"
                    name={`schedule.${day.publicId}.timeSlots.${index}.startTime`}
                    control={control}
                  />
                  <Text as="span" size="2">
                    to
                  </Text>
                  <CustomSelect
                    options={endTimeOptions}
                    placeholder="End time"
                    name={`schedule.${day.publicId}.timeSlots.${index}.endTime`}
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

              // return (
              //   <Flex key={field.id} align="center" gap="3" className="my-2">
              //     <CustomSelect
              //       options={timeSlots}
              //       placeholder="Start time"
              //       name={`schedule.${day.publicId}.timeSlots.${index}.startTime`}
              //       control={control}
              //     />
              //     <Text as="span" size="2">
              //       to
              //     </Text>
              //     <CustomSelect
              //       options={endTimeOptions}
              //       placeholder="End time"
              //       name={`schedule.${day.publicId}.timeSlots.${index}.endTime`}
              //       control={control}
              //       disabled={!startTime}
              //     />
              // <IconButton
              //   variant="ghost"
              //   color="gray"
              //   size="1"
              //   onClick={() => remove(index)}
              // >
              //   <TrashIcon />
              // </IconButton>
              //   </Flex>
              // );
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
