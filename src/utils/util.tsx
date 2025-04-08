/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from "../lib/features/authSlice";
import { jwtDecode } from "jwt-decode";
import countryList from "react-select-country-list";

interface Access {
  roles: string[];
}

interface DecodedToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  sid: string;
  acr: string;
  "allowed-origins": string[];
  realm_access: Access;
  resource_access: Record<string, Access>;
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export const applyUserTheme = (user: UserType) => {
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", user);
  }
};

export const decodeLogin = (): DecodedToken | null => {
  if (!sessionStorage.getItem("token")) return null;

  try {
    const decoded: DecodedToken = jwtDecode(
      sessionStorage.getItem("token") ?? ""
    );
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const getFullName = (firstname = "", lastname = "") =>
  `${capitalize(firstname)} ${capitalize(lastname)}`;

export const getAllCountryOptions = () => {
  return countryList().getData();
};

export function filterObject(obj: Record<string, any>, keysToRemove: string[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
  );
}

/**
 * Safely converts a string to a number with flexible options
 * @param input String or number to convert
 * @param options Configuration options
 * @returns Number or null if conversion fails
 */
export function stringToNumber(
  input: string | number | null | undefined,
  options: {
    fallback?: number; // Value to return if conversion fails (default: null)
    round?: boolean; // Round to nearest integer
    decimals?: number; // Number of decimal places to keep
    min?: number; // Minimum allowed value
    max?: number; // Maximum allowed value
  } = {}
): number | null {
  // Handle null/undefined
  if (input === null || input === undefined) return options.fallback ?? null;

  // If already a number, just apply options
  if (typeof input === "number") {
    return applyNumberOptions(input, options);
  }

  // Clean the string
  const cleaned = input.trim().replace(/[^\d.-]/g, ""); // Remove non-numeric chars except . and -

  // Try conversion
  const number = parseFloat(cleaned);
  if (isNaN(number)) return options.fallback ?? null;

  return applyNumberOptions(number, options);
}

function applyNumberOptions(
  value: number,
  options: {
    round?: boolean;
    decimals?: number;
    min?: number;
    max?: number;
  }
): number {
  let result = value;

  // Handle decimal precision
  if (options.decimals !== undefined) {
    const factor = 10 ** options.decimals;
    result = Math.round(result * factor) / factor;
  } else if (options.round) {
    result = Math.round(result);
  }

  // Apply min/max bounds
  if (options.min !== undefined) result = Math.max(options.min, result);
  if (options.max !== undefined) result = Math.min(options.max, result);

  return result;
}

export const keysToRemove = [
  "publicId",
  "createdDate",
  "lastModifiedDate",
  "createdBy",
  "modifiedBy",
];

// const generateTimeSlots = () => {
//   const slots: {
//     value: string;
//     label: string;
//     hour: number;
//     minute: number;
//   }[] = [];

//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 30) {
//       const period = hour >= 12 ? "PM" : "AM";
//       const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
//       const timeLabel = `${displayHour}:${
//         minute === 0 ? "00" : minute
//       } ${period}`;
//       // const timeValue = `${hour}:${minute}`;
//       const timeValue = `${hour.toString().padStart(2, "0")}:${minute
//         .toString()
//         .padStart(2, "0")}:00`;

//       slots.push({
//         value: timeValue,
//         label: timeLabel,
//         hour, // Store hour as number (0-23)
//         minute, // Store minute as number (0 or 30)
//       });
//     }
//   }

//   return slots;
// };

// export const timeSlots = generateTimeSlots();

// export const getEndTimeOptions = (index: number, startTimes: any) => {
//   const startTime = startTimes?.[index]?.startTime;
//   if (!startTime) return timeSlots;

//   const [startHour, startMinute] = startTime.split(":").map(Number);
//   const startTotalMinutes = startHour * 60 + startMinute;

//   return timeSlots.filter((slot) => {
//     const slotTotalMinutes = slot.hour * 60 + slot.minute;
//     return slotTotalMinutes >= startTotalMinutes + 60; // 1 hour later
//   });
// };

/**
 * Converts a day number (1-7) to the corresponding weekday in all caps
 * @param {number} dayNumber - Number representing the day (1 = Monday, 7 = Sunday)
 * @returns {string} The weekday in all caps
 * @throws {Error} If input is not a number between 1-7
 */
export function numberToWeekday(dayNumber: number) {
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  if (typeof dayNumber !== "number" || dayNumber < 1 || dayNumber > 7) {
    throw new Error("Input must be a number between 1-7");
  }

  return days[dayNumber - 1];
}

export function convertToBackendTimeFormat(timeString: string) {
  // Default values (1073741824 represents unset/placeholder)
  const result = {
    hour: 1073741824,
    minute: 1073741824,
    second: 1073741824,
    nano: 1073741824,
  };

  if (!timeString) return result;

  // Convert '0.30' to '00:30:00.000' format
  const [hoursStr, minutesStr] = timeString.split(".");
  const hours = parseInt(hoursStr || "0", 10);
  const minutes = parseInt(minutesStr || "0", 10);

  // Only set values if they're valid numbers
  if (!isNaN(hours)) result.hour = hours;
  if (!isNaN(minutes)) result.minute = minutes;

  return result;
}

export function convertToLocalTimeFormat(timeString: string): string {
  // Handle empty/undefined input
  if (!timeString) return "00:00:00";

  // Handle both '.' and ':' separators
  const separator = timeString.includes(".") ? "." : ":";
  const [hoursStr = "0", minutesStr = "0"] = timeString.split(separator);

  // Parse components (with NaN protection)
  const hours = Math.min(23, Math.max(0, parseInt(hoursStr, 10) || 0));
  const minutes = Math.min(59, Math.max(0, parseInt(minutesStr, 10) || 0));

  // Format with leading zeros
  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    "00", // Static seconds
  ].join(":");
}

export const getCurrencySymbol = (currency: string): string => {
  const currencySymbols: Record<string, string> = {
    DOLLAR: "$",
    NAIRA: "₦",
    EURO: "€",
    POUND: "£",
    YEN: "¥",
    RUPEES: "₹",
    // Add more currencies as needed
  };

  return currencySymbols[currency.toUpperCase()] || currency;
};

export const isAvailable = (status: string): boolean => {
  return status === "AVAILABLE";
};

// Convert backend time to frontend display format
export const formatTimeForDisplay = (backendTime: string): string => {
  if (!backendTime) return "";

  const [hoursStr, minutesStr] = backendTime.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Convert display format to backend time
export const formatTimeForBackend = (displayTime: string): string => {
  if (!displayTime) return "00:00:00";

  const [timePart, period] = displayTime.split(" ");
  const [hoursStr, minutesStr] = timePart.split(":");

  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;
};

export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i + 1;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  return {
    label: `${displayHour}:00 ${period}`,
    value: `${hour}:00`,
  };
});

export const getEndTimeOptions = (startTime: string) => {
  if (!startTime) return [];

  const [startHour] = startTime.split(":").map(Number);
  return timeSlots.filter((slot) => {
    const [slotHour] = slot.value.split(":").map(Number);
    return slotHour > startHour;
  });
};
