import { UserType } from "../lib/features/authSlice";

export const applyUserTheme = (user: UserType) => {
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", user);
  }
};
