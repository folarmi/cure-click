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
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  publicId: string;
  doctorPublicId?: string;
  dayOfTheWeek: string; // "MONDAY", "TUESDAY", etc.
  availableTimes: number;
  localTimes: TimePeriod[];
  available: boolean;
  recurring?: boolean;
  timeZone?: string | null;
}

export interface CalendarFormValues {
  schedule: Record<
    string,
    {
      available: boolean;
      periods: TimePeriod[];
    }
  >;
  blockedDates: {
    startDate: string;
    endDate: string;
  }[];
}
