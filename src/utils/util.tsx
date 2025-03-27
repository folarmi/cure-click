import { UserType } from "../lib/features/authSlice";
import { jwtDecode } from "jwt-decode";

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
