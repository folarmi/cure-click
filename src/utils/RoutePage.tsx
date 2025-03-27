import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/Register";
import {
  AccountSettings,
  Appointments,
  Dashboard,
  ForgotPassword,
  LandingPage,
  Login,
  ResetPassword,
  SearchResultsDashboard,
  SingleDoctor,
  VerifyEmail,
} from "../pages";
import Schedule from "../pages/Schedule";
import Wallet from "../pages/Wallet";
import ProtectedRoute from "../context/ProtectedRoute";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/results" element={<SearchResultsDashboard />} />
        <Route path="/dashboard/single-doctor/:id" element={<SingleDoctor />} />
        <Route path="/dashboard/schedule" element={<Schedule />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="/dashboard/appointments" element={<Appointments />} />
        <Route
          path="/dashboard/account-settings"
          element={<AccountSettings />}
        />
      </Route>
    </Routes>
  );
};

export { RoutePage };
