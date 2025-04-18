/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface Appointment {
  publicId: string;
  createdDate: string;
  lastModifiedDate: string;
  createdBy: string | null;
  modifiedBy: string | null;
  topic: string;
  details: string;
  active: boolean;
  appointmentStatus: "UPCOMING" | "COMPLETED" | "CANCELLED"; // Add other statuses as needed
  meetingLink: string;
  transactionId: string;
  appointmentDate: string;
  appointmentTime: string;
  attachments: string[];
  doctor: {
    publicId: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    biography: string | null;
    profilePictureUrl: string | null;
    yearsOfExperience: number | null;
    pricing: string;
    specialization: string | null;
    currency: string | null;
    country: string | null;
    gender: string | null;
    availabilityStatus: string | null;
    hospitalWorkPlace: string | null;
    languages: string[];
    files: Record<string, any>;
    createdDate: string | null;
    lastModifiedDate: string | null;
    createdBy: string | null;
    modifiedBy: string | null;
  };
  patient: {
    publicId: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    country: string | null;
    gender: string | null;
    profilePictureUrl: string | null;
    files: Record<string, any>;
    createdDate: string;
    lastModifiedDate: string;
    createdBy: string | null;
    modifiedBy: string | null;
  };
}
