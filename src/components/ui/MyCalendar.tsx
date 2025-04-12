// /* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "../../calendar-styles.css"; // Create this file for custom styles

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: string;
};

type CalendarProps = {
  currentDate: Date;
  events: Event[];
};

const MyCalendar = ({ currentDate, events }: CalendarProps) => {
  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const formats = {
    weekdayFormat: (date: Date) => format(date, "EEEEE"), // Single letter day names
  };

  // Check if a day has any events
  const hasEventsOnDate = (date: Date) => {
    return events.some((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
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
    const isCurrentMonth = value.getMonth() === currentDate.getMonth();

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

  // Style for days with events
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

        // transform: "translate(-50%, -50%)",
        // postion: "absolute",
        // top: "50%",
        // left: "50%",
      },
    };
  };

  return (
    <div className="calendar-container">
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
    </div>
  );
};

export { MyCalendar };
