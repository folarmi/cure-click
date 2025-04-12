// utils/scheduleUtils.ts
import {
  addDays,
  addWeeks,
  isValid,
  parseISO,
  setHours,
  setMinutes,
} from "date-fns";
import { ScheduleItem } from "./types";

interface ScheduleData {
  sessions: ScheduleItem[];
  recurring: boolean;
  date: string;
}

export const transformToCalendarEvents = (scheduleData: ScheduleData) => {
  // Safe date parsing with fallback
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

  // Day mapping
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
        if (session.available && session.localTimes.length > 0) {
          const dayIndex = dayNameToIndex[session.dayOfTheWeek];
          const eventDate = addDays(weekStart, dayIndex);

          session.localTimes.forEach((time) => {
            const [hours, minutes] = time.split(":").map(Number);
            const startDateTime = setMinutes(
              setHours(eventDate, hours),
              minutes
            );
            const endDateTime = new Date(
              startDateTime.getTime() + 60 * 60 * 1000
            ); // +1 hour

            events.push({
              id: `${session.publicId}-${week}-${time}`,
              title: `${session.availableTimes} Available`,
              start: startDateTime,
              end: endDateTime,
              resource: session,
            });
          });
        }
      });
    }
  } else {
    // Handle non-recurring schedule - just generate for the current week
    sessions.forEach((session) => {
      if (session?.localTimes.length > 0) {
        const dayIndex = dayNameToIndex[session?.dayOfTheWeek];

        // Calculate the next occurrence of this day from startDate
        const daysToAdd = (dayIndex - startDate.getDay() + 7) % 7;

        const eventDate = addDays(startDate, daysToAdd);

        session?.localTimes.forEach((time) => {
          const [hours, minutes] = time.split(":").map(Number);
          //   This specifies that starttime is local
          const startDateTime = new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            hours,
            minutes
          );
          const endDateTime = new Date(
            startDateTime.getTime() + 60 * 60 * 1000
          ); // +1 hour

          events.push({
            id: `${session.publicId}-${time}`,
            title: `${session.availableTimes} Available`,
            start: startDateTime,
            end: endDateTime,
            resource: session,
          });
        });
      }
    });
  }

  return events;
};
