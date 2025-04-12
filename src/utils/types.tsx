export type AvailableSessions = {
  publicId: string;
  doctorPublicId: string;
  dayOfTheWeek: string;
  availableTimes: number;
  localTimes: string[];
  available: boolean | null;
  recurring: boolean | null;
};

export interface TimePeriod {
  startTime: string;
  endTime: string;
  id?: string; // For field array
}

export interface FormValues {
  schedule: {
    [dayId: string]: {
      periods: TimePeriod[];
    };
  };
}

export interface TimePeriod {
  id?: string;
  startTime: string; // "HH:MM:SS"
  endTime: string; // "HH:MM:SS"
}

// Frontend
export interface DaySchedule {
  publicId: string;
  doctorPublicId: string;
  dayOfTheWeek: string;
  availableTimes: number;
  localTimes: string[] | TimePeriod[];
  available: boolean;
  recurring: boolean;
  timeZone: string | null;
}

// Backend
export interface ScheduleItem {
  publicId: string;
  doctorPublicId: string;
  dayOfTheWeek: string;
  availableTimes: number;
  localTimes: string[];
  available: boolean;
  recurring?: boolean;
  timezone: string | null;
}

export interface DoctorScheduleResponse {
  sessions: ScheduleItem[];
}

export interface CalendarFormValues {
  schedule: Record<
    string,
    {
      available: boolean;
      localTimes: TimePeriod[];
    }
  >;
  recurring: boolean;
}

export interface DoctorCalendarProps {
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
