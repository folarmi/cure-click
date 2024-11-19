import { useEffect } from "react";
import { UserType } from "../lib/features/authSlice";

const applyUserTheme = (userType: UserType) => {
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", userType);
    console.log(`Theme set to: ${userType}`);
  }
};

const ThemeSetter = ({ userType }: { userType: UserType }) => {
  useEffect(() => {
    applyUserTheme(userType);
  }, [userType]);

  return null;
};

export default ThemeSetter;
