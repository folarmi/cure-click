// // /* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
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
      value?.getMonth() === new Date(scheduleData?.date).getMonth();

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
