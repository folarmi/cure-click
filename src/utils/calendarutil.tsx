/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import {
  addDays,
  addWeeks,
  isValid,
  parseISO,
  // setHours,
  // setMinutes,
} from "date-fns";
import { format, parse, startOfWeek, getDay } from "date-fns";

import { Appointment, ScheduleItem } from "./types";
import { enUS } from "date-fns/locale/en-US";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  "en-US": enUS,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type AvailabilityData = {
  dayOfTheWeek: string;
  availableTimes: number;
};

type DayStatus = {
  id: number;
  name: string;
  filled: boolean;
};

interface ScheduleData {
  sessions: ScheduleItem[];
  recurring: boolean;
  date: string;
}

export const dayNameToIndex: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

export const transformToCalendarEvents = (scheduleData: ScheduleData) => {
  let startDate = new Date();
  try {
    if (scheduleData?.date) {
      const parsed = parseISO(scheduleData.date);
      if (isValid(parsed)) startDate = parsed;
    }
  } catch (e) {
    console.warn("Invalid date format, using current date instead", e);
  }

  const { sessions = [], recurring = false } = scheduleData;

  const events: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource: ScheduleItem;
  }[] = [];

  if (recurring) {
    // Handle recurring schedule - generate events for 1 year
    const weeksToGenerate = 52;

    for (let week = 0; week < weeksToGenerate; week++) {
      // Always start from SUNDAY of each week
      const rawWeekStart = addWeeks(startDate, week);
      const sundayStart = addDays(rawWeekStart, -rawWeekStart.getDay());
      // const weekStart = addWeeks(startDate, week);

      sessions.forEach((session) => {
        if (session?.localTimes?.length > 0) {
          const dayIndex = dayNameToIndex[session?.dayOfTheWeek];
          const eventDate = addDays(sundayStart, dayIndex);

          // Sort times to ensure earliest is first
          const sortedTimes = [...session.localTimes].sort();
          const firstTime = sortedTimes[0];
          const lastTime = sortedTimes[sortedTimes.length - 1];

          const [startHours, startMinutes] = firstTime.split(":").map(Number);
          const [endHours, endMinutes] = lastTime.split(":").map(Number);

          const startDateTime = new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            startHours,
            startMinutes
          );

          const endDateTime = new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            endHours,
            endMinutes
          );
          // Add 1 hour to the end time
          endDateTime?.setHours(endDateTime.getHours() + 1);

          events.push({
            id: `${session.publicId}-${week}`,
            // title: `${session?.availableTimes} Available (${session?.localTimes?.length} slots)`,
            title: ``,
            start: startDateTime,
            end: endDateTime,
            resource: session,
          });
        }
      });
    }
  } else {
    // Handle non-recurring schedule - just generate for the current week
    sessions.forEach((session) => {
      if (session?.localTimes.length > 0) {
        const dayIndex = dayNameToIndex[session?.dayOfTheWeek];
        const daysToAdd = (dayIndex - startDate.getDay() + 7) % 7;
        const eventDate = addDays(startDate, daysToAdd);

        // Sort times to ensure earliest is first
        const sortedTimes = [...session.localTimes].sort();
        const firstTime = sortedTimes[0];
        const lastTime = sortedTimes[sortedTimes.length - 1];

        const [startHours, startMinutes] = firstTime.split(":").map(Number);
        const [endHours, endMinutes] = lastTime.split(":").map(Number);

        const startDateTime = new Date(
          eventDate.getFullYear(),
          eventDate.getMonth(),
          eventDate.getDate(),
          startHours,
          startMinutes
        );

        const endDateTime = new Date(
          eventDate.getFullYear(),
          eventDate.getMonth(),
          eventDate.getDate(),
          endHours,
          endMinutes
        );
        // Add 1 hour to the end time
        endDateTime?.setHours(endDateTime.getHours() + 1);

        events.push({
          id: `${session.publicId}`,
          // title: `${session?.availableTimes} Available (${session?.localTimes?.length} slots)`,
          title: ``,
          start: startDateTime,
          end: endDateTime,
          resource: session,
        });
      }
    });
  }

  return events;
};

export const getDayWithSuffix = (day: number) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const transformAvailabilityToDays = (
  availability: AvailabilityData[]
): DayStatus[] => {
  const dayOrder = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return dayOrder?.map((day, index) => {
    const match = availability?.find((d) => d?.dayOfTheWeek === day);

    return {
      id: index + 1,
      name: day[0], // First letter only
      filled: match ? match?.availableTimes > 0 : false,
    };
  });
};

export const getTotalAvailableTimes = (weeklyData: any[]): number => {
  return weeklyData?.reduce(
    (total: any, day: { availableTimes: any }) =>
      total + (day.availableTimes || 0),
    0
  );
};

export const sortUpcomingAppointments = (
  data: Appointment[]
): Appointment[] => {
  return data
    ?.filter((app) => app?.appointmentStatus === "UPCOMING")
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
      const dateTimeB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
};

export const formatAppointmentTime = (date: string, time: string) => {
  const dateTime = dayjs(`${date}T${time}`);
  const formattedTime = dateTime?.format("hh:mmA"); // e.g. "11:30PM"
  const relative = dayjs()?.to(dateTime); // e.g. "in 30 minutes"

  return `${formattedTime} (${relative})`;
};
