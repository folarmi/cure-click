/* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, DateHeaderProps } from "react-big-calendar";
import { format, isSameDay } from "date-fns";
import {
  getTotalAvailableTimes,
  localizer,
  transformToCalendarEvents,
} from "../../utils/calendarutil";
import "../../css/calendar-styles.css";
import { useState } from "react";
import { Box, Button, Text } from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../lib/hook";
import {
  updateDate,
  updateDoctorId,
  updateTimeSlot,
} from "../../lib/features/scheduleSlice";
import CustomSelect from "./CustomSelect";
import { monthsOfTheYear } from "../../utils/data";
import { getCurrencySymbol } from "../../utils/util";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface DoctorCalendarProps {
  singleDoctorData: any;
  ifPrice?: boolean;
  customSubmit?: boolean;
  submitFunction?: (payload: any) => void;
  scheduleData: {
    sessions: Array<{
      publicId: string;
      doctorPublicId: string;
      dayOfTheWeek: string;
      availableTimes: number;
      localTimes: string[];
      available: boolean;
      timezone: string | null;
    }>;
    recurring: boolean;
    date: string;
  };
}

const DoctorCalendar = ({
  scheduleData,
  singleDoctorData,
  ifPrice = false,
  submitFunction,
  customSubmit,
}: DoctorCalendarProps) => {
  const currentMonthIndex = new Date().getMonth();
  const { id } = useParams();
  const { control } = useForm({
    defaultValues: {
      monthOfTheYear: (currentMonthIndex + 1).toString(),
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<any>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = transformToCalendarEvents(scheduleData);

  const handleMonthChange = (item: string) => {
    const selectedMonth = parseInt(item); // Get selected month
    const newDate = new Date(currentDate);
    newDate.setMonth(selectedMonth - 1); // Set the selected month (subtract 1 since months are 0-indexed)
    setCurrentDate(newDate); // Update the state with the new date
  };

  // Check if a day has any events
  const hasEventsOnDate = (date: Date) => {
    return events.some((event) => {
      if (event.resource.recurring) {
        // For recurring events, check if the day of week matches
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return dayNames[date.getDay()] === event.resource.dayOfTheWeek;
      } else {
        // For non-recurring events, do exact date match
        const eventDate = new Date(event.start);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      }
    });
  };

  const CustomDateHeader = ({ date }: DateHeaderProps) => {
    const hasEvents = hasEventsOnDate(date);
    // const isCurrentMonth =
    //   date.getMonth() === new Date(scheduleData?.date).getMonth();
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedDate(date);
      handleSelectedDay(date);
    };

    return (
      <div className="rbc-date-cell" onClick={handleClick}>
        <button
          type="button"
          className={`rbc-button-link 
            ${hasEvents ? "date-has-events" : "date-no-events"} 
            ${isToday ? "date-today" : ""}
            ${isSelected ? "date-selected" : ""}`}
        >
          {/* {label} */}
          {format(date, "d")}
        </button>
      </div>
    );
  };

  const formats = {
    weekdayFormat: (date: Date) => format(date, "EEEEE"), // Single letter day names
  };

  const eventStyleGetter = () => {
    return {
      style: {
        borderRadius: "4px",
        padding: "4px 8px",
        fontSize: "12px",
        fontWeight: "500",
        color: "rgba(0, 101, 20, 0.84)",
        backgroundColor: "rgba(0, 151, 0, 0.09)",
        marginTop: "10px",
      },
    };
  };

  const handleSelectedTimeSlot = () => {
    if (!selectedTimeSlot || !selectedDate) {
      toast.error("Missing required data: Time slot or date not selected");
      return;
    }

    const payload = {
      timeSlot: selectedTimeSlot,
      date: selectedDate?.toISOString(),
    };

    try {
      dispatch(updateDoctorId(id || ""));
      dispatch(updateTimeSlot(selectedTimeSlot || ""));
      dispatch(updateDate(selectedDate.toISOString()));

      if (customSubmit && submitFunction) {
        submitFunction?.(payload);
      } else {
        navigate("/dashboard/schedule");
      }
    } catch (error: any) {
      toast.error("Failed to handle time slot selection:", error);
    }
  };

  const dayMap: Record<string, string> = {
    Sunday: "SUNDAY",
    Monday: "MONDAY",
    Tuesday: "TUESDAY",
    Wednesday: "WEDNESDAY",
    Thursday: "THURSDAY",
    Friday: "FRIDAY",
    Saturday: "SATURDAY",
  };

  const handleSelectedDay = (day: Date) => {
    // 🧭 Get the schedule's base date (start of the week)
    const baseDate = new Date(scheduleData.date);
    const baseWeekStart = new Date(baseDate);
    baseWeekStart.setDate(baseDate.getDate() - baseDate.getDay()); // Sunday of that week

    const baseWeekEnd = new Date(baseWeekStart);
    baseWeekEnd.setDate(baseWeekStart.getDate() + 6); // Saturday of that week

    const today = new Date();
    today.setHours(0, 0, 0, 0); // strip time to compare only dates

    // Disallow booking in the past regardless of recurrence
    if (day < today) {
      toast.warn("Selected date is in the past.");
      setAvailableTimes([]);
      return;
    }

    // For non-recurring schedules, also check the doctor's availability window
    if (!scheduleData.recurring) {
      if (day < baseWeekStart || day > baseWeekEnd) {
        toast.warn("Selected date is outside of doctor's schedule.");
        setAvailableTimes([]);
        return;
      }
    }

    const dayOfWeek = day.toLocaleDateString("en-US", { weekday: "long" });
    const backendDay = dayMap[dayOfWeek];

    const matched = scheduleData?.sessions.find(
      (item: any) => item.dayOfTheWeek === backendDay
    );

    if (!matched?.available) {
      toast.warn("Doctor isn't available");
      return;
    }

    const formattedTimes =
      matched?.localTimes.map((time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        const start = new Date();
        start.setHours(hours, minutes);

        const end = new Date(start);
        end.setHours(end.getHours() + 1); // 1-hour slot

        const startTime = start.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });

        const endTime = end.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        return { timeSlot: `${startTime} - ${endTime}` };
      }) ?? [];

    setAvailableTimes(formattedTimes);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center w-full mb-4">
        {ifPrice && (
          <>
            <Text as="p" className="font-semibold" size="6">
              {`${getCurrencySymbol(
                singleDoctorData?.data?.currency || "NAIRA"
              )} ${singleDoctorData?.data?.pricing || "0"}`}
              <Text weight="regular" size="4" className="pl-2">
                Per session
              </Text>
            </Text>

            <Text
              as="p"
              size="3"
              weight="medium"
              className="text-gray12  whitespace-nowrap pb-4"
            >
              Availability ({getTotalAvailableTimes(scheduleData?.sessions)}{" "}
              Available Sessions )
            </Text>
          </>
        )}

        <CustomSelect
          options={monthsOfTheYear}
          placeholder=""
          name="monthOfTheYear"
          control={control}
          className=" w-[160px] z-50"
          customOnChange={(item) => {
            handleMonthChange(item);
          }}
        />
      </div>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          date={currentDate}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          toolbar={false}
          views={["month"]}
          formats={formats}
          eventPropGetter={eventStyleGetter}
          components={{
            month: {
              dateHeader: CustomDateHeader,
            },
          }}
        />
      </div>

      <div className="grid grid-cols-2">
        {availableTimes?.map(({ timeSlot }: any) => {
          return (
            <Box
              className="mt-2 mr-4 border border-gray3 rounded-md hover:bg-grassA2 hover:border hover:border-grassA3 cursor-pointer"
              key={timeSlot}
              onClick={() => setSelectedTimeSlot(timeSlot)}
            >
              <Text
                as="p"
                size="3"
                weight="medium"
                align="center"
                className="text-gray11 py-2"
              >
                {timeSlot}
              </Text>
            </Box>
          );
        })}
      </div>

      <Button
        size="3"
        variant="solid"
        radius="medium"
        onClick={handleSelectedTimeSlot}
        disabled={!selectedTimeSlot}
        className="bg-grass9 w-full font-medium mt-8 text-base cursor-pointer"
      >
        {ifPrice ? "Book a Session" : "Reschedule"}
      </Button>
    </div>
  );
};

export { DoctorCalendar };
