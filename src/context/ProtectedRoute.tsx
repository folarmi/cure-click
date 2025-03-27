// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// interface ProtectedRouteProps {
//   element?: React.ReactElement; // Define the type for the `element` prop
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Render the `element` if provided, otherwise render the nested routes using `Outlet`
//   return element ? element : <Outlet />;
// };

// export { ProtectedRoute };

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
