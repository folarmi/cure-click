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
  return str.charAt(0).toUpperCase() + str.slice(1);
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

const generateTimeSlots = () => {
  const slots: {
    value: string;
    label: string;
    hour: number;
    minute: number;
  }[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const timeLabel = `${displayHour}:${
        minute === 0 ? "00" : minute
      } ${period}`;
      const timeValue = `${hour}:${minute}`;

      slots.push({
        value: timeValue,
        label: timeLabel,
        hour, // Store hour as number (0-23)
        minute, // Store minute as number (0 or 30)
      });
    }
  }

  return slots;
};

export const timeSlots = generateTimeSlots();
