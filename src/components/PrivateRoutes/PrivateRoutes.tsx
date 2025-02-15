import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("jwtToken")

  return token ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoutes;
