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

export type AppointmentStatus =
  | "ACTIVE"
  | "UPCOMING"
  | "REQUESTED_RESCHEDULE"
  | "RESCHEDULED"
  | "CANCELLED"
  | "COMPLETED"
  | "PENDING";

export type StatusClassNames = {
  [key in AppointmentStatus]: string;
};

const statusClassNames: StatusClassNames = {
  UPCOMING: "bg-accent_alpha_3 text-accent_alpha_11",
  COMPLETED: "bg-[#3E63DD] text-white",
  CANCELLED: "text-tomato_alpha_11 bg-tomato_alpha_3",
  PENDING: "bg-warning_9 text-black_contrast",
  ACTIVE: "bg-accent_alpha_3 text-accent_alpha_11",
  REQUESTED_RESCHEDULE: "bg-warning_3 text-warning_11",
  RESCHEDULED: "bg-warning_3 text-warning_11",
};

export const getStatusClassName = (status: AppointmentStatus) => {
  return `font-medium ${
    statusClassNames[status] || "bg-gray-300 text-gray-700"
  }`;
};

export interface Appointment {
  publicId: string;
  createdDate: string;
  lastModifiedDate: string;
  createdBy: string | null;
  modifiedBy: string | null;
  topic: string;
  details: string;
  active: boolean;
  appointmentStatus: AppointmentStatus;
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

export const emptyAppointment: Appointment = {
  publicId: "",
  createdDate: "",
  lastModifiedDate: "",
  createdBy: null,
  modifiedBy: null,
  topic: "",
  details: "",
  active: false,
  appointmentStatus: "UPCOMING",
  meetingLink: "",
  transactionId: "",
  appointmentDate: "",
  appointmentTime: "",
  attachments: [],
  doctor: {
    publicId: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    biography: null,
    profilePictureUrl: null,
    yearsOfExperience: null,
    pricing: "",
    specialization: null,
    currency: null,
    country: null,
    gender: null,
    availabilityStatus: null,
    hospitalWorkPlace: null,
    languages: [],
    files: {},
    createdDate: null,
    lastModifiedDate: null,
    createdBy: null,
    modifiedBy: null,
  },
  patient: {
    publicId: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    country: null,
    gender: null,
    profilePictureUrl: null,
    files: {},
    createdDate: "",
    lastModifiedDate: "",
    createdBy: null,
    modifiedBy: null,
  },
};

export type StatusHandlerOptions = {
  toggleModal?: () => void;
  toggleCancel?: () => void;
  toggleCancelledDetails?: () => void;
  toggleUpcomingDetails?: () => void;
  toggleRescheduleTwoModal?: () => void;
  toggleCompletedAppointment?: () => void;
};

export function handleStatusAction(
  status: AppointmentStatus,
  actions: StatusHandlerOptions
) {
  switch (status) {
    case "PENDING":
      actions.toggleModal?.();
      break;

    case "ACTIVE":
      actions.toggleModal?.();
      break;

    case "CANCELLED":
      actions.toggleCancelledDetails?.();
      break;

    case "COMPLETED":
      actions.toggleCompletedAppointment?.();
      break;

    case "UPCOMING":
      actions.toggleUpcomingDetails?.();
      break;

    case "REQUESTED_RESCHEDULE":
      actions.toggleRescheduleTwoModal?.();
      break;

    case "RESCHEDULED":
      actions.toggleModal?.();
      break;

    default:
      console.warn(`No action defined for status: ${status}`);
  }
}

export const appointmentStatusLabels: any = {
  ACTIVE: "Active",
  UPCOMING: "Upcoming",
  REQUESTED_RESCHEDULE: " Reschedule Requested",
  RESCHEDULED: "Rescheduled",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  PENDING: "Pending",
};
