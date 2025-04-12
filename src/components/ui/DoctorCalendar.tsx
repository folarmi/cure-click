/* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import { enUS } from "date-fns/locale/en-US";
// import "../../calendar-styles.css"; // Create this file for custom styles
// import { DoctorCalendarProps } from "../../utils/types";
// import { transformToCalendarEvents } from "../../utils/calendarutil";

// type CalendarProps = {
//   currentDate: Date;
//   scheduleData: DoctorCalendarProps;
// };

// const DoctorCalendar = ({ currentDate, scheduleData }: CalendarProps) => {
//   const events = transformToCalendarEvents(scheduleData);

//   const locales = {
//     "en-US": enUS,
//   };

//   const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
//   });

//   const formats = {
//     weekdayFormat: (date: Date) => format(date, "EEEEE"), // Single letter day names
//   };

//   // Check if a day has any events
//   const hasEventsOnDate = (date: Date) => {
//     return events.some((event) => {
//       const eventDate = new Date(event.start);
//       return (
//         eventDate.getFullYear() === date.getFullYear() &&
//         eventDate.getMonth() === date.getMonth() &&
//         eventDate.getDate() === date.getDate()
//       );
//     });
//   };

//   // Custom day cell wrapper
//   const CustomDayCell = ({
//     children,
//     value,
//   }: {
//     children: React.ReactNode;
//     value: Date;
//   }) => {
//     const hasEvents = hasEventsOnDate(value);
//     const isCurrentMonth = value.getMonth() === currentDate.getMonth();

//     return (
//       <div
//         className={`rbc-day-bg ${!hasEvents ? "no-events-day" : ""} ${
//           !isCurrentMonth ? "other-month-day" : ""
//         }`}
//       >
//         {children}
//         {!hasEvents && isCurrentMonth && (
//           <div className="no-events-label"> Unavailable</div>
//         )}
//       </div>
//     );
//   };

//   // Style for days with events
//   const eventStyleGetter = () => {
//     return {
//       style: {
//         // backgroundColor,
//         borderRadius: "4px",
//         padding: "4px 8px",
//         fontSize: "12px",
//         fontWeight: "500",
//         color: "rgba(0, 101, 20, 0.84)",
//         backgroundColor: "rgba(0, 151, 0, 0.09)",
//         marginTop: "10px",

//         // transform: "translate(-50%, -50%)",
//         // postion: "absolute",
//         // top: "50%",
//         // left: "50%",
//       },
//     };
//   };

//   return (
{
  /* <div className="calendar-container">
  <Calendar
    localizer={localizer}
    events={events}
    defaultDate={currentDate}
    defaultView="month"
    views={["month"]}
    toolbar={false}
    formats={formats}
    eventPropGetter={eventStyleGetter}
    components={{
      month: {
        dateCellWrapper: CustomDayCell,
      },
    }}
  />
</div>; */
}
//   );
// };

// export { DoctorCalendar };

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { transformToCalendarEvents } from "../../utils/calendarutil";
import "../../calendar-styles.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

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
  const events = transformToCalendarEvents(scheduleData);

  // Check if a day has any events
  //   const hasEventsOnDate = (date: Date) => {
  //     return events?.some((event) => {
  //       const eventDate = new Date(event?.start);
  //       return (
  //         eventDate?.getFullYear() === date?.getFullYear() &&
  //         eventDate?.getMonth() === date?.getMonth() &&
  //         eventDate?.getDate() === date?.getDate()
  //       );
  //     });
  //   };

  const hasEventsOnDate = (date: Date) => {
    const dayName = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ][date?.getDay()]; // Get day name (e.g., "MONDAY")

    // Check if this day has any available slots in the original data
    const sessionForDay = scheduleData?.sessions.find(
      (session) => session?.dayOfTheWeek === dayName
    );

    // For non-recurring, also verify the date matches the current week
    if (!scheduleData?.recurring) {
      const eventDate = new Date(scheduleData?.date);
      const weekStart = startOfWeek(eventDate);
      const weekEnd = addDays(weekStart, 6);

      // Only mark as available if it's in the current week
      if (date < weekStart || date > weekEnd) {
        return false;
      }
    }

    return sessionForDay?.localTimes?.length > 0 && sessionForDay.available;
  };

  // Custom day cell wrapper
  const CustomDayCell = ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: Date;
  }) => {
    const hasEvents = hasEventsOnDate(value);
    const isCurrentMonth =
      value.getMonth() === new Date(scheduleData.date).getMonth();

    return (
      <div
        className={`rbc-day-bg ${!hasEvents ? "no-events-day" : ""} ${
          !isCurrentMonth ? "other-month-day" : ""
        }`}
      >
        {children}
        {!hasEvents && isCurrentMonth && (
          <div className="no-events-label"> Unavailable</div>
        )}
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
            dateCellWrapper: CustomDayCell,
          },
        }}
      />
    </div>
  );
};

export { DoctorCalendar };
