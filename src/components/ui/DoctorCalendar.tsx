/* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar } from "react-big-calendar";
import { format, isSameDay } from "date-fns";
import { localizer, transformToCalendarEvents } from "../../utils/calendarutil";
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

interface DoctorCalendarProps {
  currentDate?: Date;
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

const DoctorCalendar = ({ scheduleData, currentDate }: DoctorCalendarProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  const events = transformToCalendarEvents(scheduleData);
  // Check if a day has any events
  const hasEventsOnDate = (date: Date) => {
    return events.some((event) => {
      if (event.resource.recurring) {
        // For recurring events, check if the day of week matches
        return date.getDay() === event.resource.dayOfTheWeek;
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

  const CustomDateHeader = ({
    label,
    date,
  }: {
    label: string;
    date: Date;
    value: Date;
  }) => {
    const hasEvents = hasEventsOnDate(date);
    const isCurrentMonth =
      date.getMonth() === new Date(scheduleData?.date).getMonth();
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isCurrentMonth) {
        setSelectedDate(date);
        handleSelectedDay(date);
      }
    };

    return (
      <div className="rbc-date-cell" onClick={handleClick}>
        <button
          type="button"
          className={`rbc-button-link 
            ${hasEvents ? "date-has-events" : "date-no-events"} 
            ${!isCurrentMonth ? "date-other-month" : ""}
            ${isToday ? "date-today" : ""}
            ${isSelected ? "date-selected" : ""}`}
        >
          {label}
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
        // backgroundColor,
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
    dispatch(updateDoctorId(id || ""));
    dispatch(updateTimeSlot(selectedTimeSlot || ""));
    if (selectedDate) {
      dispatch(updateDate(selectedDate.toISOString()));
    }
    navigate("/dashboard/schedule");
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
    const dayOfWeek = day.toLocaleDateString("en-US", { weekday: "long" });
    const backendDay = dayMap[dayOfWeek];
    const matched = scheduleData?.sessions.find(
      (item: any) => item.dayOfTheWeek === backendDay
    );

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
          // hour12: true,
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
        {availableTimes.map(({ timeSlot }) => {
          return (
            <Box
              className="mt-2 border border-gray3 rounded-md hover:bg-grassA2 hover:border hover:border-grassA3 cursor-pointer"
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
        onClick={() => handleSelectedTimeSlot()}
        disabled={!selectedTimeSlot}
        className="bg-grass9 w-full font-medium mt-8 text-base cursor-pointer"
      >
        Book a Session
      </Button>
    </div>
  );
};

export { DoctorCalendar };
