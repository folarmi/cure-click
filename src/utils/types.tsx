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

// export interface DaySchedule {
//   dayOfTheWeek: string;
//   publicId: string;
//   localTimes: TimePeriod[];
// }

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
  dayOfTheWeek: string;
  publicId: string;
  available: boolean;
  periods: TimePeriod[];
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
