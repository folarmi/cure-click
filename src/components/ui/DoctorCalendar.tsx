// // /* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar } from "react-big-calendar";
import { format, isSameDay } from "date-fns";
import { localizer, transformToCalendarEvents } from "../../utils/calendarutil";
import "../../css/calendar-styles.css";
import { useState } from "react";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  // const CustomDateHeader = ({
  //   label,
  //   date,
  //   value,
  // }: {
  //   label: string;
  //   date: Date;
  //   value: Date;
  // }) => {
  //   const hasEvents = hasEventsOnDate(date);
  //   const isCurrentMonth =
  //     date.getMonth() === new Date(scheduleData?.date).getMonth();

  //   const handleClick = () => {
  //     if (isCurrentMonth) {
  //       setSelectedDate(value); // ✅ capture selected date
  //     }
  //   };

  //   return (
  //     <div className="rbc-date-cell" onClick={handleClick}>
  //       <button
  //         type="button"
  //         className={`rbc-button-link ${
  //           hasEvents ? "date-has-events" : "date-no-events"
  //         } ${!isCurrentMonth ? "date-other-month" : ""}`}
  //       >
  //         {label}
  //       </button>
  //     </div>
  //   );
  // };

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
        setSelectedDate(date); // Use the date prop directly
        console.log("Selected date:", date); // Immediate feedback
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

  console.log(selectedDate);
  return (
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
  );
};

export { DoctorCalendar };
