import { useEffect } from "react";
import { UserType } from "../lib/features/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

const applyUserTheme = (userType: UserType) => {
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", userType);
  }
};

const ThemeSetter = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  useEffect(() => {
    applyUserTheme(userType);
  }, [userType]);

  return null;
};

export default ThemeSetter;
