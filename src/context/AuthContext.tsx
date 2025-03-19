/* eslint-disable react-refresh/only-export-components */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useDispatch } from "react-redux";
//   import { logout as reduxLogout } from "../lib/features/auth/authSlice";

type AuthContextType = {
  isAuthenticated: boolean;
  loginFromContext: (token: string, refreshToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const loginFromContext = (token: string, refreshToken: string) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    setIsAuthenticated(false);
  };
  //   dispatch(reduxLogout());

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginFromContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
