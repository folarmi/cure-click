/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from "prop-types";
import "../../css/compact-calendar.css";
import { Link } from "react-router-dom";
import { Button } from "@radix-ui/themes";

const CompactCalendar = ({
  startDate,
  availableDates,
  onDayClick,
}: PropTypes) => {
  // Generate the 2-week period
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  // Format the date range header (e.g. "1st Oct - 14th Oct")
  const formatDateRange = (start: any, end: any) => {
    const formatOptions = { day: "numeric", month: "short" };
    const startStr = start.toLocaleDateString("en-US", formatOptions);
    const endStr = end.toLocaleDateString("en-US", formatOptions);
    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="availability-calendar">
      <h3 className="calendar-header">
        {formatDateRange(dates[0], dates[dates.length - 1])}
      </h3>

      <div className="weekdays">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="days-grid">
        {dates.map((date, i) => {
          const dateStr = date.toISOString().split("T")[0];
          const isAvailable = availableDates.includes(dateStr);

          return (
            <div
              key={i}
              className={`day-cell ${
                isAvailable ? "available" : "unavailable"
              }`}
              onClick={() => onDayClick(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="indicator available"></div>
          <span>Represent Days Available</span>
        </div>
        <div className="legend-item">
          <div className="indicator unavailable"></div>
          <span>Represent Days Not Available</span>
        </div>
      </div>

      <Link to="/dashboard/appointments/calendar" className="w-full">
        <Button className="bg-grass9 font-medium w-full">
          Modify Calendar
        </Button>
      </Link>
    </div>
  );
};

CompactCalendar.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  availableDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDayClick: PropTypes.func.isRequired,
};

export { CompactCalendar };
