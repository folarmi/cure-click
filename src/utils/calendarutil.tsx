import {
  addDays,
  addWeeks,
  isValid,
  parseISO,
  // setHours,
  // setMinutes,
} from "date-fns";
import { format, parse, startOfWeek, getDay } from "date-fns";

import { ScheduleItem } from "./types";
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

interface ScheduleData {
  sessions: ScheduleItem[];
  recurring: boolean;
  date: string;
}

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

  const dayNameToIndex: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

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
      const weekStart = addWeeks(startDate, week);

      sessions.forEach((session) => {
        if (session.localTimes.length > 0) {
          const dayIndex = dayNameToIndex[session?.dayOfTheWeek];
          const eventDate = addDays(weekStart, dayIndex);

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
